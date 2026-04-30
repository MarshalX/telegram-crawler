function prepareGraphJson(json) {
  var callableParams = ['xTickFormatter', 'xTooltipFormatter', 'xRangeFormatter', 'yTickFormatter', 'yTooltipFormatter', 'x_on_zoom', 'sideLegend'];
  callableParams.forEach(function (k) {
    if (typeof json[k] === 'string') {
      json[k] = eval('(' + json[k] + ')');
    }
  });
  var customFormatters;
  if (customFormatters = json.yCustomTooltipFormatters) {
    for (var k in customFormatters) {
      if (typeof customFormatters[k] === 'string') {
        customFormatters[k] = eval('(' + customFormatters[k] + ')');
      }
    };
  }
  console.log('new json', json);
  return json;
}

function zoomGraphX(x, tokenData) {
  var basePath = window.basePath || '';
  return fetch(basePath + '/zoomed', {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'x=' + x + '&id=' + tokenData.id + '&date=' + tokenData.date + '&token=' + tokenData.token
  }).then(function (response) {
    if (response.status !== 200) {
      console.error('Zoom fetch error. Status Code: ', response);
      return Promise.reject();
    }
    return response.json().then(function (json) {      
      return prepareGraphJson(json);
    });
  });
}

function fetchGraph(id, tokenData, retry) {
  var domEl = document.getElementById(id);
  if (!domEl) {
    console.warn('graph el #' + id + ' not found');
    return;
  }
  var loadingEl = domEl.querySelector('.chart_wrap_loading');
  var basePath = window.basePath || '';
  retry = retry || 0;
  return fetch(basePath + '/asyncgraph' + (tokenData.test ? '?_test=1' : ''), {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'id=' + tokenData.id + '&date=' + tokenData.date + '&token=' + tokenData.token
  }).then(function (response) { 
    if (response.status !== 200) {
      console.error('Async graph fetch error. Status Code: ', response);
      if (response.status === 500) {
        loadingEl.innerHTML = 'Internal Server Error, Retrying '+(++retry) +'...';
        setTimeout(function () {
          fetchGraph(id, tokenData, retry)
        }, 1000 * retry);
      }
      return;
    }
    return response.json().then(function (json) {
      renderGraph(id, json);
    });
  });
}

function renderGraph(id, json, initial) {
  var domEl = document.getElementById(id);
  var loadingEl = domEl.querySelector('.chart_wrap_loading');
  var isScatter = json.scatter || (json.types && Object.keys(json.types).some(function(k){return json.types[k]=='scatter'}));
  var dynEnabled = isDynamicEnabled(json);
  var rawJson = dynEnabled ? deepCloneJson(json) : null;

  if (!isScatter && (!json.columns.length || json.columns[0].length <= 2)) {
    if (loadingEl) {
      loadingEl.innerHTML = 'Not enough data to display.';
    }
    return;
  }

  if (dynEnabled && detectModeFromJson(rawJson) === 'relative') {
    delete json.x_on_zoom;
  }

  json = prepareGraphJson(json);
  var chart = Graph.render(domEl, json);
  domEl.classList.add('chart_wrap_rendered');
  window.charts = window.charts || {};
  window.charts[id] = chart;

  if (dynEnabled) {
    try {
      initDynamicModeToggle(domEl, chart, rawJson);
    } catch (e) {
      console.warn('dynamic toggle init failed', e);
    }
  }

  setTimeout(function () {
    if (loadingEl) {
      loadingEl.parentNode && loadingEl.parentNode.removeChild(loadingEl)
    }
  }, 1000);

  if (json.csvExport) {
    var exportHTML = '<div class="chart_csv_export_wrap"><a class="csv_link" href="' + json.csvExport + '"><span class="glyphicon glyphicon-download-alt"></span> CSV</a>'+(json.addExport||'')+'</div>';
    var t = document.createElement('div');
    t.innerHTML = exportHTML;
    domEl.appendChild(t.firstChild);
  }

  if (json.descEditData || domEl.getAttribute('data-desc-addr')) {
    var editPill = document.createElement('a');
    editPill.className = 'graph_desc_edit_pill';
    editPill.innerHTML = '<span class="glyphicon glyphicon-pencil"></span>';
    var descData = json.descEditData || {
      addr: domEl.getAttribute('data-desc-addr'),
      graphId: domEl.getAttribute('data-desc-graph-id'),
      keywords: domEl.getAttribute('data-desc-keywords'),
      descMd: domEl.getAttribute('data-desc-md')
    };
    editPill.setAttribute('data-addr', descData.addr);
    editPill.setAttribute('data-graph-id', descData.graphId);
    editPill.setAttribute('data-keywords', descData.keywords);
    editPill.setAttribute('data-desc-md', descData.descMd);

    var exportWrap = domEl.querySelector('.chart_csv_export_wrap');
    if (exportWrap) {
      exportWrap.appendChild(editPill);
    } else {
      var wrap = document.createElement('div');
      wrap.className = 'chart_csv_export_wrap';
      wrap.appendChild(editPill);
      domEl.appendChild(wrap);
    }
  }

  if (json.descHtml) {
    var descRow = document.createElement('div');
    descRow.className = 'graph_desc_row';
    descRow.innerHTML = '<span class="graph_desc_text">' + json.descHtml + '</span>';
    domEl.parentNode.insertBefore(descRow, domEl.nextSibling);
  }

  return chart;
}

function statsFormatXCategories(x, categories) {
  return categories[x] === undefined ? '' : categories[x];
}

function statsFormatKMBT(x, kmbt, precision) {
  return window.Graph.units.TUtils.statsFormatKMBT(x, kmbt, precision);
}

function statsFormatDayHourFull(hour) {
  return hour + ':00-' + hour + ':59';
}
function statsFormatDayHour(hour) {
  return hour + ':00';
}

var statShortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var statShortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


function statsFormat(period) {
  switch (period) {
    case 'minute':
    case '5min':
      return statsFormat5min;

    case 'hour':
      return statsFormatHour;

    case 'week':
      return statsFormatWeek;

    case 'month':
      return statsFormatMonth;

    case 'day':
    default:
      return null;
  }
}

function statsTooltipFormat(period) {
  switch (period) {
    case 'week':
      return statsFormatWeekFull;
    case 'month':
      return statsFormatMonthFull;
  }
  return statsFormat(period);
}

function formatNumber(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''
  var toFixedFix = function (n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
    } else {
      var arr = ('' + n).split('e')
      var sig = ''
      if (+arr[1] + prec > 0) {
        sig = '+'
      }
      return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
    }
  }
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

function statsFormatAxisPercent(value) {
  return value + '%';
}

function statsFormatPercent(value) {
  var decimals = Math.floor(value * 100) % 100 > 0 ? 2 : 0;
  return formatNumber(value, decimals, '.', ',') + '%';
}

function statsFormatAxisAmountTpl(tpl, factor, value, decimals) {
  if (value % factor > 0) {
    decimals = decimals || 0;
    var max_decimals = Math.log10(factor);
    while (value % Math.pow(10, max_decimals - decimals)) {
      decimals++;
      if (decimals >= 3) break;
    }
    value = formatNumber(value / factor, decimals, '.', ',');
  } else {
    value = statsFormatKMBT(value / factor);
  }
  return tpl.replace('{value}', value);
}

function statsFormatAxisAmountFn(tpl, factor, decimals) {
  return function(value) {
    return statsFormatAxisAmountTpl(tpl, factor, value, decimals || 0);
  };
}

function statsFormatAxisAmount(value) {
  return statsFormatAxisAmountTpl('€ {value}', 1000000, value, 2);
}

function statsFormatAmountTpl(tpl, factor, value, decimals, rate) {
  decimals = decimals || 0;
  var max_decimals = Math.log10(factor);
  while (value % Math.pow(10, max_decimals - decimals) &&
         value < Math.pow(10, max_decimals + 4 - decimals)) {
    decimals++;
  }
  var def_val = '';
  if (rate && rate != 1) {
    def_val = statsFormatAmount(value);
    value /= rate;
  }
  value = formatNumber(value / factor, decimals, '.', ',');
  return tpl.replace('{value}', value) + (def_val ? ' = ' + def_val : '');
}

function statsFormatAmountFn(tpl, factor, decimals, rate) {
  return function(value) {
    return statsFormatAmountTpl(tpl, factor, value, decimals || 0, rate || 0);
  };
}

function statsFormatAmount(value) {
  return statsFormatAmountTpl('€ {value}', 1000000, value, 2);
}

function statsFormat5min(time) {
  return new Date(time).toUTCString().match(/(\d+:\d+):/)[1];
}

function statsFormatHour(time) {
  var date = new Date(time);
  return statShortMonths[date.getUTCMonth()] + ', ' + date.getUTCDate() + ' ' + date.toUTCString().match(/(\d+:\d+):/)[1];
}

function statsFormatPeriod(time, days) {
  var dt = new Date(time),
      de = new Date(time + (days - 1) * 86400000);
  var dtm = dt.getUTCMonth(), dem = de.getUTCMonth(),
      dtd = dt.getUTCDate(), ded = de.getUTCDate();

  if (dtm == dem) {
    return dtd + '-' + ded + ' ' + statShortMonths[dtm];
  } else {
    return dtd + ' ' + statShortMonths[dtm] + ' - ' + ded + ' ' + statShortMonths[dem];
  }
}

function statsFormatPeriodFull(time, days) {
  var dt = new Date(time),
      de = new Date(time + (days - 1) * 86400000);
  var dty = dt.getUTCFullYear(), dey = de.getUTCFullYear(),
      dtm = dt.getUTCMonth(), dem = de.getUTCMonth(),
      dtd = dt.getUTCDate(), ded = de.getUTCDate();

  if (dty != dey) {
    return dtd + ' ' + statShortMonths[dtm] + ' ' + dty + ' – ' + ded + ' ' + statShortMonths[dem] + ' ' + dey;
  } else {
    return dtd + ' ' + statShortMonths[dtm] + ' – ' + ded + ' ' + statShortMonths[dem] + ' ' + dey;
  }
}

function statsFormatWeek(time) {
  return statsFormatPeriod(time, 7);
}

function statsFormatWeekFull(time) {
  return statsFormatPeriodFull(time, 7);
}

function statsFormatMonth(time) {
  return statsFormatPeriod(time, 30);
}

function statsFormatMonthFull(time) {
  return statsFormatPeriodFull(time, 30);
}

function statsFormatTooltipValue(val) {
  if (val.toLocaleString) {
    return val.toLocaleString();
  }
  return val + '';
  // return statsFormatNumber(val)
}

function statsFormatEmpty() {
  return '';
}

function statsOnZoom(zoomToken) {
  return function (x) {
    console.log('On Zoom', x, zoomToken);
    var copyText = x
    if (!(x % 1000) && 
        x > 1376438400000 && // launch date
        x < +(new Date()) + 365 * 86400 * 1000) {
      copyText /= 1000;
    }
    copyToClipboard(copyText);
    if (zoomToken) {
      return zoomGraphX(x, zoomToken);
    } else {
      return Promise.reject('default');
    }
  }
}

function statsNeedSideLegend() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return width > 1200;
}

function dropdownFilterChange(el, event) {
  var query = el.value.toString().trim().toLowerCase();
  var menu = el.parentNode.parentNode;
  var items = menu.querySelectorAll('li');
  var len = items.length;
  var i, item, text, matches;
  for (i = 0; i < len; i++) {
    item = items[i];
    if (item.classList.contains('dropdown-filter')) {
      continue;
    }
    text = item.innerText.trim().toLowerCase();
    matches = !query.length ||
               text.startsWith(query) ||
               text.indexOf(' ' + query) != -1 ||
               text.indexOf('.' + query) != -1;
    item.classList.toggle('hidden', !matches);
    if (event && event.keyCode == 13 && matches) {
      location.href = item.querySelector('a').href;
      return cancelEvent(event);
    }
  }
}

function dropdownToggle(el) {
  var field = el.parentNode.querySelector('.dropdown-filter-field');
  if (field) {
    field.value = '';
    dropdownFilterChange(field);
    setTimeout(function () {
      field.focus();
    }, 100);
  }
}

function cancelEvent(event) {
  event = event || window.event;
  if (event) event = event.originalEvent || event;

  if (event.stopPropagation) event.stopPropagation();
  if (event.preventDefault) event.preventDefault();

  return false;
}

window.addEventListener('load', function () {
  var hlWrapper = document.querySelector('#hl-wrapper');
  if (hlWrapper) {
    hlWrapper.classList.add('transitions-ready');
  }
});

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      // console.log('Copied to clipboard successfully!');
    }).catch(err => {
      // console.error('Failed to copy:', err);
      fallbackCopyToClipboard(text); // Use fallback if clipboard API fails
    });
  } else {
    // Fallback for older browsers
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // Prevent scrolling to the bottom
  textArea.style.opacity = 0;  // Make it invisible
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    // console.log('Copied to clipboard using fallback!');
  } catch (err) {
    // console.error('Fallback copy failed:', err);
  }
  document.body.removeChild(textArea);
}

/** Autogen anchors **/
function hlSlugify(text) {
  return (text || '')
      .toLowerCase()
      .replace(/[0-9.,]+\s*[kmb]?/g, '')
      .trim()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
}

function hlHasFollowingContent(header) {
  var next = header.nextSibling;
  var headingRegex = /^H[1-4]$/;
  var ignoreTags = ['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE', 'META'];

  while (next) {
    if (next.nodeType === 1) {

      if (headingRegex.test(next.tagName)) {
        // has txt
        if (next.textContent && next.textContent.trim().length > 0) {
          return false;
        }
        // no txt, ignore
      }
      // not header, check content
      else if (ignoreTags.indexOf(next.tagName) === -1) {
        // content
        return true;
      }
    }

    // txt node
    else if (next.nodeType === 3) {
      // non blnk
      if (next.textContent && next.textContent.trim().length > 0) {
        return true;
      }
    }

    next = next.nextSibling;
  }

  // end of parent, no content
  return false;
}

function hlInitAnchors() {
  var selector = '.hl-page h1, .hl-page h2, .hl-page h3, .hl-page h4';
  var headings = document.querySelectorAll(selector);
  var usedIds = {};

  headings.forEach(function(h) {
    // doubl anchor
    if (h.querySelector('.anchor')) return;

    // no txt
    if (!h.textContent || h.textContent.trim().length === 0) return;

    // empty section under h
    if (!hlHasFollowingContent(h)) return;

    // get slug
    var text = h.textContent;
    var id = h.getAttribute('id');
    if (!id) {
      var baseSlug = hlSlugify(text);
      id = baseSlug;
      var counter = 1;
      while (usedIds[id] || document.getElementById(id)) {
        id = baseSlug + '-' + (++counter);
      }
      h.setAttribute('id', id);
    }
    usedIds[id] = true;

    // add to dom
    var anchor = document.createElement('a');
    anchor.className = 'anchor';
    anchor.href = '#' + id;
    anchor.setAttribute('aria-label', 'Link to this section');

    var icon = document.createElement('i');
    icon.className = 'anchor-icon';
    anchor.appendChild(icon);

    h.prepend(anchor);
  });
}

// anchor event
document.addEventListener('click', function(e) {
  var link = e.target.closest('.anchor');
  if (!link) return;

  var href = link.getAttribute('href');
  if (!href || href.indexOf('#') !== 0) return;

  e.preventDefault();
  var id = href.substring(1);
  var fullUrl = window.location.href.split('#')[0] + '#' + id;

  copyToClipboard(fullUrl);

  if (history.pushState) {
    history.pushState(null, null, '#' + id);
  } else {
    window.location.hash = id;
  }

  var target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// auto anchor init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hlInitAnchors);
} else {
  hlInitAnchors();
}

// hack bcs some tables load async but wrap their own header so it doesn't autogen anchor on load
var hlObserverTimeout;
var hlObserver = new MutationObserver(function(mutations) {
  // dbounce
  if (hlObserverTimeout) clearTimeout(hlObserverTimeout);
  hlObserverTimeout = setTimeout(hlInitAnchors, 200);
});
hlObserver.observe(document.body, { childList: true, subtree: true });

// dynamic graph

function deepCloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function isScatterJson(json) {
  if (json.scatter) return true;
  if (json.types) {
    for (var k in json.types) {
      if (json.types[k] === 'scatter') return true;
    }
  }
  return false;
}

function getYSeriesKeys(json) {
  var keys = [];
  if (!json.types) return keys;
  for (var k in json.types) {
    if (k !== 'x' && json.types[k] !== 'x') keys.push(k);
  }
  return keys;
}

function detectModeFromJson(json) {
  // relative aka area graph
  var keys = getYSeriesKeys(json);
  for (var i = 0; i < keys.length; i++) {
    if (json.types && json.types[keys[i]] === 'area') return 'relative';
  }
  return 'absolute';
}

function isDynamicEnabled(json) {
  return !!(json && (json.dynamic === true || (json.dynamic && json.dynamic.enabled)));
}

function isDynamicEligible(rawJson) {
  if (!isDynamicEnabled(rawJson)) return false;

  if (isScatterJson(rawJson)) return false;
  if (rawJson.y_scaled) return false;

  var yKeys = getYSeriesKeys(rawJson);
  if (yKeys.length < 2) return false;

  // care for stacked-style charts for abs/rel
  // stacked=true fot multi-series bars/areas
  if (!rawJson.stacked) return false;

  return true;
}

function buildModeJson(rawJson, mode) {
  var j = deepCloneJson(rawJson);

  var yKeys = getYSeriesKeys(j);
  for (var i = 0; i < yKeys.length; i++) {
    j.types[yKeys[i]] = (mode === 'relative') ? 'area' : 'bar';
  }

  // relative charts should not use server detail zoom token
  // abs charts may use x_on_zoom
  if (mode === 'relative') {
    delete j.x_on_zoom;
  }

  // check pieZoomRange exists for relative pie zoom trans if bknd didnt give it
  if (mode === 'relative' && j.pieZoomRange == null) {
    try {
      var xCol = j.columns && j.columns[0];
      if (xCol && xCol.length >= 3 && xCol[0] === 'x') {
        var xMin = xCol[1];
        var xMax = xCol[xCol.length - 1];
        j.pieZoomRange = xMax - xMin;
      }
    } catch (e) {}
  }

  return j;
}

function syncChartState(fromChart, toChart) {
  var ysLen = (fromChart && fromChart.data && fromChart.data.ys) ? fromChart.data.ys.length : 0;
  var enabled = new Array(ysLen);
  var enabledCount = 0;

  for (var i = 0; i < ysLen; i++) {
    enabled[i] = !!fromChart.state['e_' + i];
    if (enabled[i]) enabledCount++;
  }
  if (!enabledCount && ysLen) enabled[0] = true;

  var x1 = fromChart.state.x1;
  var x2 = fromChart.state.x2;

  toChart.state.x1 = x1;
  toChart.state.x2 = x2;

  toChart.state.xg1 = fromChart.state.xg1;
  toChart.state.xg2 = fromChart.state.xg2;
  toChart.state.xgMin = fromChart.state.xgMin;
  toChart.state.xgMax = fromChart.state.xgMax;
  toChart.state.xg1Ind = fromChart.state.xg1Ind;
  toChart.state.xg2Ind = fromChart.state.xg2Ind;

  for (var j = 0; j < ysLen; j++) {
    var e = enabled[j];
    toChart.state['e_' + j] = e;
    toChart.state['o_' + j] = e ? 1 : 0;
    toChart.state['om_' + j] = e ? 1 : 0;
  }
  toChart.state.activeColumnsCount = enabledCount || 1;

  var rangeGraph = toChart.getYMinMax(x1, x2, false, true);
  var rangeMini = toChart.getYMinMax(toChart.state.xg1, toChart.state.xg2, true);

  if (toChart.pairY) {
    for (var k = 0; k < ysLen; k++) {
      toChart.state['y1_' + k] = rangeGraph.min[k];
      toChart.state['y2_' + k] = rangeGraph.max[k];
      toChart.state['y1m_' + k] = rangeMini.min[k];
      toChart.state['y2m_' + k] = rangeMini.max[k];
    }
  } else {
    toChart.state.y1 = rangeGraph.min;
    toChart.state.y2 = rangeGraph.max;
    toChart.state.y1m = rangeMini.min;
    toChart.state.y2m = rangeMini.max;
  }

  toChart.switchers && toChart.switchers.render(enabled);
  toChart.axisX && toChart.axisX.setAnimation(false);
  toChart.axisY && toChart.axisY.setAnimation(false);
  toChart.axisY && toChart.axisY.setForceUpdate(true);
  window.Graph && Graph.units && Graph.units.TUtils && Graph.units.TUtils.triggerEvent('chart-hide-tips', { except: null });
  toChart.tip && toChart.tip.toggle(false);
  toChart.composer && toChart.composer.render({ top: true, bottom: true });
}

function initDynamicModeToggle(domEl, baseChart, rawJson) {
  if (!isDynamicEligible(rawJson)) return;

  var wrapper = baseChart && baseChart.opts && baseChart.opts.container;
  if (!wrapper) return;

  // hack shift the zoom out btn to the right
  // no layouts because tchart enforces weird abs positioning
  // [!!] this took way too many attempts to get right, care if changing it, tchart is weird with the header Z stack
  wrapper.classList.add('tchart-wrapper__dynamic');

  var currentMode = detectModeFromJson(rawJson);

  var charts = {
    absolute: (currentMode === 'absolute') ? baseChart : null,
    relative: (currentMode === 'relative') ? baseChart : null
  };

  function styleLayer(chart, active) {
    if (!chart || !chart.$el) return;
    chart.$el.classList.add('tchart__dynamic_layer');
    chart.$el.style.position = chart === baseChart ? '' : 'absolute';
    chart.$el.style.top = chart === baseChart ? '' : '0';
    chart.$el.style.left = chart === baseChart ? '' : '0';
    chart.$el.style.width = '100%';

    chart.$el.style.opacity = active ? '1' : '0';
    chart.$el.style.pointerEvents = active ? 'auto' : 'none';
    chart.$el.style.zIndex = active ? '2' : '1';
    chart.$el.style.visibility = 'visible';
  }

  // ui header
  var btn = document.createElement('div');
  btn.className = 'tchart--mode-btn'; // put btn left 17px

  var icon = document.createElement('div');
  btn.appendChild(icon);

  var label = document.createElement('span');
  btn.appendChild(label);

  wrapper.appendChild(btn);

  function updateButtons() {
    // class based on current state to enable correct hover
    // [!] there's a hack here, if changing, also fix tchart--mode-btn__clicked for hover continuity
    if (currentMode === 'absolute') {
      label.textContent = 'Relative';
      // current is abs, vertical, hover to rel aka horiz
      btn.classList.add('tchart--mode-btn__is-abs');
      btn.classList.remove('tchart--mode-btn__is-rel');
    } else {
      label.textContent = 'Absolute';
      // current rel, horiz, hover to avb aka vert
      btn.classList.add('tchart--mode-btn__is-rel');
      btn.classList.remove('tchart--mode-btn__is-abs');
    }
  }

  function ensureChart(mode) {
    if (charts[mode]) return charts[mode];
    var modeJson = buildModeJson(rawJson, mode);
    var prepared = prepareGraphJson(modeJson);
    var ch = new Graph.units.TChart({ container: wrapper, data: prepared });
    charts[mode] = ch;
    styleLayer(ch, false);
    return ch;
  }

  function setMode(mode) {
    if (mode === currentMode) return;
    var fromChart = charts[currentMode] || baseChart;
    var toChart = ensureChart(mode);

    var isZoomed = fromChart && (fromChart.state.zoomMode || fromChart.state.zoomModeSpecial);
    if (isZoomed) {
      try { fromChart.toggleZoom(false); } catch (e) {}
      try { toChart.toggleZoom(false); } catch (e2) {}

      setTimeout(function () {
        syncChartState(fromChart, toChart);
        styleLayer(fromChart, false);
        styleLayer(toChart, true);
        currentMode = mode;
        updateButtons();
      }, 520);
      return;
    }

    syncChartState(fromChart, toChart);
    styleLayer(fromChart, false);
    styleLayer(toChart, true);
    currentMode = mode;
    updateButtons();
  }

  btn.addEventListener('click', function () {
    var nextMode = (currentMode === 'absolute') ? 'relative' : 'absolute';
    // hack to show continuity on hover after click
    btn.classList.add('tchart--mode-btn__clicked');
    setMode(nextMode);
  });

  btn.addEventListener('mouseleave', function() {
    btn.classList.remove('tchart--mode-btn__clicked');
  });

  styleLayer(baseChart, true);
  updateButtons();
}

var healthSearchModal = null;
var healthSearchTimeout = null;
var healthSearchCurrentQuery = '';
var healthSearchFocusedIndex = -1;

function healthSearchShowModal() {
  if (healthSearchModal) {
    healthSearchModal.show();
    $('#health-search-input').focus();
    return;
  }

  healthSearchModal = $('<div>', {'class': 'health-search-modal', 'id': 'health-search-modal'}).append(
    $('<div>', {'class': 'health-search-dialog'}).append(
      $('<div>', {'class': 'health-search-header'}).html('<span class="health-search-title">Search Health Pages</span><span class="health-search-close" onclick="healthSearchCloseModal();">&times;</span>'),
      $('<div>', {'class': 'health-search-input-wrap'}).append(
        $('<input>', {'type': 'text', 'id': 'health-search-input', 'class': 'form-control health-search-input', 'placeholder': 'Search pages...'}).on('input', function() {
          healthSearchDoSearch(this.value);
        })
      ),
      $('<div>', {'class': 'health-search-results', 'id': 'health-search-results'})
    )
  );

  $('body').append(healthSearchModal);

  healthSearchModal.on('click', function(e) {
    if ($(e.target).is(healthSearchModal)) {
      healthSearchCloseModal();
    }
  });

  $(document).on('keydown.healthsearch', function(e) {
    if (!healthSearchModal || !healthSearchModal.is(':visible')) {
      return;
    }
    if (e.key === 'Escape') {
      healthSearchCloseModal();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      var items = $('.health-search-result');
      if (!items.length) {
        return;
      }
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        healthSearchFocusedIndex = Math.min(healthSearchFocusedIndex + 1, items.length - 1);
      } else if (e.key === 'ArrowUp') {
        healthSearchFocusedIndex = Math.max(healthSearchFocusedIndex - 1, 0);
      } else if (e.key === 'Enter' && healthSearchFocusedIndex >= 0) {
        items.eq(healthSearchFocusedIndex)[0].click();
        return;
      }
      healthSearchUpdateFocus(items);
    }
  });

  $('#health-search-input').focus();
}

function healthSearchUpdateFocus(items) {
  items.removeClass('health-search-result-active');
  items.eq(healthSearchFocusedIndex).addClass('health-search-result-active').scrollIntoView({block: 'nearest'});
}

function healthSearchCloseModal() {
  if (healthSearchModal) {
    healthSearchModal.hide();
    healthSearchFocusedIndex = -1;
  }
}

function healthSearchDoSearch(query) {
  query = $.trim(query);
  if (query === healthSearchCurrentQuery) {
    return;
  }
  healthSearchCurrentQuery = query;
  healthSearchFocusedIndex = -1;

  if (healthSearchTimeout) {
    clearTimeout(healthSearchTimeout);
  }

  if (query.length < 2) {
    $('#health-search-results').html('');
    return;
  }

  healthSearchTimeout = setTimeout(function() {
    var basePath = window.basePath || '';
    $.getJSON(basePath + '/healthsearch?query=' + encodeURIComponent(query), function(results) {
      healthSearchRenderResults(results);
    }).fail(function(err) {
      console.error('Search error:', err);
      $('#health-search-results').html('<div style="color:red;">Search failed</div>');
    });
  }, 300);
}

function healthSearchRenderResults(results) {
  var container = $('#health-search-results');
  if (!results || !results.length) {
    container.html('<div class="health-search-no-results">No results found</div>');
    return;
  }

  var html = '';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var url = typeof r.url === 'object' ? r.url[Object.keys(r.url)[0]] : r.url;
    html += '<a href="' + url + '" class="health-search-result">';
    html += '<div class="health-search-result-title">' + (r.title || '') + '</div>';
    if (r.snippet) {
      html += '<div class="health-search-result-snippet">' + r.snippet + '</div>';
    }
    if (r.breadcrumb) {
      html += '<div class="health-search-result-breadcrumb">' + r.breadcrumb + '</div>';
    }
    html += '</a>';
  }
  container.html(html);
}

document.addEventListener('click', function(e) {
  var pill = e.target.closest('.graph_desc_edit_pill');
  if (!pill) return;
  e.preventDefault();
  var addr = pill.getAttribute('data-addr');
  var graphId = pill.getAttribute('data-graph-id');
  var keywords = pill.getAttribute('data-keywords') || '';
  var descMd = (pill.getAttribute('data-desc-md') || '').replace(/\\n/g, '\n');

  var outerWrap = pill.closest('.chart_wrap_outer');
  if (!outerWrap) return;

  var existingForm = outerWrap.querySelector('.graph_desc_edit_form');
  if (existingForm) {
    existingForm.remove();
    var rowEl = outerWrap.querySelector('.graph_desc_row');
    if (rowEl) rowEl.style.display = '';
    return;
  }

  var rowEl = outerWrap.querySelector('.graph_desc_row');
  if (rowEl) rowEl.style.display = 'none';

  var form = document.createElement('div');
  form.className = 'graph_desc_edit_form';
  form.innerHTML =
    '<div><input type="text" class="form-control graph_desc_edit_keywords" value="' + keywords.replace(/"/g, '&quot;') + '" placeholder="Keywords"></div>' +
    '<div style="margin-top:3px"><textarea class="form-control graph_desc_edit_md" rows="2" maxlength="256" placeholder="Description (markdown, max 256 chars)">' + descMd.replace(/</g, '&lt;') + '</textarea></div>' +
    '<div class="graph_desc_edit_actions">' +
      '<button class="btn btn-primary btn-xs graph_desc_edit_save">Save</button> ' +
      '<button class="btn btn-default btn-xs graph_desc_edit_cancel">Cancel</button>' +
    '</div>';

  var chartWrap = outerWrap.querySelector('.chart_wrap');
  chartWrap.parentNode.insertBefore(form, chartWrap.nextSibling);

  form.querySelector('.graph_desc_edit_md').focus();

  form.querySelector('.graph_desc_edit_cancel').addEventListener('click', function() {
    form.remove();
    if (rowEl) rowEl.style.display = '';
  });

  form.querySelector('.graph_desc_edit_save').addEventListener('click', function() {
    var saveBtn = form.querySelector('.graph_desc_edit_save');
    if (saveBtn.disabled) return;

    var newKeywords = form.querySelector('.graph_desc_edit_keywords').value;
    var newDescMd = form.querySelector('.graph_desc_edit_md').value;
    if (newDescMd.length > 256) {
      alert('Description too long (max 256 characters)');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    var basePath = window.basePath || '';
    fetch(basePath + '/graph_desc_save', {
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      credentials: 'same-origin',
      body: 'addr=' + encodeURIComponent(addr) +
            '&graph_id=' + encodeURIComponent(graphId) +
            '&keywords=' + encodeURIComponent(newKeywords) +
            '&desc_md=' + encodeURIComponent(newDescMd)
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      if (result.ok) {
        pill.setAttribute('data-keywords', newKeywords);
        pill.setAttribute('data-desc-md', newDescMd.replace(/\n/g, '\\n'));
        if (result.desc_html) {
          if (rowEl) {
            rowEl.innerHTML = '<span class="graph_desc_text">' + result.desc_html + '</span>';
            rowEl.style.display = '';
          } else {
            var newRow = document.createElement('div');
            newRow.className = 'graph_desc_row';
            newRow.innerHTML = '<span class="graph_desc_text">' + result.desc_html + '</span>';
            var chartWrap2 = outerWrap.querySelector('.chart_wrap');
            chartWrap2.parentNode.insertBefore(newRow, chartWrap2.nextSibling);
          }
        } else {
          if (rowEl) rowEl.remove();
        }
        form.remove();
      } else {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save';
        alert('Save failed: ' + (result.error || 'unknown error'));
      }
    }).catch(function(err) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save';
      alert('Save failed: ' + err.message);
    });
  });
});