var RLottie = (function () {
  var rlottie = {}, apiInitStarted = false, apiInited = false, initCallbacks = [];
  var deviceRatio = window.devicePixelRatio || 1;

  var startTime = +(new Date());
  function dT() {
    return '[' + ((+(new Date()) - startTime)/ 1000.0) + '] ';
  }

  rlottie.Api = {};
  rlottie.players = Object.create(null);;
  rlottie.WORKERS_LIMIT = 4;

  var reqId = 0;
  var mainLoopAf = false;
  var mainLoopTo = false;
  var mainLoopInited = false;
  var checkViewportDate = false;
  var lastRenderDate = false;

  var userAgent = window.navigator.userAgent;
  var isSafari = !!window.safari ||
                 !!(userAgent && (/\b(iPad|iPhone|iPod)\b/.test(userAgent) || (!!userAgent.match('Safari') && !userAgent.match('Chrome'))));
  var isRAF = isSafari;
  rlottie.isSafari = isSafari;

  function wasmIsSupported() {
    try {
      if (typeof WebAssembly === 'object' &&
          typeof WebAssembly.instantiate === 'function') {
        const module = new WebAssembly.Module(Uint8Array.of(
          0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00
        ));
        if (module instanceof WebAssembly.Module) {
          return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
      }
    } catch (e) {}
    return false;
  }

  function isSupported() {
    return (
      wasmIsSupported() &&
      typeof Uint8ClampedArray !== 'undefined' &&
      typeof Worker !== 'undefined' &&
      typeof ImageData !== 'undefined'
    );
  }

  rlottie.isSupported = isSupported();

  function mainLoop() {
    var key, rlPlayer, delta, rendered;
    var isEmpty = true;
    var now = +Date.now();
    var checkViewport = !checkViewportDate || (now - checkViewportDate) > 1000;
    for (key in rlottie.players) {
      rlPlayer = rlottie.players[key];
      if (rlPlayer &&
          rlPlayer.frameCount) {
        delta = now - rlPlayer.frameThen;
        if (delta > rlPlayer.frameInterval) {
          rendered = render(rlPlayer, checkViewport);
          if (rendered) {
            lastRenderDate = now;
          }
        }
      }
    }
    // var delay = !lastRenderDate || now - lastRenderDate < 100 ? 16 : 500;
    var delay = 16;
    if (delay < 20 && isRAF) {
      mainLoopAf = requestAnimationFrame(mainLoop)
    } else {
      mainLoopTo = setTimeout(mainLoop, delay);
    }
    mainLoopInited = true;
    if (checkViewport) {
      checkViewportDate = now;
    }
  }
  function setupMainLoop() {
    var isEmpty = true, forceRender = false, rlPlayer;
    for (key in rlottie.players) {
      rlPlayer = rlottie.players[key];
      if (rlPlayer &&
          rlPlayer.frameCount) {
        if (rlPlayer.forceRender) {
          forceRender = true;
        }
        isEmpty = false;
        break;
      }
    }
    if (mainLoopInited === isEmpty || forceRender) {
      mainLoopAf && cancelAnimationFrame(mainLoopAf);
      mainLoopTo && clearTimeout(mainLoopTo);
      mainLoopInited = false;
      if (!isEmpty) {
        if (isRAF) {
          mainLoopAf = requestAnimationFrame(mainLoop);
        } else {
          mainLoopTo = setTimeout(mainLoop, 0);
        }
        mainLoopInited = true;
      }
    }
  }

  function initApi(callback) {
    if (apiInited) {
      callback && callback();
    } else {
      callback && initCallbacks.push(callback);
      if (!apiInitStarted) {
        console.log(dT(), 'tgsticker init');
        apiInitStarted = true;
        QueryableWorkerProxy.init('/js/tgsticker-worker.js?14', rlottie.WORKERS_LIMIT, function() {
          apiInited = true;
          for (var i = 0; i < initCallbacks.length; i++) {
            initCallbacks[i]();
          }
          initCallbacks = [];
        });
      }
    }
  }

  function destroyWorkers() {
    QueryableWorkerProxy.destroy();
    apiInitStarted = apiInited = false;
  }

  function initPlayer(el, options) {
    if (el.rlPlayer) return;
    if (el.tagName.toLowerCase() != 'picture') {
      console.warn('only picture tag allowed');
      return;
    }
    options = options || {};
    var rlPlayer = el.rlPlayer = {};
    rlPlayer.thumb = el.querySelector('img');
    var tgs_sources = el.querySelectorAll('source[type="application/x-tgsticker"]');
    var multi_source = el.hasAttribute('data-multi-source');
    var urls = [], urls_map = {};
    for (var i = 0; i < tgs_sources.length; i++) {
      var tgs_source = tgs_sources[i];
      var url = tgs_source && tgs_source.getAttribute('srcset') || '';
      var frames_align = tgs_source && tgs_source.getAttribute('data-frames-align') || '';
      if (url && !urls_map[url]) {
        urls_map[url] = true;
        urls.push({
          url: url,
          framesAlign: frames_align
        });
        if (!multi_source) {
          break;
        }
      }
    }
    if (!urls.length) {
      console.warn('picture source application/x-tgsticker not found');
      return;
    }
    var pic_width = el.clientWidth || el.getAttribute('width');
    var pic_height = el.clientHeight || el.getAttribute('height');
    var curDeviceRatio = options.maxDeviceRatio ? Math.min(options.maxDeviceRatio, deviceRatio) : deviceRatio;
    if (!pic_width || !pic_height) {
      pic_width = pic_height = 256;
    }
    rlPlayer.reqId = ++reqId;
    rlottie.players[reqId] = rlPlayer;
    rlPlayer.el = el;
    rlPlayer.frameNo = false;
    rlPlayer.nextFrameNo = false;
    rlPlayer.frames = {};
    rlPlayer.width = Math.trunc(pic_width * curDeviceRatio);
    rlPlayer.height = Math.trunc(pic_height * curDeviceRatio);
    rlPlayer.workerProxy = QueryableWorkerProxy.create(rlPlayer.reqId, onFrame, onLoaded);
    rlPlayer.options = options;
    rlPlayer.isVisible = true;
    rlPlayer.paused = !!options.noAutoPlay;
    rlPlayer.needPlayOnce = !!options.playOnce;
    rlPlayer.needPlayUntilEnd = !!options.playUntilEnd;
    rlPlayer.repeatCount = false;
    rlPlayer.waitForFirstFrame = false;
    rlPlayer.stopOnFirstFrame = false;
    rlPlayer.stopOnLastFrame = false;
    rlPlayer.forcePlayFrames = 0;
    rlPlayer.times = [];
    rlPlayer.imageData = new ImageData(rlPlayer.width, rlPlayer.height);
    rlPlayer.workerProxy.loadFromData(urls, rlPlayer.width, rlPlayer.height);
    triggerEvent(rlPlayer.el, 'tg:init');
  }

  function destroyPlayer(el) {
    if (!el.rlPlayer) return;
    var rlPlayer = el.rlPlayer;
    delete rlottie.players[rlPlayer.reqId];
    delete rlPlayer;
    setupMainLoop();
  }

  function render(rlPlayer, checkViewport) {
    if (!rlPlayer.canvas ||
        rlPlayer.canvas.width == 0 ||
        rlPlayer.canvas.height == 0) {
      return false;
    }
    if (!rlPlayer.forceRender) {
      var focused = window.isFocused ? isFocused() : document.hasFocus();
      if (!focused ||
          rlPlayer.paused ||
          !rlPlayer.isVisible ||
          !rlPlayer.frameCount) {
        return false;
      }
      var isInViewport = rlPlayer.isInViewport;
      if (isInViewport === undefined || checkViewport) {
        var rect = rlPlayer.el.getBoundingClientRect();
        if (rect.bottom < 0 ||
            rect.right < 0 ||
            rect.top > (window.innerHeight || document.documentElement.clientHeight) ||
            rect.left > (window.innerWidth || document.documentElement.clientWidth)) {
          isInViewport = false;
        } else {
          isInViewport = true;
        }
        rlPlayer.isInViewport = isInViewport;
      }
      if (!isInViewport) {
        return false;
      }
    }
    var frame = rlPlayer.frameQueue.shift();
    if (frame !== null) {
      doRender(rlPlayer, frame);
      var nextFrameNo = rlPlayer.nextFrameNo;
      if (rlPlayer.stopOnLastFrame &&
          frame.no == rlPlayer.frameCount - 1) {
        rlPlayer.stopOnLastFrame = false;
        if (!rlPlayer.paused) {
          rlPlayer.paused = true;
          triggerEvent(rlPlayer.el, 'tg:pause');
        }
      }
      if (rlPlayer.stopOnFirstFrame &&
          frame.no == 0) {
        if (rlPlayer.waitForFirstFrame) {
          rlPlayer.waitForFirstFrame = false;
        } else {
          rlPlayer.stopOnFirstFrame = false;
          if (!rlPlayer.paused) {
            rlPlayer.paused = true;
            triggerEvent(rlPlayer.el, 'tg:pause');
          }
        }
      }
      if (nextFrameNo !== false) {
        rlPlayer.nextFrameNo = false;
        requestFrame(rlPlayer.reqId, nextFrameNo);
      }
    }

    return true;
  }

  function doRender(rlPlayer, frame) {
    rlPlayer.forceRender = false;
    rlPlayer.imageData.data.set(frame.frame);
    rlPlayer.context.putImageData(rlPlayer.imageData, 0, 0);
    rlPlayer.frameNo = frame.no;
    var now = +(new Date());
    if (rlPlayer.frameThen) {
      rlPlayer.times.push(now - rlPlayer.frameThen)
    }
    rlPlayer.frameThen = now - (now % rlPlayer.frameInterval);
    if (rlPlayer.thumb) {
      rlPlayer.el.removeChild(rlPlayer.thumb);
      delete rlPlayer.thumb;
    }
    // console.log(dT(), '['+rlPlayer.reqId+']', 'render frame#'+frame.no);
  }

  function requestFrame(reqId, frameNo) {
    var rlPlayer = rlottie.players[reqId];
    var frame = rlPlayer.frames[frameNo];
    if (frame) {
      // console.log(dT(), '['+reqId+']', 'request frame#'+frameNo+' (cache)');
      onFrame(reqId, frameNo, frame);
    } else {
      // console.log(dT(), '['+reqId+']', 'request frame#'+frameNo+' (worker)');
      rlPlayer.workerProxy.renderFrame(frameNo, !isSafari);
    }
  }

  function onFrame(reqId, frameNo, frame) {
    var rlPlayer = rlottie.players[reqId];
    if (!rlPlayer || !rlPlayer.frames) {
      return;
    }
    if (!rlPlayer.frames[frameNo] &&
        (!frameNo || (rlPlayer.options.cachingModulo && ((reqId + frameNo) % rlPlayer.options.cachingModulo)))) {
      rlPlayer.frames[frameNo] = new Uint8ClampedArray(frame)
    }
    var prevNo = frameNo > 0 ? frameNo - 1 : rlPlayer.frameCount - 1;
    var lastQueueFrame = rlPlayer.frameQueue.last();
    if (lastQueueFrame &&
        lastQueueFrame.no != prevNo) {
      return;
    }
    rlPlayer.frameQueue.push({
      no: frameNo,
      frame: frame
    });
    var nextFrameNo = ++frameNo;
    if (nextFrameNo >= rlPlayer.frameCount) {
      nextFrameNo = 0;
      if (rlPlayer.times.length) {
        // var avg = 0;
        // for (var i = 0; i < rlPlayer.times.length; i++) {
        //   avg += rlPlayer.times[i] / rlPlayer.times.length;
        // }
        // console.log('avg time: ' +  avg + ', ' + rlPlayer.fps);
        rlPlayer.times = [];
      }
    }
    if (rlPlayer.frameQueue.needsMore()) {
      requestFrame(reqId, nextFrameNo)
    } else {
      rlPlayer.nextFrameNo = nextFrameNo;
    }
  }

  function onLoaded(reqId, frameCount, fps) {
    var rlPlayer = rlottie.players[reqId];

    rlPlayer.canvas = document.createElement('canvas');
    rlPlayer.canvas.width = rlPlayer.width;
    rlPlayer.canvas.height = rlPlayer.height;
    rlPlayer.el.appendChild(rlPlayer.canvas);
    rlPlayer.context = rlPlayer.canvas.getContext('2d');

    rlPlayer.fps = fps;
    rlPlayer.frameInterval = 1000 / rlPlayer.fps;
    rlPlayer.frameThen = Date.now();
    rlPlayer.frameCount = frameCount;
    rlPlayer.forceRender = true;
    rlPlayer.frameQueue = new FrameQueue(fps / 4);
    setupMainLoop();
    requestFrame(reqId, 0);
    triggerEvent(rlPlayer.el, 'tg:load');
    if (frameCount > 0) {
      if (rlPlayer.needPlayOnce) {
        delete rlPlayer.needPlayOnce;
        delete rlPlayer.needPlayUntilEnd;
        rlPlayer.paused = false;
        rlPlayer.stopOnFirstFrame = true;
        rlPlayer.stopOnLastFrame = false;
        if (rlPlayer.frameNo === false ||
            rlPlayer.frameNo > 0) {
          rlPlayer.waitForFirstFrame = true;
        }
      } else if (rlPlayer.needPlayUntilEnd) {
        delete rlPlayer.needPlayOnce;
        delete rlPlayer.needPlayUntilEnd;
        rlPlayer.paused = false;
        rlPlayer.stopOnFirstFrame = false;
        rlPlayer.stopOnLastFrame = true;
      }
    }
    if (!rlPlayer.paused) {
      triggerEvent(rlPlayer.el, 'tg:play');
    }
  }

  rlottie.init = function(el, options) {
    if (!rlottie.isSupported) {
      return false;
    }
    initApi(function() {
      el && initPlayer(el, options);
    });
  }

  rlottie.destroy = function(el) {
    destroyPlayer(el);
  }

  rlottie.playOnce = function(el) {
    if (el && el.rlPlayer) {
      var rlPlayer = el.rlPlayer;
      if (rlPlayer.frameCount > 0) {
        rlPlayer.stopOnFirstFrame = true;
        rlPlayer.stopOnLastFrame = false;
        if (rlPlayer.frameNo > 0) {
          rlPlayer.waitForFirstFrame = true;
        }
        if (rlPlayer.paused) {
          rlPlayer.paused = false;
          triggerEvent(el, 'tg:play');
        }
      } else {
        rlPlayer.needPlayOnce = true;
      }
    }
  }

  rlottie.playUntilEnd = function(el) {
    if (el && el.rlPlayer) {
      var rlPlayer = el.rlPlayer;
      if (rlPlayer.frameCount > 0) {
        rlPlayer.stopOnFirstFrame = false;
        rlPlayer.stopOnLastFrame = true;
        if (rlPlayer.paused) {
          rlPlayer.paused = false;
          triggerEvent(el, 'tg:play');
        }
      } else {
        rlPlayer.needPlayUntilEnd = true;
      }
    }
  }

  rlottie.play = function(el, reset) {
    if (el && el.rlPlayer) {
      if (reset) {
        rlottie.reset(el);
      }
      el.rlPlayer.paused = false;
    }
  }

  rlottie.pause = function(el) {
    if (el && el.rlPlayer) {
      el.rlPlayer.paused = true;
    }
  }

  rlottie.reset = function(el) {
    if (el && el.rlPlayer) {
      var rlPlayer = el.rlPlayer;
      rlPlayer.frameQueue.clear();
      rlPlayer.forceRender = true;
      requestFrame(rlPlayer.reqId, 0);
      setupMainLoop();
    }
  }

  rlottie.destroyWorkers = function() {
    destroyWorkers();
  }

  return rlottie;
}());


var QueryableWorkerProxy = (function() {
  var workerproxy = {};
  var proxyId = 0;
  var wReqId = 0;
  var rObjs = {};
  var wrMap = {};
  var proxies = {};
  var rlottieWorkers = [], curWorkerNum = 0;

  var startTime = +(new Date());
  function dT() {
    return '[' + ((+(new Date()) - startTime)/ 1000.0) + '] ';
  }

  function Proxy(playerId, onFrame, onLoaded) {
    this.proxyId = ++proxyId;
    this.playerId = playerId;
    this.onFrame = onFrame;
    this.onLoaded = onLoaded;
    this.items = [];
    this.itemsMap = {};
    proxies[this.proxyId] = this;
    return this;
  };
  Proxy.prototype.loadFromData = function(urls, width, height) {
    if (this.items.length > 0) {
      console.warn('already loaded');
      return;
    }
    this.clampedSize = width * height * 4;
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      var _wReqId = ++wReqId;
      var worker = rlottieWorkers[curWorkerNum++];
      if (curWorkerNum >= rlottieWorkers.length) {
        curWorkerNum = 0;
      }
      worker.sendQuery('loadFromData', _wReqId, url.url, width, height);
      var item = {
        reqId: _wReqId,
        worker: worker,
        url: url.url,
        loaded: false,
        clamped: new Uint8ClampedArray(this.clampedSize),
        frameLoaded: {}
      };
      if (url.framesAlign) {
        item.framesAlign = url.framesAlign;
      }
      this.items.push(item);
      this.itemsMap[_wReqId] = item;
      wrMap[_wReqId] = this.proxyId;
    }
    if (this.items.length > 1) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
      this.imageData = new ImageData(width, height);
    }
  };
  Proxy.prototype.renderFrame = function(frameNo, need_clamped) {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      var realFrameNo = frameNo;
      if (item.framesAlign == 'right') {
        realFrameNo = frameNo - (this.frameCount - item.frameCount);
      }
      if (need_clamped) {
        if(!item.clamped.length) { // fix detached
          item.clamped = new Uint8ClampedArray(this.clampedSize);
        }
        item.worker.sendQuery('renderFrame', item.reqId, realFrameNo, item.clamped);
      } else {
        item.worker.sendQuery('renderFrame', item.reqId, realFrameNo);
      }
      // console.log(dT(), '['+this.playerId+'.'+item.reqId+']', 'request frame#'+frameNo+' (worker)');
    }
  };

  function onFrame(wReqId, realFrameNo, frame) {
    var proxyId = wrMap[wReqId];
    var proxy = proxies[proxyId];
    var item = proxy.itemsMap[wReqId];
    var frameNo = realFrameNo;
    if (item.framesAlign == 'right') {
      frameNo = realFrameNo + (proxy.frameCount - item.frameCount);
    }
    // console.log(dT(), '['+proxy.playerId+'.'+item.reqId+']', 'onframe#'+frameNo+' (worker)');
    item.frameLoaded[frameNo] = frame;
    var finished = true;
    for (var i = 0; i < proxy.items.length; i++) {
      var item = proxy.items[i];
      var loadedFrame = item.frameLoaded[frameNo];
      if (!loadedFrame) {
        finished = false;
        break;
      }
    }
    if (finished) {
      if (proxy.items.length == 1) {
        var loadedFrame = proxy.items[0].frameLoaded[frameNo];
        proxy.onFrame(proxy.playerId, frameNo, loadedFrame);
        delete proxy.items[0].frameLoaded[frameNo];
      } else {
        var promises = [];
        for (var i = 0; i < proxy.items.length; i++) {
          var item = proxy.items[i];
          var loadedFrame = item.frameLoaded[frameNo];
          proxy.imageData.data.set(loadedFrame);
          var promise = createImageBitmap(proxy.imageData);
          promises.push(promise);
          delete item.frameLoaded[frameNo];
        }
        Promise.all(promises).then(function(bitmaps) {
          proxy.context.clearRect(0, 0, proxy.canvas.width, proxy.canvas.height);
          for (var i = 0; i < bitmaps.length; i++) {
            proxy.context.drawImage(bitmaps[i], 0, 0);
          }
          var imageData = proxy.context.getImageData(0, 0, proxy.canvas.width, proxy.canvas.height);
          proxy.onFrame(proxy.playerId, frameNo, imageData.data);
        });
      }
    } else {
      delete frameDatas;
    }
  }

  function onLoaded(wReqId, frameCount, fps) {
    var proxyId = wrMap[wReqId];
    var proxy = proxies[proxyId];
    var item = proxy.itemsMap[wReqId];
    item.loaded = true;
    item.frameCount = frameCount;
    item.fps = fps;
    var finished = true;
    frameCount = null; fps = null;
    for (var i = 0; i < proxy.items.length; i++) {
      var item = proxy.items[i];
      if (!item.framesAlign) {
        if (frameCount === null) {
          frameCount = item.frameCount;
        } else if (frameCount !== false && frameCount !== item.frameCount) {
          frameCount = false;
        }
      }
      if (fps === null) {
        fps = item.fps;
      } else if (fps !== false && fps !== item.fps) {
        fps = false;
      }
      if (!item.loaded) {
        finished = false;
        break;
      }
    }
    if (finished) {
      if (frameCount === null) {
        console.warn('Frame count not defined'); return;
      }
      if (frameCount === false) {
        console.warn('Frame count is different'); return;
      }
      if (fps === null) {
        console.warn('FPS not defined'); return;
      }
      if (fps === false) {
        console.warn('FPS is different'); return;
      }
      proxy.frameCount = frameCount;
      proxy.fps = fps;
      proxy.onLoaded(proxy.playerId, frameCount, fps);
    }
  }

  workerproxy.init = function(worker_url, workers_limit, callback) {
    var workersRemain = workers_limit;
    var firstWorker = rlottieWorkers[0] = new QueryableWorker(worker_url);
    firstWorker.addListener('ready', function () {
      console.log(dT(), 'worker #0 ready');
      firstWorker.addListener('frame', onFrame);
      firstWorker.addListener('loaded', onLoaded);
      --workersRemain;
      if (!workersRemain) {
        console.log(dT(), 'workers ready');
        callback && callback();
      } else {
        for (var workerNum = 1; workerNum < workers_limit; workerNum++) {
          (function(workerNum) {
            var rlottieWorker = rlottieWorkers[workerNum] = new QueryableWorker(worker_url);
            rlottieWorker.addListener('ready', function () {
              console.log(dT(), 'worker #' + workerNum + ' ready');
              rlottieWorker.addListener('frame', onFrame);
              rlottieWorker.addListener('loaded', onLoaded);
              --workersRemain;
              if (!workersRemain) {
                console.log(dT(), 'workers ready');
                callback && callback();
              }
            });
          })(workerNum);
        }
      }
    });
  };
  workerproxy.create = function(playerId, onFrame, onLoaded) {
    return new Proxy(playerId, onFrame, onLoaded);
  };
  workerproxy.destroy = function() {
    for (var workerNum = 0; workerNum < rlottieWorkers.length; workerNum++) {
      rlottieWorkers[workerNum].terminate();
      console.log('worker #' + workerNum + ' terminated');
    }
    console.log('workers destroyed');
    rlottieWorkers = [];
  };

  return workerproxy;
}());

function QueryableWorker(url, defaultListener, onError) {
  var instance = this;
  var worker = new Worker(url);
  var listeners = {};

  this.defaultListener = defaultListener || function() {};

  if (onError) {worker.onerror = onError;}

  this.postMessage = function(message) {
    worker.postMessage(message);
  }

  this.terminate = function() {
    worker.terminate();
  }

  this.addListener = function(name, listener) {
    listeners[name] = listener;
  }

  this.removeListener = function(name) {
    delete listeners[name];
  }

  /*
    This functions takes at least one argument, the method name we want to query.
    Then we can pass in the arguments that the method needs.
  */
  this.sendQuery = function(queryMethod) {
    if (arguments.length < 1) {
      throw new TypeError('QueryableWorker.sendQuery takes at least one argument');
      return;
    }
    var queryMethod = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    if (RLottie.isSafari) {
      worker.postMessage({
        'queryMethod': queryMethod,
        'queryMethodArguments': args
      });
    } else {
      var transfer = [];
      for(var i = 0; i < args.length; i++) {
        if(args[i] instanceof ArrayBuffer) {
          transfer.push(args[i]);
        }

        if(args[i].buffer && args[i].buffer instanceof ArrayBuffer) {
          transfer.push(args[i].buffer);
        }
      }

      worker.postMessage({
        'queryMethod': queryMethod,
        'queryMethodArguments': args
      }, transfer);
    }
  }

  worker.onmessage = function(event) {
    if (event.data instanceof Object &&
      event.data.hasOwnProperty('queryMethodListener') &&
      event.data.hasOwnProperty('queryMethodArguments')) {
      listeners[event.data.queryMethodListener].apply(instance, event.data.queryMethodArguments);
    } else {
      this.defaultListener.call(instance, event.data);
    }
  }
}

function FrameQueue(maxLength) {
  this.queue = [];
  this.maxLength = maxLength;
}

FrameQueue.prototype.needsMore = function frameQueueNeedsMore() {
  return this.queue.length < this.maxLength;
}

FrameQueue.prototype.empty = function frameQueueEmpty() {
  return !this.queue.length;
}

FrameQueue.prototype.notEmpty = function frameQueueEmpty() {
  return this.queue.length > 0;
}

FrameQueue.prototype.push = function frameQueuePush(element) {
  return this.queue.push(element);
}

FrameQueue.prototype.shift = function frameQueueShift() {
  return this.queue.length ? this.queue.shift() : null;
}

FrameQueue.prototype.last = function frameQueueLast(element) {
  return this.queue.length ? this.queue[this.queue.length - 1] : null;
}

FrameQueue.prototype.clear = function frameQueueClear() {
  this.queue = [];
  return true;
}


if (!this.CustomEvent || typeof this.CustomEvent === "object") {
  (function() {
    this.CustomEvent = function CustomEvent(type, eventInitDict) {
      var event;
      eventInitDict = eventInitDict || {bubbles: false, cancelable: false, detail: undefined};

      try {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
      } catch (error) {
        event = document.createEvent('Event');
        event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
        event.detail = eventInitDict.detail;
      }

      return event;
    };
  })();
}

function triggerEvent(el, event_type, init_dict) {
  var event = new CustomEvent(event_type, init_dict);
  el.dispatchEvent(event);
}