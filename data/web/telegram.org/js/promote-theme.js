var PrTheme = {
  SWITCHING_CLASS: 'pr-theme-switching',
  isDark: function() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },
  apply: function(theme) {
    var root = document.documentElement;
    var dark = theme === 'dark';
    if (PrTheme.isDark() === dark) {
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      PrTheme.updateButtons();
      return;
    }
    root.classList.add(PrTheme.SWITCHING_CLASS);
    root.offsetHeight;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.dispatchEvent(new Event('darkmode'));
    if (window.Telegram && Telegram.setWidgetOptions) {
      Telegram.setWidgetOptions({dark: dark});
    }
    PrTheme.updateButtons();
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function() {
        root.classList.remove(PrTheme.SWITCHING_CLASS);
      });
    } else {
      window.setTimeout(function() {
        root.classList.remove(PrTheme.SWITCHING_CLASS);
      }, 0);
    }
  },

  applyNoFreeze: function(theme) {
    var root = document.documentElement;
    var dark = theme === 'dark';
    if (PrTheme.isDark() === dark) {
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      PrTheme.updateButtons();
      return;
    }
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.dispatchEvent(new Event('darkmode'));
    if (window.Telegram && Telegram.setWidgetOptions) {
      Telegram.setWidgetOptions({dark: dark});
    }
    PrTheme.updateButtons();
  },
  commit: function(theme) {
    document.cookie = Aj.state.themeCookie + '=' + theme + ';path=/;max-age=31536000';
    PrTheme.apply(theme);
  },
  updateButtons: function() {
    var dark = PrTheme.isDark();
    $('.pr-theme-toggle').attr({
      'aria-pressed': dark ? 'true' : 'false',
      'aria-label': dark ? 'Switch to light theme' : 'Switch to dark theme',
      'title': dark ? 'Light theme' : 'Dark theme'
    });
  }
};

var PrThemeToggle = (function () {
  var W = 44, H = 44; // render at 2x of the 22px display size
  var SUN_FRAME = 0;  // frame 0 = sun (light)
  var MOON_FRAME = 0; // last frame = moon (dark); set after load

  var WIPE_DARK_MS = 800;
  var WIPE_LIGHT_MS = 500;
  var generation = 0;

  var btn = null;
  var canvas = null, ctx = null;
  var player = null, ready = false, cur = 0, raf = 0, animTarget = null;
  var rawCache = {};
  var replaced = false;
  var themeState = 'light';
  var activeVT = null;
  var ownedAnimations = [];

  function cancelOwnedAnimation(owner) {
    if (!owner) return;
    try { owner.animation.cancel(); } catch (e) {}
    var index = ownedAnimations.indexOf(owner);
    if (index !== -1) ownedAnimations.splice(index, 1);
  }

  function cancelAllOwnedAnimations() {
    ownedAnimations.slice().forEach(function (owner) {
      cancelOwnedAnimation(owner);
    });
  }

  function animatedClick() {
    doToggle(
      function () { snapIcon(); },
      function (reduce) {
        if (reduce) snapIcon(); else morphIcon();
      }
    );
  }

  function init() {
    btn = document.querySelector('.pr-theme-toggle');
    if (!btn) return;
    if (btn.querySelector('canvas')) return;

    themeState = PrTheme.isDark() ? 'dark' : 'light';
    /* Ajax replaces the page content; keep the decoded player and move its canvas. */
    if (canvas) {
      btn.appendChild(canvas);
      btn.addEventListener('click', animatedClick);
      if (ready) {
        snapIcon();
        btn.classList.remove('pr-theme-toggle--static');
        replaced = true;
      }
      return;
    }

    generation++;
    ready = false;
    cur = 0;
    animTarget = null;
    rawCache = {};
    replaced = false;

    if (typeof RLottie === 'undefined' || !RLottie.isSupported) {
      btn.addEventListener('click', function () { doToggle(null, null); });
      return;
    }

    /* ---------- Animated lottie path ---------- */
    canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    btn.appendChild(canvas);
    ctx = canvas.getContext('2d');

    btn.addEventListener('click', animatedClick);

    var gen = generation;
    RLottie.WORKERS_LIMIT = 1;
    RLottie.initWorkers(function () {
      player = RLottie.createRawPlayer(W, H, function (frameCount, fps) {
        if (!btn.isConnected || gen !== generation) return;
        MOON_FRAME = frameCount - 1;
        ready = true;
        cur = themeState === 'dark' ? MOON_FRAME : SUN_FRAME;
        player.renderFrame(cur);
        var other = themeState === 'dark' ? SUN_FRAME : MOON_FRAME;
        player.renderFrame(other);
        if (!replaced) {
          btn.classList.remove('pr-theme-toggle--static');
          replaced = true;
        }
      }, function (frameNo, pixels) {
        if (gen !== generation) return;
        onFrame(frameNo, pixels);
      });
      player.loadFromUrl('/img/sun_outline.tgs');
    });
  }

  function doToggle(applyInVT, applyInstant) {
    themeState = themeState === 'dark' ? 'light' : 'dark';
    var t = themeState;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* No View Transitions: instant theme change. */
    if (!document.startViewTransition) {
      PrTheme.commit(t);
      if (applyInstant) applyInstant(reduce);
      return;
    }
    /* Reduced motion: snap, no reveal. */
    if (reduce) {
      PrTheme.commit(t);
      if (applyInstant) applyInstant(reduce);
      return;
    }

    if (activeVT && activeVT.skipTransition) {
      try { activeVT.skipTransition(); } catch (e) {}
    }
    cancelAllOwnedAnimations();

    var vw = document.documentElement.clientWidth || innerWidth || 1;
    var vh = document.documentElement.clientHeight || innerHeight || 1;
    var r = btn.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    if (!isFinite(cx)) cx = vw / 2;
    if (!isFinite(cy)) cy = vh / 2;
    var end = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    if (!isFinite(end) || end <= 0) end = Math.hypot(vw, vh);

    var ref  = Math.hypot(vw, vh) / Math.SQRT2;
    var px = (cx / vw) * 100, py = (cy / vh) * 100;
    var rpct = ref ? (end / ref) * 100 + 1 : 145;
    var collapsed = 'circle(0% at ' + px + '% ' + py + '%)';
    var covering = 'circle(' + rpct + '% at ' + px + '% ' + py + '%)';
    var holeRadius = end * 1.02;
    var animationKeyframes;
    if (t === 'dark') {
      animationKeyframes = {
        '--pr-theme-hole-radius': ['0px', holeRadius + 'px']
      };
    } else {
      animationKeyframes = { clipPath: [covering, collapsed] };
    }
    var animatedSnapshot = '::view-transition-old(root)';

    var root = document.documentElement;
    root.classList.add(PrTheme.SWITCHING_CLASS);
    root.classList.toggle('pr-theme-reveal', t === 'dark');
    root.style.setProperty('--pr-theme-origin-x', px + '%');
    root.style.setProperty('--pr-theme-origin-y', py + '%');
    root.offsetWidth;

    var vt = document.startViewTransition(function () {
      document.cookie = Aj.state.themeCookie + '=' + themeState + ';path=/;max-age=31536000';
      PrTheme.applyNoFreeze(themeState);
      if (applyInVT) applyInVT();
    });
    activeVT = vt;
    var viewAnimationOwner = null;

    vt.ready.then(function () {
      if (activeVT !== vt) {
        return;
      }
      try {
        var anim = root.animate(
          animationKeyframes,
          { duration: t === 'dark' ? WIPE_DARK_MS : WIPE_LIGHT_MS,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'forwards',
            pseudoElement: animatedSnapshot }
        );
        viewAnimationOwner = {
          animation: anim
        };
        ownedAnimations.push(viewAnimationOwner);
      } catch (e) {}
    }, function () {});

    var clear = function () {
      var isCurrent = activeVT === vt;

      if (viewAnimationOwner) {
        cancelOwnedAnimation(viewAnimationOwner);
        viewAnimationOwner = null;
      }

      if (isCurrent) {
        activeVT = null;
        root.classList.remove(PrTheme.SWITCHING_CLASS);
        root.classList.remove('pr-theme-reveal');
        root.style.removeProperty('--pr-theme-origin-x');
        root.style.removeProperty('--pr-theme-origin-y');
      }
    };
    vt.finished.then(clear, clear);
  }

  function iconRGB() {
    var m = getComputedStyle(btn).color.match(/(\d+)\D+(\d+)\D+(\d+)/);
    return m ? [+m[1], +m[2], +m[3]] : [136, 136, 136];
  }

  function recolourAndDraw(rawPixels) {
    var arr = new Uint8ClampedArray(rawPixels);
    var c = iconRGB();
    for (var k = 0; k < arr.length; k += 4) {
      arr[k] = c[0]; arr[k + 1] = c[1]; arr[k + 2] = c[2];
    }
    ctx.putImageData(new ImageData(arr, W, H), 0, 0);
  }

  function onFrame(frameNo, pixels) {
    rawCache[frameNo] = pixels;
    if (frameNo === cur) recolourAndDraw(pixels);
    if (animTarget !== null) {
      if (cur === animTarget) {
        animTarget = null;
      } else if (frameNo === cur) {
        raf = requestAnimationFrame(stepAnimation);
      }
    }
  }

  function stepAnimation() {
    raf = 0;
    if (!ready || animTarget === null) return;
    if (cur === animTarget) { animTarget = null; return; }
    var dir = animTarget > cur ? 2 : -2;
    var next = cur + dir;
    if ((dir > 0 && next >= animTarget) || (dir < 0 && next <= animTarget)) next = animTarget;
    cur = next;
    player.renderFrame(next);
  }

  function animateTo(target) {
    if (!ready) { cur = target; return; }
    if (raf) cancelAnimationFrame(raf);
    animTarget = target;
    stepAnimation();
  }

  function morphIcon() {
    animateTo(themeState === 'dark' ? MOON_FRAME : SUN_FRAME);
  }

  function snapIcon() {
    if (raf) cancelAnimationFrame(raf);
    animTarget = null;
    cur = (themeState === 'dark' ? MOON_FRAME : SUN_FRAME);
    var raw = rawCache[cur];
    if (raw) {
      recolourAndDraw(raw);
    } else if (player) {
      player.renderFrame(cur);
    }
  }

  return { init: init };
})();
