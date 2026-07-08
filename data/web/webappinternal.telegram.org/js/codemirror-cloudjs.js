(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  var Pos = CodeMirror.Pos;

  var javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends false finally for function " +
    "if in import instanceof new null return super switch this throw true try typeof var void while with yield").split(" ");

  function customHint(editor, options) {
    var config = (options && options.hintConfig) || window.__hintConfig;
    if (!config) return;

    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur);

    if (/\b(?:string|comment)\b/.test(token.type)) return;
    var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
    if (innerMode.mode.helperType === "json") return;
    token.state = innerMode.state;

    // Normalize token
    if (!/^[\w$_]*$/.test(token.string)) {
      token = { start: cur.ch, end: cur.ch, string: "", state: token.state,
                type: token.string == "." ? "property" : null };
    } else if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }

    var chain = parseChain(editor, cur, token);
    var completions;

    if (chain.length === 0) {
      // No chain — top-level completions
      completions = getTopLevel(config, token.state);
    } else {
      // Resolve chain to get available properties
      var node = resolveChain(config, chain);
      if (!node) return;
      completions = getNodeCompletions(node, config);
    }

    // Filter by prefix
    var prefix = token.string;
    var list = [];
    for (var i = 0; i < completions.length; i++) {
      if (completions[i].lastIndexOf(prefix, 0) === 0 && list.indexOf(completions[i]) === -1) {
        list.push(completions[i]);
      }
    }

    return { list: list, from: Pos(cur.line, token.start), to: Pos(cur.line, token.end) };
  }

  // Walk backwards from the cursor token to build the chain
  // Returns array of { name: string, called: boolean }
  function parseChain(editor, cur, token) {
    var chain = [];
    var tprop = token;

    while (tprop.type == "property") {
      // Step back over the "."
      tprop = editor.getTokenAt(Pos(cur.line, tprop.start));
      if (tprop.string != ".") return chain;

      // Step back to the identifier or ")"
      tprop = editor.getTokenAt(Pos(cur.line, tprop.start));

      if (tprop.string == ")") {
        // Walk backwards to find matching "("
        var depth = 1;
        var pos = tprop.start;
        while (depth > 0 && pos > 0) {
          tprop = editor.getTokenAt(Pos(cur.line, pos));
          if (tprop.string == ")") depth++;
          else if (tprop.string == "(") depth--;
          pos = tprop.start;
        }
        if (depth !== 0) return chain;
        // Get the function name before "("
        tprop = editor.getTokenAt(Pos(cur.line, tprop.start));
        chain.push({ name: tprop.string, called: true });
      } else {
        chain.push({ name: tprop.string, called: false });
      }
    }

    // The root identifier (variable type)
    if (tprop.type && tprop.type.indexOf("variable") === 0 && chain.length === 0) {
      // No chain was built — this means we're at a bare variable, not a property chain
      return [];
    }

    chain.reverse();
    return chain;
  }

  // Resolve a chain against the config
  function resolveChain(config, chain) {
    var root = chain[0];

    // Look up root in custom, then global
    var node = config.custom[root.name] || config.global[root.name];
    if (!node) return null;

    // If root was called as function: follow $returns
    if (root.called) {
      if (!node.$returns && !(node.props && node.props[root.name])) {
        // Check if root itself is a function with $returns
        var returns = node.$returns;
        if (!returns) return null;
      }
      var builderName = node.$returns;
      if (!builderName) return null;
      var builderDef = config.builders[builderName];
      if (!builderDef) return null;
      node = { $type: 'object', props: builderDef };
    }

    // Walk remaining chain steps
    for (var i = 1; i < chain.length; i++) {
      var step = chain[i];
      if (node.$type !== 'object') return null;

      var child = node.props ? node.props[step.name] : null;
      if (!child && node.$dynamic) {
        child = node.$dynamic;
      }
      if (!child) return null;

      if (step.called) {
        if (!child.$returns) return null;
        var bDef = config.builders[child.$returns];
        if (!bDef) return null;
        node = { $type: 'object', props: bDef };
      } else {
        node = child;
      }
    }

    return node;
  }

  // Get completion strings from a resolved node
  function getNodeCompletions(node, config) {
    if (!node) return [];
    if (node.$type === 'object' && node.props) {
      return Object.keys(node.props);
    }
    return [];
  }

  // Get all top-level completions (no chain context)
  function getTopLevel(config, state) {
    var result = [];

    // Local variables from CodeMirror's JS parser state
    if (state) {
      for (var v = state.localVars; v; v = v.next) result.push(v.name);
      for (var c = state.context; c; c = c.prev)
        for (var v = c.vars; v; v = v.next) result.push(v.name);
      for (var v = state.globalVars; v; v = v.next) result.push(v.name);
    }

    // Custom objects
    if (config.custom) {
      for (var key in config.custom) result.push(key);
    }

    // Global objects
    if (config.global) {
      for (var key in config.global) result.push(key);
    }

    // JS keywords
    for (var i = 0; i < javascriptKeywords.length; i++) {
      result.push(javascriptKeywords[i]);
    }

    return result;
  }

  CodeMirror.registerHelper("hint", "cloudjs", customHint);
});

