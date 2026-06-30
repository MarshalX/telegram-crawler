/* Right-hand "ON THE PAGE" nav: smooth in-page scrolling + scrollspy.
   Created by initDevPageNav() (main.js), which calls window.initDevSideNavX(). */
window.initDevSideNavX = (function () {
  var teardown = null;
  return function () {
  var sideNav = document.querySelector('.dev_side_nav');
  if (!sideNav) return;
  /* Idempotent: skip if already wired up for the current <ul>. */
  if (sideNav.dataset.localNav === '1') return;
  sideNav.dataset.localNav = '1';

  /* Tear down previous instance so listeners don't accumulate. */
  if (teardown) teardown();

  var navUl = sideNav.querySelector('ul');
  if (!navUl) { sideNav.dataset.localNav = ''; return; }
  var HEADER_OFFSET = 100;

  /* Side nav rail: masked SVG path (grey rail + blue active span). */
  var rail = null, railBg = null, railThumb = null;
  if (navUl) {
    rail = document.createElement('div');
    rail.className = 'dev_side_nav_rail';
    railBg = document.createElement('div');
    railBg.className = 'dev_side_nav_rail_bg';
    railThumb = document.createElement('div');
    railThumb.className = 'dev_side_nav_rail_thumb';
    rail.appendChild(railBg);
    rail.appendChild(railThumb);
    navUl.appendChild(rail);
  }

  var GROUP_X = 0, NESTED_X = 12, STROKE = 2;

  function isVisible(a) { return a.getClientRects().length > 0; }

  function segOf(a) {
    var r = a.getBoundingClientRect();
    var st = getComputedStyle(a);
    var cTop = (r.top - navUl.getBoundingClientRect().top) + navUl.scrollTop;
    return {
      top: cTop + parseFloat(st.paddingTop),
      bottom: cTop + a.clientHeight - parseFloat(st.paddingBottom)
    };
  }

  function groupOf(li) {
    var p = li.parentNode && li.parentNode.closest('li');
    return p || li;
  }

  function isNested(li) {
    return !!(li.parentNode && li.parentNode.closest('li'));
  }

  function buildRail() {
    if (!rail || !navUl) return;
    /* One continuous path: top-level titles at x=0, nested children at x=12,
       with diagonal bends between the two levels. */
    var rows = [];
    for (var k = 0; k < entries.length; k++) {
      var a = entries[k].link;
      if (!isVisible(a)) continue;
      rows.push({ a: a, x: isNested(entries[k].li) ? NESTED_X : GROUP_X });
    }
    if (!rows.length) { rail.style.height = '0px'; return; }

    var w = 0, h = 0, d = [];
    for (var i = 0; i < rows.length; i++) {
      var off = rows[i].x + 1;
      var s = segOf(rows[i].a);
      w = Math.max(w, off);
      h = Math.max(h, s.bottom);
      d.push((i === 0 ? 'M' : 'L') + off + ' ' + s.top);
      d.push('L' + off + ' ' + s.bottom);
    }
    var width = w + 1;
    rail.style.width = width + 'px';
    rail.style.height = h + 'px';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + h +
      '"><path d="' + d.join(' ') + '" stroke="black" stroke-width="' + STROKE +
      '" fill="none" stroke-linejoin="round"/></svg>';
    var mask = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
    rail.style.webkitMaskImage = mask;
    rail.style.maskImage = mask;
  }

  function positionThumb(link) {
    if (!railThumb || !navUl) return;
    var s = segOf(link);
    railThumb.style.marginTop = s.top + 'px';
    railThumb.style.height = (s.bottom - s.top) + 'px';
  }

  function resolve(link) {
    var sel = link.getAttribute('data-target') || '';
    if (sel.charAt(0) !== '#' || sel.length < 2) return null;
    return document.getElementById(sel.slice(1));
  }

  var entries = [];
  Array.prototype.forEach.call(sideNav.querySelectorAll('a[data-target]'), function (link) {
    var target = resolve(link);
    if (target) entries.push({ link: link, li: link.parentNode, target: target });
  });
  if (!entries.length) return;

  var programmatic = false, programmaticTarget = 0, settleTimer = null;

  /* Smooth scroll on click. Scrollspy is suspended during the programmatic
     scroll so the menu doesn't flash intermediate sections open. */
  function onNavClick(event) {
    var link = event.target.closest('a[data-target]');
    if (!link || !sideNav.contains(link)) return;
    var target = resolve(link);
    if (!target) return;
    event.preventDefault();

    var entry = null;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].link === link) { entry = entries[i]; break; }
    }
    /* Top-level headers: snap instantly, no animation. Sub-items: glide. */
    var isHeader = !!(entry && !(entry.li.parentNode && entry.li.parentNode.closest('li')));
    programmatic = true;
    if (entry) applyCurrent(entry, isHeader);

    var top = target.getBoundingClientRect().top + window.pageYOffset - 20;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    programmaticTarget = Math.max(0, Math.min(top, maxScroll));
    window.scrollTo({ top: top, behavior: isHeader ? 'auto' : 'smooth' });
    var hash = link.getAttribute('data-target');
    if (history.replaceState) history.replaceState(null, '', hash);
    else window.location.hash = hash;

    /* Hard fallback in case the destination is never reached exactly. */
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(endProgrammatic, 2000);
  }
  sideNav.addEventListener('click', onNavClick);

  function keepLinkVisible(link) {
    if (!navUl) return;
    var l = link.getBoundingClientRect();
    var u = navUl.getBoundingClientRect();
    if (l.top < u.top) navUl.scrollTop -= (u.top - l.top) + 8;
    else if (l.bottom > u.bottom) navUl.scrollTop += (l.bottom - u.bottom) + 8;
  }

  var ticking = false;
  var lastGroup = null;

  function findCurrent() {
    var scrollPos = window.pageYOffset + HEADER_OFFSET;
    var atBottom = window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 2;
    var current = null;
    for (var i = 0; i < entries.length; i++) {
      var top = entries[i].target.getBoundingClientRect().top + window.pageYOffset;
      if (top <= scrollPos) current = entries[i];
    }
    if (atBottom) current = entries[entries.length - 1];
    return current || entries[0];
  }

  function applyCurrent(current, forceSnap) {
    if (!current) return;
    var marked = sideNav.querySelectorAll('li.active, li.is-current');
    Array.prototype.forEach.call(marked, function (li) {
      li.classList.remove('active', 'is-current');
    });

    /* "is-current" drives the highlight; "active" expands the parent group
       so nested children are visible. */
    current.li.classList.add('active', 'is-current');
    var groupLi = current.li.parentNode && current.li.parentNode.closest('li');
    var nested = !!(groupLi && groupLi !== current.li);
    if (nested) groupLi.classList.add('active');
    keepLinkVisible(current.link);

    var group = groupOf(current.li);
    var groupChanged = group !== lastGroup;
    if (groupChanged) { buildRail(); lastGroup = group; }

    if ((groupChanged || forceSnap) && railThumb) {
      /* Snap indicator into place without sliding animation. */
      railThumb.classList.remove('is-animated');
      positionThumb(current.link);
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          if (railThumb) railThumb.classList.add('is-animated');
        });
      });
    } else {
      positionThumb(current.link);
    }
  }

  function updateActive() {
    ticking = false;
    applyCurrent(findCurrent());
  }

  function endProgrammatic() {
    programmatic = false;
    window.clearTimeout(settleTimer);
    updateActive();
  }

  function onScroll() {
    if (programmatic) {
      /* Stay suspended until we actually arrive at the destination. */
      if (Math.abs(window.pageYOffset - programmaticTarget) <= 2) endProgrammatic();
      return;
    }
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActive);
  }

  /* Recompute the rail on layout shifts: late CSS, web fonts, resize, reflow. */
  var relayoutTick = false;
  function relayout() {
    if (relayoutTick) return;
    relayoutTick = true;
    window.requestAnimationFrame(function () {
      relayoutTick = false;
      lastGroup = null;
      updateActive();
    });
  }

  var resizeObserver = null;
  if (window.ResizeObserver && navUl) {
    resizeObserver = new ResizeObserver(relayout);
    resizeObserver.observe(navUl);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', relayout);
  window.addEventListener('load', relayout);

  updateActive();
  /* Enable slide transition after first placement so indicator doesn't
     animate in from the top on load. */
  window.requestAnimationFrame(function () {
    if (railThumb) railThumb.classList.add('is-animated');
  });

  /* Teardown so re-init can cleanly remove listeners + observer. */
  teardown = function () {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', relayout);
    window.removeEventListener('load', relayout);
    if (resizeObserver) resizeObserver.disconnect();
    if (sideNav) sideNav.removeEventListener('click', onNavClick);
  };
  };
})();

/* Day/night theme toggle — animated sun↔moon icon via RLottie.
   Falls back to static SVG when tgsticker.js isn't loaded. */
(function () {
  var W = 44, H = 44; // render at 2x of the 22px display size
  var SUN_FRAME = 0;  // frame 0 = sun (light)
  var MOON_FRAME = 0; // last frame = moon (dark); set after load

  var COOKIE_NAME = 'stel_theme';
  var COOKIE_MAX_AGE = 31536000;  // ~1 year

  function cookieDomain() {
    var parts = location.hostname.split('.');
    if (parts.length < 2) return '';
    return '.' + parts.slice(-2).join('.');
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (window.$) {
      $(document.documentElement).trigger('themechange');
    }
    document.dispatchEvent(new Event('darkmode'));
    var domain = cookieDomain();
    document.cookie = COOKIE_NAME + '=' + t +
      '; path=/; max-age=' + COOKIE_MAX_AGE +
      (domain ? '; domain=' + domain : '') + '; samesite=lax';
  }

  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var head = document.querySelector('.dev_page_head, .tl_page_head, .tlb_page_head');
  if (head) btn.style.height = head.offsetHeight + 'px';   // align to header height

  /* JS is source of truth so rapid clicks stay correct during transitions. */
  var themeState = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  /* ---- Shared: demo video freeze/thaw + radial-wipe view transition ---- */

  /* Freeze playing demo videos before the transition — their white backdrop
     flashes over the dark side of the wipe. Resume in light mode after. */
  var frozenDemos = [];
  function freezeDemoVideos() {
    frozenDemos = [];
    var links = document.querySelectorAll(
      '.tl_main_download_link_android, .tl_main_download_link_ios');
    Array.prototype.forEach.call(links, function (link) {
      var v = link.querySelector('video');
      if (!v) return;
      if (link.classList.contains('video_play')) frozenDemos.push(link);
      link.classList.remove('video_play');     // reveal the static image
      try { v.pause(); } catch (e) {}
      link.isHover = 0;                         // keep main.js hover state in sync
      if (link.outTimeout) { clearTimeout(link.outTimeout); delete link.outTimeout; }
    });
  }
  function thawDemoVideos() {
    /* Only resume in light mode, where the pointer is still on the button. */
    if (themeState !== 'dark' && typeof window.mainDemoVideoHover === 'function') {
      frozenDemos.forEach(function (link) {
        if (link.matches && link.matches(':hover')) window.mainDemoVideoHover(link, 1);
      });
    }
    frozenDemos = [];
  }

  var WIPE_DARK_MS = 800;
  var WIPE_LIGHT_MS = 500;
  var activeVT = null;

  /* doToggle: radial-wipe view transition. applyInVT/applyInstant are
     optional icon callbacks for VT and non-VT paths respectively. */
  function doToggle(applyInVT, applyInstant) {
    themeState = themeState === 'dark' ? 'light' : 'dark';
    var t = themeState;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    freezeDemoVideos();

    /* No View Transitions: instant theme change. */
    if (!document.startViewTransition) {
      setTheme(t);
      if (applyInstant) applyInstant(reduce);
      thawDemoVideos();
      return;
    }
    /* Reduced motion: snap, no reveal. */
    if (reduce) {
      setTheme(t);
      if (applyInstant) applyInstant(reduce);
      thawDemoVideos();
      return;
    }

    /* Skip any in-flight transition so a new click never has to wait. */
    if (activeVT && activeVT.skipTransition) { try { activeVT.skipTransition(); } catch (e) {} }

    /* Origin = centre of the toggle. Guard against degenerate/non-finite
       values that would default the wipe to screen centre. */
    var vw = innerWidth, vh = innerHeight;
    var r = btn.getBoundingClientRect();
    var cx = r.width ? r.left + r.width / 2 : vw;
    var cy = r.height ? r.top + r.height / 2 : 0;
    if (!isFinite(cx)) cx = vw;
    if (!isFinite(cy)) cy = 0;
    var end = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    if (!isFinite(end) || end <= 0) end = Math.hypot(vw, vh);

    /* Use percentages for origin — "at <length> <length>" form is silently
       dropped by some Chrome builds when animated via WAAPI. */
    var ref  = Math.hypot(vw, vh) / Math.SQRT2; // circle() 100% reference (logical px)
    var px = vw ? (cx / vw) * 100 : 95, py = vh ? (cy / vh) * 100 : 2;
    var from, to;
    if (t === 'dark') {
      var s  = window.devicePixelRatio || 1;
      var cxp = cx * s, cyp = cy * s; // hole centre = toggle, physical px
      var maxR = end * s * 1.02; // radius that covers the far corner (+2% AA)
      var rectRight = vw * s + 1, rectBottom = vh * s + 1; // outer rect = whole snapshot
      var holePath = function (r) {
        var rect = 'M-1 -1H' + rectRight + 'V' + rectBottom + 'H-1Z';
        var hole = 'M' + (cxp - r) + ' ' + cyp +
                   'A' + r + ' ' + r + ' 0 1 0 ' + (cxp + r) + ' ' + cyp +
                   'A' + r + ' ' + r + ' 0 1 0 ' + (cxp - r) + ' ' + cyp + 'Z';
        return "path(evenodd, '" + rect + hole + "')";
      };
      from = holePath(0.01); // ~no hole → old fully covers (tiny r, not 0, keeps the arcs for WAAPI)
      to   = holePath(maxR); // hole spans the viewport → old fully drained
    } else {
      var ref  = Math.hypot(vw, vh) / Math.SQRT2; // circle() 100% reference
      var rpct = ref ? (end / ref) * 100 + 1 : 145; // covering radius as % (+1% guards AA)
      from = 'circle(' + rpct + '% at ' + px + '% ' + py + '%)'; // old fully covers
      to   = 'circle(0% at ' + px + '% ' + py + '%)'; // old collapsed into the toggle
    }

    var vt = document.startViewTransition(function () {
      setTheme(themeState); // latest intent (source of truth)
      if (applyInVT) applyInVT(); // icon's new snapshot = target frame
    });
    activeVT = vt;
    vt.ready.then(function () {
      document.documentElement.animate(
        { clipPath: [from, to] },
        { duration: t === 'dark' ? WIPE_DARK_MS : WIPE_LIGHT_MS,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)', // Telegram EASE_OUT_QUINT
          fill: 'forwards', // hold circle(0%) through VT teardown — else the
                            // clip reverts for a frame and the old theme flashes back
          pseudoElement: '::view-transition-old(root)' }
      );
    });
    var clear = function () { if (activeVT === vt) activeVT = null; thawDemoVideos(); };
    vt.finished.then(clear, clear);
  }

  /* ---------- Static SVG fallback (no RLottie) ---------- */
  var replaced = false;
  if (typeof RLottie === 'undefined' || !RLottie.isSupported) {
    btn.addEventListener('click', function () { doToggle(null, null); });
    return;
  }

  /* ---------- Animated lottie path ---------- */
  /* Replace static SVGs with a canvas for lottie rendering. */
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  btn.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var player = null, ready = false, cur = 0, raf = 0, animTarget = null;
  var rawCache = {};  // frameNo → Uint8ClampedArray (raw white pixels from worker)

  function iconRGB() {
    var m = getComputedStyle(btn).color.match(/(\d+)\D+(\d+)\D+(\d+)/);
    return m ? [+m[1], +m[2], +m[3]] : [136, 136, 136];
  }

  /* The lottie is pure white; recolour RGB to theme colour, keep alpha. */
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
    /* Draw only if this is the frame we want to show. */
    if (frameNo === cur) recolourAndDraw(pixels);
    /* Advance the morph if we haven't reached the target. */
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
    var dir = animTarget > cur ? 2 : -2;     // ~2 frames per tick (~0.3s morph)
    var next = cur + dir;
    if ((dir > 0 && next >= animTarget) || (dir < 0 && next <= animTarget)) next = animTarget;
    cur = next;                  // optimistic: onFrame draws when the worker answers
    player.renderFrame(next);
  }

  function animateTo(target) {
    if (!ready) { cur = target; return; }
    if (raf) cancelAnimationFrame(raf);
    animTarget = target;
    stepAnimation();
  }

  function morphIcon() {                    // morph toward the current themeState
    animateTo(themeState === 'dark' ? MOON_FRAME : SUN_FRAME);
  }

  function snapIcon() {                     // snap to the frame matching themeState
    if (raf) cancelAnimationFrame(raf);
    animTarget = null;
    cur = (themeState === 'dark' ? MOON_FRAME : SUN_FRAME);
    var raw = rawCache[cur];
    if (raw) {
      /* Synchronous draw from cache — vital for view-transition snapshots. */
      recolourAndDraw(raw);
    } else if (player) {
      player.renderFrame(cur);   // first time only; subsequent snaps hit the cache
    }
  }

  btn.addEventListener('click', function () {
    doToggle(
      function () { snapIcon(); },             // inside VT callback: snap to target frame
      function (reduce) {                       // instant (no VT or reduced motion):
        if (reduce) snapIcon(); else morphIcon();
      }
    );
  });

  /* Boot: init wasm workers, load .tgs, pre-render both end frames
     so the first snap is synchronous. */
  RLottie.initWorkers(function () {
    player = RLottie.createRawPlayer(W, H, function (frameCount, fps) {
      MOON_FRAME = frameCount - 1;
      ready = true;
      cur = themeState === 'dark' ? MOON_FRAME : SUN_FRAME;
      player.renderFrame(cur);             // display the current theme's icon
      var other = themeState === 'dark' ? SUN_FRAME : MOON_FRAME;
      player.renderFrame(other);           // pre-fill the cache (no draw: other !== cur)
      if (!replaced) {
        btn.classList.remove('theme-toggle--static');
        replaced = true;
      }
    }, onFrame);
    player.loadFromUrl('/img/sun_outline.tgs');
  });
})();
