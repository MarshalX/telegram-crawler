(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd)          // AMD
    define(["../../lib/codemirror"], mod);
  else                                                         // Plain browser
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  var STATE_KEY = "_guardedRegionState";
  var BASE_CLASS = "cm-guarded";

  function attach(cm, config) {
    var prefix = config.prefix || "";
    var suffix = config.suffix || "";
    var initial = config.initialValue != null ? config.initialValue : "";
    var placeholder = config.placeholder != null ? config.placeholder : null;
    var prefixClassName = config.prefixClassName || "";
    var suffixClassName = config.suffixClassName || "";

    // Seed content only if the document doesn't already wrap with the
    // given prefix/suffix.
    var current = cm.getValue();
    var alreadyWrapped =
      current.length >= prefix.length + suffix.length &&
      current.slice(0, prefix.length) === prefix &&
      current.slice(current.length - suffix.length) === suffix;

    if (!alreadyWrapped) {
      cm.setValue(prefix + initial + suffix);
    }

    var prefixMark = null;
    var suffixMark = null;
    var placeholderMark = null;

    // True while the addon itself is mutating the document (setValue inside
    // setEditable / rewrap). The beforeChange guard skips its check during
    // such operations — otherwise it would cancel our own setValue, since
    // that change spans the prefix range at {0,0}.
    var internalChange = false;

    function withInternalChange(fn) {
      internalChange = true;
      try { fn(); } finally { internalChange = false; }
    }

    // --- helpers --------------------------------------------------------

    function editableStartPos() {
      return cm.posFromIndex(prefix.length);
    }

    function getEditable() {
      var full = cm.getValue();
      return full.slice(prefix.length, full.length - suffix.length);
    }

    function combineClass(extra) {
      return extra ? BASE_CLASS + " " + extra : BASE_CLASS;
    }

    // --- region markers -------------------------------------------------

    function remark() {
      if (prefixMark) { prefixMark.clear(); prefixMark = null; }
      if (suffixMark) { suffixMark.clear(); suffixMark = null; }

      var docLen = cm.getValue().length;

      if (prefix.length > 0) {
        prefixMark = cm.markText(
          cm.posFromIndex(0),
          cm.posFromIndex(prefix.length),
          {
            className: combineClass(prefixClassName),
            atomic: true,
            inclusiveLeft: true,
            readOnly: true
          }
        );
      }

      if (suffix.length > 0) {
        suffixMark = cm.markText(
          cm.posFromIndex(docLen - suffix.length),
          cm.posFromIndex(docLen),
          {
            className: combineClass(suffixClassName),
            atomic: true,
            inclusiveRight: true,
            readOnly: true
          }
        );
      }
    }

    function guard(cmInst, change) {
      if (internalChange) return;
      var doc = cmInst.getValue();
      var editableStart = prefix.length;
      var editableEnd = doc.length - suffix.length;

      var fromIdx = cmInst.indexFromPos(change.from);
      var toIdx = cmInst.indexFromPos(change.to);

      if (fromIdx < editableStart || toIdx > editableEnd) {
        change.cancel();
      }
    }

    // --- placeholder ----------------------------------------------------

    function buildWidget(content, className) {
      var node;
      if (content instanceof HTMLElement) {
        node = content.cloneNode(true);
      } else {
        node = document.createElement("span");
        node.textContent = String(content);
      }
      node.classList.add(className);
      node.setAttribute("aria-hidden", "true");
      return node;
    }

    function placeholderActive() {
      return placeholderMark != null;
    }

    function removePlaceholder() {
      if (placeholderMark) {
        placeholderMark.clear();
        placeholderMark = null;
      }
    }

    function updatePlaceholder() {
      if (placeholder == null) {
        removePlaceholder();
        return;
      }

      var shouldShow = getEditable().length === 0;

      if (!shouldShow) {
        removePlaceholder();
        return;
      }

      // The bookmark may have been wiped by a full-document rewrite
      // (cm.setValue inside setEditable/rewrap). The JS reference can
      // outlive the actual mark, so drop it before deciding whether to
      // create a new one.
      if (placeholderMark && !placeholderMark.find()) placeholderMark = null;

      if (placeholderMark) return;

      // insertLeft: true — text typed at the bookmark position goes to
      // the LEFT of the widget. The cursor sits at prefix.length, the
      // widget is to the right, characters typed push the cursor forward
      // while the widget stays attached to the suffix.
      placeholderMark = cm.setBookmark(editableStartPos(), {
        widget: buildWidget(placeholder, "cm-guarded-placeholder"),
        insertLeft: true,
        handleMouseEvents: false
      });
    }

    // When the placeholder is visible, the editable region is empty, so
    // there is only one meaningful cursor position — the start. If a
    // mouse click lands after the widget, snap back.
    function fixCursorIfNeeded() {
      if (!placeholderActive()) return;
      var cur = cm.getCursor();
      var wanted = editableStartPos();
      if (cur.line !== wanted.line || cur.ch !== wanted.ch) {
        cm.setCursor(wanted);
      }
    }

    // --- wiring ---------------------------------------------------------

    function refresh() {
      remark();
      updatePlaceholder();
    }

    function onChange() { refresh(); }
    function onCursorActivity() { fixCursorIfNeeded(); }

    cm.on("beforeChange", guard);
    cm.on("change", onChange);
    cm.on("cursorActivity", onCursorActivity);

    refresh();
    cm.setCursor(editableStartPos());

    // --- public API -----------------------------------------------------

    function rewrap(newPrefix, newSuffix) {
      var editable = getEditable();
      prefix = newPrefix;
      suffix = newSuffix;
      withInternalChange(function () {
        cm.setValue(prefix + editable + suffix);
      });
      refresh();
    }

    return {
      get prefix() { return prefix; },
      get suffix() { return suffix; },

      detach: function () {
        cm.off("beforeChange", guard);
        cm.off("change", onChange);
        cm.off("cursorActivity", onCursorActivity);
        if (prefixMark) prefixMark.clear();
        if (suffixMark) suffixMark.clear();
        removePlaceholder();
      },

      getEditable: getEditable,

      setEditable: function (value) {
        var v = String(value);
        withInternalChange(function () {
          cm.setValue(prefix + v + suffix);
        });
        cm.setCursor(cm.posFromIndex(prefix.length + v.length));
      },

      setPrefix: function (value) {
        rewrap(String(value || ""), suffix);
      },

      setSuffix: function (value) {
        rewrap(prefix, String(value || ""));
      },

      setPrefixClassName: function (value) {
        prefixClassName = value || "";
        remark();
      },

      setSuffixClassName: function (value) {
        suffixClassName = value || "";
        remark();
      },

      setPlaceholder: function (value) {
        placeholder = value != null ? value : null;
        removePlaceholder();
        updatePlaceholder();
        if (placeholderActive()) cm.setCursor(editableStartPos());
      },

      getConfig: function () {
        return {
          prefix: prefix,
          suffix: suffix,
          placeholder: placeholder,
          prefixClassName: prefixClassName,
          suffixClassName: suffixClassName
        };
      }
    };
  }

  CodeMirror.defineOption("guardedRegion", null, function (cm, newVal, oldVal) {
    var existing = cm.state[STATE_KEY];
    if (existing) {
      existing.detach();
      cm.state[STATE_KEY] = null;
    }

    if (newVal && typeof newVal === "object") {
      cm.state[STATE_KEY] = attach(cm, newVal);
    }
  });

  CodeMirror.defineExtension("getGuardedRegion", function () {
    return this.state[STATE_KEY] || null;
  });
});