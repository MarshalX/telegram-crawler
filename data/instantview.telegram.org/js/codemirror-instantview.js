// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineSimpleMode('instantview', {
    start: [
      // string
      {regex: /"(?:[^\\"]|\\.)*?(?:"|$)/, token: 'string'},
      {regex: /("(?:[^\\"]|\\.)*?)(\\)(\s*$)/,
       token: ['string', 'hr', null], push: 'string'},
      // condition
      {regex: /(\s*)([?!](?:domain|domain_not|path|path_not)\b)((?:[^\\#]|\\.)*)/,
       token: [null, 'def', null], sol: true},
      {regex: /(\s*)([?!](?:exists|not_exists|false|true|condition)\b)/,
       token: [null, 'def'], sol: true},
      // include
      {regex: /(\s*)(\+\s*[a-z0-9.-]+)/,
       token: [null, 'variable-3'], sol: true},
      // replace_tag alias
      {regex: /(\s*)(<[a-z0-9-]+>)/,
       token: [null, 'tag'], sol: true},
      // function with arguments
      {regex: /(\s*)(@(?:debug|remove|match|replace|urlencode|urldecode|htmlencode|htmldecode|datetime|set_attr|set_attrs|style_to_attrs|background_to_image|json_to_xml|html_to_dom|prepend_to|append_to|before_el|after_el|prepend|append|before|after|replace_tag|wrap|wrap_inner|clone|detach|split_parent|pre|combine|inline|load|unsupported|simplify|if|if_not|map|repeat|while|while_not|function)\b)/,
       token: [null, 'builtin'], sol: true},
      // option
      {regex: /(\s*)(~[a-z][a-z0-9_]*)/i,
       token: [null, 'keyword'], sol: true},
      // variable
      {regex: /(\s*)(\$[a-z][a-z0-9_]*)(\??\+?)/i,
       token: [null, 'variable-2', 'positive'], sol: true},
      {regex: /\$(?:\$|@|[a-z][a-z0-9_]*)/i, token: 'variable-2'},
      // property
      {regex: /(\s*)([a-z][a-z0-9_]*)(!{0,2})/i,
       token: [null, 'variable-2', 'positive'], sol: true},
      // comment
      {regex: /(#.*)(\\)(\s*$)/, token: ['comment', 'hr', null], push: 'comment'},
      {regex: /#.*/, token: 'comment'},
      // tag in xpath
      {regex: /(\/)([a-z0-9-]+\:\:)?([a-z0-9_-]+|\*)/i,
       token: [null, null, 'tag-2']},
      // tag
      {regex: /<[a-z0-9_-]+>/i, token: 'tag'},
      // attribute
      {regex: /@[a-z0-9-]+/, token: 'attribute'},
      // index
      {regex: /last\(\)|[-+]?(?:\.\d+|\d+\.?\d*)/i, token: 'number'},
      // null
      {regex: /null/, token: 'atom'},
      // simple word
      {regex: /\w[\w-]*/, token: 'variable'},
      // continue line
      {regex: /()(\\)(\s*$)/, token: [null, 'hr', null], next: 'next'}
    ],
    next: [
      // string
      {regex: /"(?:[^\\"]|\\.)*?"$/, token: 'string', next: 'start'},
      {regex: /"(?:[^\\"]|\\.)*?"/, token: 'string'},
      {regex: /"(?:[^\\"]|\\.)*?$/, token: 'string', next: 'start'},
      {regex: /("(?:[^\\"]|\\.)*?)(\\)(\s*$)/,
       token: ['string', 'hr', null], push: 'string'},
      // variable
      {regex: /\$(?:\$|@|[a-z][a-z0-9_]*$)/i, token: 'variable-2', next: 'start'},
      {regex: /\$(?:\$|@|[a-z][a-z0-9_]*)/i, token: 'variable-2'},
      // comment
      {regex: /(#.*)(\\)(\s*$)/, token: ['comment', 'hr', null], push: 'comment'},
      {regex: /#.*$/, token: 'comment', next: 'start'},
      // tag in xpath
      {regex: /(\/)([a-z0-9-]+\:\:)?([a-z0-9_-]+|\*)$/i,
       token: [null, null, 'tag-2'], next: 'start'},
      {regex: /(\/)([a-z0-9-]+\:\:)?([a-z0-9_-]+|\*)/i,
       token: [null, null, 'tag-2']},
      // tag
      {regex: /<[a-z0-9_-]+>$/i, token: 'tag', next: 'start'},
      {regex: /<[a-z0-9_-]+>/i, token: 'tag'},
      // attribute
      {regex: /@[a-z0-9-]+$/, token: 'attribute', next: 'start'},
      {regex: /@[a-z0-9-]+/, token: 'attribute'},
      // index
      {regex: /last\(\)|[-+]?(?:\.\d+|\d+\.?\d*)$/i, token: 'number', next: 'start'},
      {regex: /last\(\)|[-+]?(?:\.\d+|\d+\.?\d*)/i, token: 'number'},
      // null
      {regex: /null/, token: 'atom'},
      // simple word
      {regex: /\w[\w-]*$/, token: 'variable', next: 'start'},
      {regex: /\w[\w-]*/, token: 'variable'},
      // continue line
      {regex: /()(\\)(\s*$)/, token: [null, 'hr', null]},
      // end of line
      {regex: /[^\\]\s*$/, token: null, next: 'start'},
    ],
    string: [
      {regex: /(?:[^\\"]|\\.)*?"$/, token: 'string', next: 'start'},
      {regex: /(?:[^\\"]|\\.)*?"/, token: 'string', pop: true},
      {regex: /(?:[^\\"]|\\.)*?$/, token: 'string', next: 'start'},
      {regex: /((?:[^\\"]|\\.)*?)(\\)(\s*$)/, token: ['string', 'hr', null]}
    ],
    comment: [
      {regex: /(.*)(\\)(\s*$)/, token: ['comment', 'hr', null]},
      {regex: /.*$/, token: 'comment', next: 'start'}
    ],
    meta: {
      dontIndentStates: ['comment'],
      lineComment: '#'
    }
  });
});