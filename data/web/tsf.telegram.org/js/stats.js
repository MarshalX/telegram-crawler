
window.d3 = window.d3 || bb.d3;

var statShortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var statShortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


function statsFormat(period) {
  switch (period) {
    case 'minute':
    case '5min':
      return statsFormat5min;

    case 'hour':
      return statsFormatHour;

    case 'day':
    default:
      return d3.timeFormat('%a, %b %e %Y');
  }
}

function statsFormat5min(time) {
  return time.toUTCString().match(/(\d+:\d+):/)[1];
}

function statsFormatHour(time) {
  return statShortMonths[time.getUTCMonth()] + ', ' + time.getUTCDate() + ' ' + statsFormat5min(time);
}
function statsFormatDayHour(hour) {
  return hour + ':00-' + hour + ':59';
}

function statsFormatFixedKMBTPrecision(kmbt, precision) {
  return function (val) {
    return statsFormatKMBT(val, kmbt, precision);
  }
}

function statsFormatKMBT(val, kmbt, precision) {
  if (val == 0) {
    return '0';
  }
  if (kmbt == null) {
    kmbt = statsChooseNumKMBT(val)
  }
  var sval = statsFormatFixedKMBT(val, kmbt);
  if (precision == null) {
    precision = statsChoosePrecision(sval)
  }
  return sval.toFixed(precision) + kmbt;
}

function statsFormatFixedKMBT(val, kmbt) {
  switch (kmbt) {
    case 'K':
      return val / 1000;
    case 'M':
      return val / 1000000;
    case 'B':
      return val / 1000000000;
    case 'T':
      return val / 1000000000000;
  }
  return val
}

function statsChoosePrecision(val) {
  var absVal = Math.abs(val);
  if (absVal > 10) {
    return 0;
  }
  if (absVal > 1) {
    return 1;
  }
  return 2;
}

function statsChooseNumKMBT(val) {
  var absVal = Math.abs(val);
  if (absVal >= 1000000000000)   {
    return 'T';
  }
  else if (absVal >= 1000000000) {
    return 'B';
  }
  else if (absVal >= 1000000) {
    return 'M';
  }
  else if (absVal >= 2000)  {
    return 'K';
  }
  return '';
}

var statsFormatNumber = d3.format(',~r');

function statsFormatTooltipValue(val, a, b, c) {
  if (val.toLocaleString) {
    return val.toLocaleString();
  }
  return statsFormatNumber(val)
}

function statsTooltipPosition(dataToShow, tWidth, tHeight, element) {
  var $$ = this;
  var config = $$.config;
  var mousePos = d3.mouse(element);
  var left = mousePos[0];
  var top = mousePos[1];

  var svgLeft = $$.getSvgLeft(true);
  var chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight();

  if (isTouchDevice()) {
    top -= tHeight + 20;
  } else {
    top += 20;
  }

  // Determine tooltip position
  var dataScale = $$.x(dataToShow[0].x);

  top -= 5;
  left = svgLeft + $$.getCurrentPaddingLeft(true) + 20 + ($$.zoomScale ? left : dataScale);

  var right = left + tWidth;

  if (right > chartRight) {
    left = left - tWidth - 50;
  }

  if (top + tHeight > $$.currentHeight) {
    top -= tHeight + 30;
  }

  if (top < 0) {
    top = 0;
  }

  if (left < 0) {
    left = 0;
  }


  return {top: top, left: left};
}

function statsPieChartLegendTemplate(names) {
  return function (dataID, color, data) {
    var addClass = ''
    if (this.hiddenTargetIds && this.hiddenTargetIds.indexOf(dataID) != -1) {
      addClass = ' off'
    }
    var name = names[dataID]
    return '<div class="piechart_legend_item' + addClass + '"><i class="piechart_legend_color" style="background-color: '+color+';"></i><span class="piechart_legend_text">' + name + '</span></div>'
  }
}

function statsDefaultSubchartZoomGenerator(part) {
  return function(domain) {
    if (part === undefined) {
      return false;
    }
    var xDomain = [domain[0][0], domain[1][0]];
    var domain = [xDomain[0] + (xDomain[1] - xDomain[0]) * part, xDomain[1]];
    // console.log(xDomain, domain);
    return domain;
  }
}

function statsOnGraphRenderedGenerator(options) {
  options = options || {};
  return function () {
    statsOnGraphRendered.call(this, options);
  };
}

function statsOnGraphRendered(options) {
  var self = this
  var $$ = self.internal || self;
  var chart = $$.api || $$;

  if ($$._firstTicksUpdate === undefined) {
    $$._firstTicksUpdate = true;
    statsDoUpdateTicks(chart, $$, !options.noTime)

    var targetsLen = $$.data.targets.length || 0;
    var xsLen = ($$.data.xs["y0"] || []).length;
    if (xsLen * targetsLen < 10000) {
      chart.config('transition.duration', 350);
    }
  }
}

function statsGetTicks(chart, axis, domain) {
  var $$ = chart && chart.internal;
  var lastAxisTicksKey = '_lastAxisTicks' + axis;
  var lastAxisTicks = $$ && $$[lastAxisTicksKey];
  if ($$) {
    domain = $$[axis].domain() || domain;
  }
  if (lastAxisTicks) {
    var domainDiff = Math.abs(domain[1] - lastAxisTicks.domain[1]) + Math.abs(domain[0] - lastAxisTicks.domain[0]);
    if (domainDiff < (domain[1] - domain[0]) * 0.05) {
      // console.warn('same ticks', axis, domainDiff / (domain[1] - domain[0]));
      return lastAxisTicks.ticks;
    }
    // console.warn('new ticks', axis, domainDiff / (domain[1] - domain[0]));
  }
  var result;
  if (axis == 'x') {
    result = statsUpdateXTicks(chart, $$, domain);
    if (chart) {
      chart.config('axis.x.tick.format', result.formatter);
      chart.config('axis.x.label', {
        text: result.label,
        position: 'inner-right'
      }, false);
    }
  } else {
    result = statsUpdateYTicks(chart, $$, axis, domain)
    if (chart) {
      chart.config('axis.' + axis + '.tick.format', result.formatter);
      if (axis == 'y') {
        chart.config('grid.' + axis + '.lines', result.gridLines);
      }
    }
  }
  if (chart) {
    lastAxisTicks = {
      ticks: result.values,
      domain: domain,
      fomatterID: lastAxisTicks && lastAxisTicks.fomatterID
    };
    var newFormatterID = result.formatter._id;
    if (lastAxisTicks.fomatterID != newFormatterID) {
      setTimeout(function() {
        chart.flush(true);
      }, 0);
      lastAxisTicks.fomatterID = newFormatterID;
    }
    $$[lastAxisTicksKey] = lastAxisTicks;
  }

  return result.values;
}

function statsDoUpdateTicks(chart, $$, withX) {
  if (withX) {
    statsGetTicks(chart, 'x');
  }
  statsGetTicks(chart, 'y');
  if ($$['y1']) {
    statsGetTicks(chart, 'y1');
  }
  chart.flush(true);
}

function statsUpdateXTicks(chart, $$, domain) {
  domain = $$ && $$.x.domain() || domain;
  domain[0] = parseInt(domain[0] / 1000);
  domain[1] = parseInt(domain[1] / 1000);
  var timeAxis = $$ && $$._timeAxis;
  if (timeAxis === undefined) {
    timeAxis = new statsTimeAxis({});
    if ($$) {
      $$._timeAxis = timeAxis;
    }
  }
  // Doesn't look good with margin > 0
  var margin = 0 * (domain[1] - domain[0]);
  var ticks = timeAxis.tickOffsets([domain[0] + margin, domain[1] - margin]);
  var values = ticks.offsets.map(function (t) {
    return new Date(t.value * 1000);
  });
  var formatter = ticks.unit.formatter;
  formatter._id = ticks.unit.name;
  var labelFormat = '';
  if (ticks.unit.name == 'day') {
    labelFormat = '%B %Y';
  }
  else if (ticks.unit.name == 'week' || ticks.unit.name == 'month') {
    labelFormat = '%Y';
  }
  return {
    label: d3.timeFormat(labelFormat)(values[values.length - 1]),
    formatter: formatter,
    values: values
  };
}

function statsUpdateYTicks(chart, $$, axis, domain) {
  domain = $$ && $$[axis].domain() || domain;
  var domainDiff = domain[1] - domain[0];
  var kmbt = statsChooseNumKMBT(domainDiff)
  var diffKMBT = statsFormatFixedKMBT(domainDiff, kmbt);
  var precision = statsChoosePrecision(diffKMBT);

  domainDiff *= 0.9; // We don't want values to be in last 10% because of negative padding-top
  var domainStip = [domain[0], domain[0] + domainDiff];

  var valuesNum = 5;
  var values = [];
  var gridLines = [];
  var decPow = Math.floor(Math.log10(domainDiff / valuesNum));
  var decStep = Math.pow(10, decPow);
  var last2 = false

  while (domainDiff / decStep > valuesNum) {
    if (last2) {
      last2 = false;
      decStep *= 2.5;
    } else {
      decStep *= 2;
      last2 = true;
    }
    // x 2, 5, 10, 20, 50, 100
  }
  var start
  if (domainStip[0] > 0) {
    start = domainStip[0] - (domainStip[0] % decStep) + decStep;
  } else {
    start = domainStip[0] - (domainStip[0] % decStep);
  }
  var hasNoEmptyDigits = false;
  for (var i = start; i <= domainStip[1]; i += decStep) {
    if (axis != 'y2' || (i - domainStip[0]) / domainDiff > 0.1) {
      values.push(i)
    }
    if (precision > 0) {
      var formatted = statsFormatFixedKMBT(i, kmbt).toFixed(precision);
      if (formatted !== '0' && !formatted.match(/(\.0+)$/)) {
        hasNoEmptyDigits = true;
      }
    }
    if ((i - domainStip[0]) / domainDiff > 0.1) {
      gridLines.push({value: i})
    }
  }
  if (precision > 0 && !hasNoEmptyDigits) {
    precision = 0;
  }

  var formatter = statsFormatFixedKMBTPrecision(kmbt, precision);
  formatter._id = kmbt + '_' + precision;

  return {
    formatter: formatter,
    values: values,
    gridLines: gridLines
  };
}

function statsInitCustomLegend(chart) {
  var names = chart.data.names();
  var labels = Object.keys(names);
  var chartElement = chart.internal.selectChart.node();
  var hidden = chart.internal.hiddenTargetIds;
  // console.warn(names, '#' + chartElement.id)

  d3.select('#' + chartElement.id)
    .insert("div")
    .attr("class", "bbchart-custom-legend")
    .selectAll("div")
    .data(labels)
    .enter()
    .append("div")
    .attr("class", "bbchart-custom-legend-label button-nostyle-item ripple-handler")
    .classed("bbchart-custom-legend-label-hidden", function (id) {
      return hidden.indexOf(id) != -1;
    })
    .attr('data-id', function(id, v) {
      // console.log(id, v)
      return id;
    })
    .each(function(id) {
      d3.select(this)
        .insert("span")
        .attr("class", "ripple-mask")
        .html('<span class="ripple"></span>')

      initRipple(this);

      d3.select(this)
        .insert("span")
        .attr("class", "bbchart-custom-legend-label-icon")
        .style('background-color', chart.color(id))
        .html('<i class="bbchart-custom-legend-label-icon-tick"></i>');

      d3.select(this)
        .insert("span")
        .attr("class", "bbchart-custom-legend-label-text")
        .text(names[id])
    })
    // .on("mouseover", function(id) {
    //   chart.focus(id);
    // })
    // .on("mouseout", function(id) {
    //   chart.revert();
    // })
    .on("click", function(id) {
      var sel = d3.select(this);
      sel.classed("bbchart-custom-legend-label-hidden", !sel.classed("bbchart-custom-legend-label-hidden"));
      chart.toggle(id);
    });
}

/* 
  Based on Rickshaw source code
  https://github.com/shutterstock/rickshaw

  Copyright (C) 2011-2017 by Shutterstock Images, LLC
  License: MIT
  https://github.com/shutterstock/rickshaw/blob/master/LICENSE
*/

function statsTimeFixture() {

  var self = this;

  this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  this.units = [
    {
      name: 'decade',
      seconds: 86400 * 365.25 * 10,
      formatter: function(d) { return (parseInt(d.getUTCFullYear() / 10, 10) * 10) }
    }, {
      name: 'year',
      seconds: 86400 * 365.25,
      formatter: function(d) { return d.getUTCFullYear() }
    }, {
      name: 'month',
      seconds: 86400 * 30.5,
      formatter: function(d) { return self.months[d.getUTCMonth()] }
    }, {
      name: 'week',
      seconds: 86400 * 7,
      formatter: function(d) { return self.formatDate(d) }
    }, {
      name: 'day',
      seconds: 86400,
      formatter: function(d) {
        if (d.getDay() || true) {
          return d.getUTCDate()
        }
        return self.formatDate(d)
      }
    }, {
      name: '6 hour',
      seconds: 3600 * 6,
      formatter: function(d) { return self.formatTime(d) }
    }, {
      name: 'hour',
      seconds: 3600,
      formatter: function(d) { return self.formatTime(d) }
    }, {
      name: '15 minute',
      seconds: 60 * 15,
      formatter: function(d) { return self.formatTime(d) }
    }, {
      name: 'minute',
      seconds: 60,
      formatter: function(d) { return d.getUTCMinutes() + 'm' }
    }, {
      name: '15 second',
      seconds: 15,
      formatter: function(d) { return d.getUTCSeconds() + 's' }
    }, {
      name: 'second',
      seconds: 1,
      formatter: function(d) { return d.getUTCSeconds() + 's' }
    }, {
      name: 'decisecond',
      seconds: 1/10,
      formatter: function(d) { return d.getUTCMilliseconds() + 'ms' }
    }, {
      name: 'centisecond',
      seconds: 1/100,
      formatter: function(d) { return d.getUTCMilliseconds() + 'ms' }
    }
  ];

  this.unit = function(unitName) {
    return this.units.filter( function(unit) { return unitName == unit.name } ).shift();
  };

  this.formatDate = function(d) {
    return d3.timeFormat('%b %e')(d);
  };

  this.formatTime = function(d) {
    return d.toUTCString().match(/(\d+:\d+):/)[1];
  };

  this.ceil = function(time, unit) {

    var date, floor, year;

    if (unit.name == 'week') {

      date = new Date(time * 1000);
      date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

      floor = (date - date.getUTCDay() * 86400000) / 1000;
      if (floor == time) return time;

      return (floor + 7 * 86400);
    }

    if (unit.name == 'month') {

      date = new Date(time * 1000);

      floor = Date.UTC(date.getUTCFullYear(), date.getUTCMonth()) / 1000;
      if (floor == time) return time;

      year = date.getUTCFullYear();
      var month = date.getUTCMonth();

      if (month == 11) {
        month = 0;
        year = year + 1;
      } else {
        month += 1;
      }

      return Date.UTC(year, month) / 1000;
    }

    if (unit.name == 'year') {

      date = new Date(time * 1000);

      floor = Date.UTC(date.getUTCFullYear(), 0) / 1000;
      if (floor == time) return time;

      year = date.getUTCFullYear() + 1;

      return Date.UTC(year, 0) / 1000;
    }

    return Math.ceil(time / unit.seconds) * unit.seconds;
  };
};


function statsTimeAxis(args) {

  var self = this;

  this.fixedTimeUnit = args.timeUnit;

  var time = args.timeFixture || new statsTimeFixture();

  this.appropriateTimeUnit = function(domain) {

    var unit;
    var units = time.units;

    var rangeSeconds = domain[1] - domain[0];

    units.forEach( function(u) {
      if (Math.floor(rangeSeconds / u.seconds) >= 2) {
        unit = unit || u;
      }
    } );

    return (unit || time.units[time.units.length - 1]);
  };

  this.tickOffsets = function(domain) {

    var unit = this.fixedTimeUnit || this.appropriateTimeUnit(domain);
    var count = Math.ceil((domain[1] - domain[0]) / unit.seconds);

    var runningTick = domain[0];

    var offsets = [];

    for (var i = 0; i < count; i++) {

      var tickValue = time.ceil(runningTick, unit);
      runningTick = tickValue + unit.seconds / 2;

      offsets.push( {
        value: tickValue,
      } );
    }

    return {
      offsets: offsets,
      unit: unit
    };
  };

};

function redraw(el) {
  el.offsetTop + 1;
}

function onTextRippleStart(evt) {
  var e = d3.getEvent() || evt.originalEvent || evt;
  if (document.activeElement === this) return;
  var rect = this.getBoundingClientRect();
  if (e.type == 'touchstart') {
    var clientX = e.targetTouches[0].clientX;
  } else {
    var clientX = e.clientX;
  }
  var ripple = this.parentNode.querySelector('.textfield-item-underline');
  var rippleX = (clientX - rect.left) / this.offsetWidth * 100;
  ripple.style.transition = 'none';
  redraw(ripple);
  ripple.style.left = rippleX + '%';
  ripple.style.right = (100 - rippleX) + '%';
  redraw(ripple);
  ripple.style.left = '';
  ripple.style.right = '';
  ripple.style.transition = '';
}
function onRippleStart(evt) {
  var e = d3.getEvent() || evt.originalEvent || evt;
  var rippleMask = this.querySelector('.ripple-mask');
  if (!rippleMask) return;
  var rect = rippleMask.getBoundingClientRect();
  if (e.type == 'touchstart') {
    var clientX = e.targetTouches[0].clientX;
    var clientY = e.targetTouches[0].clientY;
  } else {
    var clientX = e.clientX;
    var clientY = e.clientY;
  }
  var rippleX = (clientX - rect.left) - rippleMask.offsetWidth / 2;
  var rippleY = (clientY - rect.top) - rippleMask.offsetHeight / 2;
  var ripple = this.querySelector('.ripple');
  ripple.style.transition = 'none';
  redraw(ripple);
  ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(0.2, 0.2, 1)';
  ripple.style.opacity = 1;
  redraw(ripple);
  ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(1, 1, 1)';
  ripple.style.transition = '';

  function onRippleEnd(e) {
    ripple.style.transitionDuration = '.2s';
    ripple.style.opacity = 0;
    document.removeEventListener('mouseup', onRippleEnd);
    document.removeEventListener('touchend', onRippleEnd);
    document.removeEventListener('touchcancel', onRippleEnd);
  }
  document.addEventListener('mouseup', onRippleEnd);
  document.addEventListener('touchend', onRippleEnd);
  document.addEventListener('touchcancel', onRippleEnd);
}

function initRipple(el) {
  // d3.select(el).on('mousedown touchstart', onTextRippleStart);
  d3.select(el).on(isTouchDevice() ? 'touchstart' : 'mousedown', onRippleStart);
};

function destroyRipple(el) {
  // d3.select(el).off('mousedown touchstart', onTextRippleStart);
  d3.select(el).off(isTouchDevice() ? 'touchstart' : 'mousedown', onRippleStart);
};


function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}