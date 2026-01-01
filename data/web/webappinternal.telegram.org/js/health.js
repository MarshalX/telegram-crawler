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

    if (!isScatter && (!json.columns.length ||
        json.columns[0].length <= 2)) {
    if (loadingEl) {
      loadingEl.innerHTML = 'Not enough data to display.';
    }
    return;
  }
  json = prepareGraphJson(json);
  var chart = Graph.render(domEl, json);
  domEl.classList.add('chart_wrap_rendered');
  window.charts = window.charts || {};
  window.charts[id] = chart;
  setTimeout(function () {
    if (loadingEl) {
      loadingEl.parentNode && loadingEl.parentNode.removeChild(loadingEl)
    }
  }, 1000);
  if (json.csvExport) {
    var exportHTML = '<div class="chart_csv_export_wrap"><a class="csv_link btn btn-default" href="' + json.csvExport + '"><span class="glyphicon glyphicon-download-alt"></span> CSV</a></div>';
    var t = document.createElement('div');
    t.innerHTML = exportHTML;
    domEl.appendChild(t.firstChild);
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