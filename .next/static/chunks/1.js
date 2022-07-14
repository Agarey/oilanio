(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[1],{

/***/ "./node_modules/odometer/odometer.js":
/*!*******************************************!*\
  !*** ./node_modules/odometer/odometer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  var COUNT_FRAMERATE, COUNT_MS_PER_FRAME, DIGIT_FORMAT, DIGIT_HTML, DIGIT_SPEEDBOOST, DURATION, FORMAT_MARK_HTML, FORMAT_PARSER, FRAMERATE, FRAMES_PER_VALUE, MS_PER_FRAME, MutationObserver, Odometer, RIBBON_HTML, TRANSITION_END_EVENTS, TRANSITION_SUPPORT, VALUE_HTML, addClass, createFromHTML, fractionalPart, now, removeClass, requestAnimationFrame, round, transitionCheckStyles, trigger, truncate, wrapJQuery, _jQueryWrapped, _old, _ref, _ref1,
    __slice = [].slice;

  VALUE_HTML = '<span class="odometer-value"></span>';

  RIBBON_HTML = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' + VALUE_HTML + '</span></span>';

  DIGIT_HTML = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' + RIBBON_HTML + '</span></span>';

  FORMAT_MARK_HTML = '<span class="odometer-formatting-mark"></span>';

  DIGIT_FORMAT = '(,ddd).dd';

  FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;

  FRAMERATE = 30;

  DURATION = 2000;

  COUNT_FRAMERATE = 20;

  FRAMES_PER_VALUE = 2;

  DIGIT_SPEEDBOOST = .5;

  MS_PER_FRAME = 1000 / FRAMERATE;

  COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;

  TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

  transitionCheckStyles = document.createElement('div').style;

  TRANSITION_SUPPORT = (transitionCheckStyles.transition != null) || (transitionCheckStyles.webkitTransition != null) || (transitionCheckStyles.mozTransition != null) || (transitionCheckStyles.oTransition != null);

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  createFromHTML = function(html) {
    var el;
    el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  removeClass = function(el, name) {
    return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
  };

  addClass = function(el, name) {
    removeClass(el, name);
    return el.className += " " + name;
  };

  trigger = function(el, name) {
    var evt;
    if (document.createEvent != null) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(name, true, true);
      return el.dispatchEvent(evt);
    }
  };

  now = function() {
    var _ref, _ref1;
    return (_ref = (_ref1 = window.performance) != null ? typeof _ref1.now === "function" ? _ref1.now() : void 0 : void 0) != null ? _ref : +(new Date);
  };

  round = function(val, precision) {
    if (precision == null) {
      precision = 0;
    }
    if (!precision) {
      return Math.round(val);
    }
    val *= Math.pow(10, precision);
    val += 0.5;
    val = Math.floor(val);
    return val /= Math.pow(10, precision);
  };

  truncate = function(val) {
    if (val < 0) {
      return Math.ceil(val);
    } else {
      return Math.floor(val);
    }
  };

  fractionalPart = function(val) {
    return val - round(val);
  };

  _jQueryWrapped = false;

  (wrapJQuery = function() {
    var property, _i, _len, _ref, _results;
    if (_jQueryWrapped) {
      return;
    }
    if (window.jQuery != null) {
      _jQueryWrapped = true;
      _ref = ['html', 'text'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        _results.push((function(property) {
          var old;
          old = window.jQuery.fn[property];
          return window.jQuery.fn[property] = function(val) {
            var _ref1;
            if ((val == null) || (((_ref1 = this[0]) != null ? _ref1.odometer : void 0) == null)) {
              return old.apply(this, arguments);
            }
            return this[0].odometer.update(val);
          };
        })(property));
      }
      return _results;
    }
  })();

  setTimeout(wrapJQuery, 0);

  Odometer = (function() {
    function Odometer(options) {
      var e, k, property, v, _base, _i, _len, _ref, _ref1, _ref2,
        _this = this;
      this.options = options;
      this.el = this.options.el;
      if (this.el.odometer != null) {
        return this.el.odometer;
      }
      this.el.odometer = this;
      _ref = Odometer.options;
      for (k in _ref) {
        v = _ref[k];
        if (this.options[k] == null) {
          this.options[k] = v;
        }
      }
      if ((_base = this.options).duration == null) {
        _base.duration = DURATION;
      }
      this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
      this.resetFormat();
      this.value = this.cleanValue((_ref1 = this.options.value) != null ? _ref1 : '');
      this.renderInside();
      this.render();
      try {
        _ref2 = ['innerHTML', 'innerText', 'textContent'];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          property = _ref2[_i];
          if (this.el[property] != null) {
            (function(property) {
              return Object.defineProperty(_this.el, property, {
                get: function() {
                  var _ref3;
                  if (property === 'innerHTML') {
                    return _this.inside.outerHTML;
                  } else {
                    return (_ref3 = _this.inside.innerText) != null ? _ref3 : _this.inside.textContent;
                  }
                },
                set: function(val) {
                  return _this.update(val);
                }
              });
            })(property);
          }
        }
      } catch (_error) {
        e = _error;
        this.watchForMutations();
      }
      this;
    }

    Odometer.prototype.renderInside = function() {
      this.inside = document.createElement('div');
      this.inside.className = 'odometer-inside';
      this.el.innerHTML = '';
      return this.el.appendChild(this.inside);
    };

    Odometer.prototype.watchForMutations = function() {
      var e,
        _this = this;
      if (MutationObserver == null) {
        return;
      }
      try {
        if (this.observer == null) {
          this.observer = new MutationObserver(function(mutations) {
            var newVal;
            newVal = _this.el.innerText;
            _this.renderInside();
            _this.render(_this.value);
            return _this.update(newVal);
          });
        }
        this.watchMutations = true;
        return this.startWatchingMutations();
      } catch (_error) {
        e = _error;
      }
    };

    Odometer.prototype.startWatchingMutations = function() {
      if (this.watchMutations) {
        return this.observer.observe(this.el, {
          childList: true
        });
      }
    };

    Odometer.prototype.stopWatchingMutations = function() {
      var _ref;
      return (_ref = this.observer) != null ? _ref.disconnect() : void 0;
    };

    Odometer.prototype.cleanValue = function(val) {
      var _ref;
      if (typeof val === 'string') {
        val = val.replace((_ref = this.format.radix) != null ? _ref : '.', '<radix>');
        val = val.replace(/[.,]/g, '');
        val = val.replace('<radix>', '.');
        val = parseFloat(val, 10) || 0;
      }
      return round(val, this.format.precision);
    };

    Odometer.prototype.bindTransitionEnd = function() {
      var event, renderEnqueued, _i, _len, _ref, _results,
        _this = this;
      if (this.transitionEndBound) {
        return;
      }
      this.transitionEndBound = true;
      renderEnqueued = false;
      _ref = TRANSITION_END_EVENTS.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        _results.push(this.el.addEventListener(event, function() {
          if (renderEnqueued) {
            return true;
          }
          renderEnqueued = true;
          setTimeout(function() {
            _this.render();
            renderEnqueued = false;
            return trigger(_this.el, 'odometerdone');
          }, 0);
          return true;
        }, false));
      }
      return _results;
    };

    Odometer.prototype.resetFormat = function() {
      var format, fractional, parsed, precision, radix, repeating, _ref, _ref1;
      format = (_ref = this.options.format) != null ? _ref : DIGIT_FORMAT;
      format || (format = 'd');
      parsed = FORMAT_PARSER.exec(format);
      if (!parsed) {
        throw new Error("Odometer: Unparsable digit format");
      }
      _ref1 = parsed.slice(1, 4), repeating = _ref1[0], radix = _ref1[1], fractional = _ref1[2];
      precision = (fractional != null ? fractional.length : void 0) || 0;
      return this.format = {
        repeating: repeating,
        radix: radix,
        precision: precision
      };
    };

    Odometer.prototype.render = function(value) {
      var classes, cls, match, newClasses, theme, _i, _len;
      if (value == null) {
        value = this.value;
      }
      this.stopWatchingMutations();
      this.resetFormat();
      this.inside.innerHTML = '';
      theme = this.options.theme;
      classes = this.el.className.split(' ');
      newClasses = [];
      for (_i = 0, _len = classes.length; _i < _len; _i++) {
        cls = classes[_i];
        if (!cls.length) {
          continue;
        }
        if (match = /^odometer-theme-(.+)$/.exec(cls)) {
          theme = match[1];
          continue;
        }
        if (/^odometer(-|$)/.test(cls)) {
          continue;
        }
        newClasses.push(cls);
      }
      newClasses.push('odometer');
      if (!TRANSITION_SUPPORT) {
        newClasses.push('odometer-no-transitions');
      }
      if (theme) {
        newClasses.push("odometer-theme-" + theme);
      } else {
        newClasses.push("odometer-auto-theme");
      }
      this.el.className = newClasses.join(' ');
      this.ribbons = {};
      this.formatDigits(value);
      return this.startWatchingMutations();
    };

    Odometer.prototype.formatDigits = function(value) {
      var digit, valueDigit, valueString, wholePart, _i, _j, _len, _len1, _ref, _ref1;
      this.digits = [];
      if (this.options.formatFunction) {
        valueString = this.options.formatFunction(value);
        _ref = valueString.split('').reverse();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          valueDigit = _ref[_i];
          if (valueDigit.match(/0-9/)) {
            digit = this.renderDigit();
            digit.querySelector('.odometer-value').innerHTML = valueDigit;
            this.digits.push(digit);
            this.insertDigit(digit);
          } else {
            this.addSpacer(valueDigit);
          }
        }
      } else {
        wholePart = !this.format.precision || !fractionalPart(value) || false;
        _ref1 = value.toString().split('').reverse();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          digit = _ref1[_j];
          if (digit === '.') {
            wholePart = true;
          }
          this.addDigit(digit, wholePart);
        }
      }
    };

    Odometer.prototype.update = function(newValue) {
      var diff,
        _this = this;
      newValue = this.cleanValue(newValue);
      if (!(diff = newValue - this.value)) {
        return;
      }
      removeClass(this.el, 'odometer-animating-up odometer-animating-down odometer-animating');
      if (diff > 0) {
        addClass(this.el, 'odometer-animating-up');
      } else {
        addClass(this.el, 'odometer-animating-down');
      }
      this.stopWatchingMutations();
      this.animate(newValue);
      this.startWatchingMutations();
      setTimeout(function() {
        _this.el.offsetHeight;
        return addClass(_this.el, 'odometer-animating');
      }, 0);
      return this.value = newValue;
    };

    Odometer.prototype.renderDigit = function() {
      return createFromHTML(DIGIT_HTML);
    };

    Odometer.prototype.insertDigit = function(digit, before) {
      if (before != null) {
        return this.inside.insertBefore(digit, before);
      } else if (!this.inside.children.length) {
        return this.inside.appendChild(digit);
      } else {
        return this.inside.insertBefore(digit, this.inside.children[0]);
      }
    };

    Odometer.prototype.addSpacer = function(chr, before, extraClasses) {
      var spacer;
      spacer = createFromHTML(FORMAT_MARK_HTML);
      spacer.innerHTML = chr;
      if (extraClasses) {
        addClass(spacer, extraClasses);
      }
      return this.insertDigit(spacer, before);
    };

    Odometer.prototype.addDigit = function(value, repeating) {
      var chr, digit, resetted, _ref;
      if (repeating == null) {
        repeating = true;
      }
      if (value === '-') {
        return this.addSpacer(value, null, 'odometer-negation-mark');
      }
      if (value === '.') {
        return this.addSpacer((_ref = this.format.radix) != null ? _ref : '.', null, 'odometer-radix-mark');
      }
      if (repeating) {
        resetted = false;
        while (true) {
          if (!this.format.repeating.length) {
            if (resetted) {
              throw new Error("Bad odometer format without digits");
            }
            this.resetFormat();
            resetted = true;
          }
          chr = this.format.repeating[this.format.repeating.length - 1];
          this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1);
          if (chr === 'd') {
            break;
          }
          this.addSpacer(chr);
        }
      }
      digit = this.renderDigit();
      digit.querySelector('.odometer-value').innerHTML = value;
      this.digits.push(digit);
      return this.insertDigit(digit);
    };

    Odometer.prototype.animate = function(newValue) {
      if (!TRANSITION_SUPPORT || this.options.animation === 'count') {
        return this.animateCount(newValue);
      } else {
        return this.animateSlide(newValue);
      }
    };

    Odometer.prototype.animateCount = function(newValue) {
      var cur, diff, last, start, tick,
        _this = this;
      if (!(diff = +newValue - this.value)) {
        return;
      }
      start = last = now();
      cur = this.value;
      return (tick = function() {
        var delta, dist, fraction;
        if ((now() - start) > _this.options.duration) {
          _this.value = newValue;
          _this.render();
          trigger(_this.el, 'odometerdone');
          return;
        }
        delta = now() - last;
        if (delta > COUNT_MS_PER_FRAME) {
          last = now();
          fraction = delta / _this.options.duration;
          dist = diff * fraction;
          cur += dist;
          _this.render(Math.round(cur));
        }
        if (requestAnimationFrame != null) {
          return requestAnimationFrame(tick);
        } else {
          return setTimeout(tick, COUNT_MS_PER_FRAME);
        }
      })();
    };

    Odometer.prototype.getDigitCount = function() {
      var i, max, value, values, _i, _len;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
        value = values[i];
        values[i] = Math.abs(value);
      }
      max = Math.max.apply(Math, values);
      return Math.ceil(Math.log(max + 1) / Math.log(10));
    };

    Odometer.prototype.getFractionalDigitCount = function() {
      var i, parser, parts, value, values, _i, _len;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      parser = /^\-?\d*\.(\d*?)0*$/;
      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
        value = values[i];
        values[i] = value.toString();
        parts = parser.exec(values[i]);
        if (parts == null) {
          values[i] = 0;
        } else {
          values[i] = parts[1].length;
        }
      }
      return Math.max.apply(Math, values);
    };

    Odometer.prototype.resetDigits = function() {
      this.digits = [];
      this.ribbons = [];
      this.inside.innerHTML = '';
      return this.resetFormat();
    };

    Odometer.prototype.animateSlide = function(newValue) {
      var boosted, cur, diff, digitCount, digits, dist, end, fractionalCount, frame, frames, i, incr, j, mark, numEl, oldValue, start, _base, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _results;
      oldValue = this.value;
      fractionalCount = this.getFractionalDigitCount(oldValue, newValue);
      if (fractionalCount) {
        newValue = newValue * Math.pow(10, fractionalCount);
        oldValue = oldValue * Math.pow(10, fractionalCount);
      }
      if (!(diff = newValue - oldValue)) {
        return;
      }
      this.bindTransitionEnd();
      digitCount = this.getDigitCount(oldValue, newValue);
      digits = [];
      boosted = 0;
      for (i = _i = 0; 0 <= digitCount ? _i < digitCount : _i > digitCount; i = 0 <= digitCount ? ++_i : --_i) {
        start = truncate(oldValue / Math.pow(10, digitCount - i - 1));
        end = truncate(newValue / Math.pow(10, digitCount - i - 1));
        dist = end - start;
        if (Math.abs(dist) > this.MAX_VALUES) {
          frames = [];
          incr = dist / (this.MAX_VALUES + this.MAX_VALUES * boosted * DIGIT_SPEEDBOOST);
          cur = start;
          while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
            frames.push(Math.round(cur));
            cur += incr;
          }
          if (frames[frames.length - 1] !== end) {
            frames.push(end);
          }
          boosted++;
        } else {
          frames = (function() {
            _results = [];
            for (var _j = start; start <= end ? _j <= end : _j >= end; start <= end ? _j++ : _j--){ _results.push(_j); }
            return _results;
          }).apply(this);
        }
        for (i = _k = 0, _len = frames.length; _k < _len; i = ++_k) {
          frame = frames[i];
          frames[i] = Math.abs(frame % 10);
        }
        digits.push(frames);
      }
      this.resetDigits();
      _ref = digits.reverse();
      for (i = _l = 0, _len1 = _ref.length; _l < _len1; i = ++_l) {
        frames = _ref[i];
        if (!this.digits[i]) {
          this.addDigit(' ', i >= fractionalCount);
        }
        if ((_base = this.ribbons)[i] == null) {
          _base[i] = this.digits[i].querySelector('.odometer-ribbon-inner');
        }
        this.ribbons[i].innerHTML = '';
        if (diff < 0) {
          frames = frames.reverse();
        }
        for (j = _m = 0, _len2 = frames.length; _m < _len2; j = ++_m) {
          frame = frames[j];
          numEl = document.createElement('div');
          numEl.className = 'odometer-value';
          numEl.innerHTML = frame;
          this.ribbons[i].appendChild(numEl);
          if (j === frames.length - 1) {
            addClass(numEl, 'odometer-last-value');
          }
          if (j === 0) {
            addClass(numEl, 'odometer-first-value');
          }
        }
      }
      if (start < 0) {
        this.addDigit('-');
      }
      mark = this.inside.querySelector('.odometer-radix-mark');
      if (mark != null) {
        mark.parent.removeChild(mark);
      }
      if (fractionalCount) {
        return this.addSpacer(this.format.radix, this.digits[fractionalCount - 1], 'odometer-radix-mark');
      }
    };

    return Odometer;

  })();

  Odometer.options = (_ref = window.odometerOptions) != null ? _ref : {};

  setTimeout(function() {
    var k, v, _base, _ref1, _results;
    if (window.odometerOptions) {
      _ref1 = window.odometerOptions;
      _results = [];
      for (k in _ref1) {
        v = _ref1[k];
        _results.push((_base = Odometer.options)[k] != null ? (_base = Odometer.options)[k] : _base[k] = v);
      }
      return _results;
    }
  }, 0);

  Odometer.init = function() {
    var el, elements, _i, _len, _ref1, _results;
    if (document.querySelectorAll == null) {
      return;
    }
    elements = document.querySelectorAll(Odometer.options.selector || '.odometer');
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      el = elements[_i];
      _results.push(el.odometer = new Odometer({
        el: el,
        value: (_ref1 = el.innerText) != null ? _ref1 : el.textContent
      }));
    }
    return _results;
  };

  if ((((_ref1 = document.documentElement) != null ? _ref1.doScroll : void 0) != null) && (document.createEventObject != null)) {
    _old = document.onreadystatechange;
    document.onreadystatechange = function() {
      if (document.readyState === 'complete' && Odometer.options.auto !== false) {
        Odometer.init();
      }
      return _old != null ? _old.apply(this, arguments) : void 0;
    };
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (Odometer.options.auto !== false) {
        return Odometer.init();
      }
    }, false);
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return Odometer;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}).call(this);


/***/ }),

/***/ "./node_modules/react-odometerjs/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-odometerjs/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _odometer = __webpack_require__(/*! odometer */ "./node_modules/odometer/odometer.js");

var _odometer2 = _interopRequireDefault(_odometer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactOdometer = function (_PureComponent) {
  _inherits(ReactOdometer, _PureComponent);

  function ReactOdometer(props) {
    _classCallCheck(this, ReactOdometer);

    var _this = _possibleConstructorReturn(this, (ReactOdometer.__proto__ || Object.getPrototypeOf(ReactOdometer)).call(this, props));

    _this.node = _react2.default.createRef();
    return _this;
  }
  // Information about options can be found here:
  // http://github.hubspot.com/odometer/


  _createClass(ReactOdometer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          value = _props.value,
          options = _objectWithoutProperties(_props, ['value']);

      this.odometer = new _odometer2.default(_extends({
        el: this.node.current,
        value: value
      }, options));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var value = this.props.value;

      this.odometer.update(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        ref: this.node
      });
    }
  }]);

  return ReactOdometer;
}(_react.PureComponent);

exports.default = ReactOdometer;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL29kb21ldGVyL29kb21ldGVyLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVhY3Qtb2RvbWV0ZXJqcy9kaXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFdBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSwwQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQXFEO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0NBQWdDLHNDQUFzQyw2QkFBNkIsbUJBQW1CO0FBQ3RIO0FBQ0EsV0FBVztBQUNYO0FBQ0EsOENBQThDLFdBQVc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsWUFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFlBQVk7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxNQUFNLElBQTBDO0FBQ2hELElBQUksaUNBQU8sRUFBRSxtQ0FBRTtBQUNmO0FBQ0EsS0FBSztBQUFBLG9HQUFDO0FBQ04sR0FBRyxNQUFNLEVBSU47O0FBRUgsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVvQlk7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsbURBQW1ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsZUFBZTs7QUFFOVAsZ0NBQWdDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFampCLGFBQWEsbUJBQU8sQ0FBQyw0Q0FBTzs7QUFFNUI7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMscURBQVU7O0FBRWxDOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Riw4Q0FBOEMsaUJBQWlCLHFCQUFxQixvQ0FBb0MsNkRBQTZELG9CQUFvQixFQUFFLGVBQWU7O0FBRTFOLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLGlEQUFpRCxhQUFhLHVGQUF1RixFQUFFLHVGQUF1Rjs7QUFFOU8sMENBQTBDLCtEQUErRCxxR0FBcUcsRUFBRSx5RUFBeUUsZUFBZSx5RUFBeUUsRUFBRSxFQUFFLHVIQUF1SDs7QUFFNWU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRCxnQyIsImZpbGUiOiJzdGF0aWMvY2h1bmtzLzEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gIHZhciBDT1VOVF9GUkFNRVJBVEUsIENPVU5UX01TX1BFUl9GUkFNRSwgRElHSVRfRk9STUFULCBESUdJVF9IVE1MLCBESUdJVF9TUEVFREJPT1NULCBEVVJBVElPTiwgRk9STUFUX01BUktfSFRNTCwgRk9STUFUX1BBUlNFUiwgRlJBTUVSQVRFLCBGUkFNRVNfUEVSX1ZBTFVFLCBNU19QRVJfRlJBTUUsIE11dGF0aW9uT2JzZXJ2ZXIsIE9kb21ldGVyLCBSSUJCT05fSFRNTCwgVFJBTlNJVElPTl9FTkRfRVZFTlRTLCBUUkFOU0lUSU9OX1NVUFBPUlQsIFZBTFVFX0hUTUwsIGFkZENsYXNzLCBjcmVhdGVGcm9tSFRNTCwgZnJhY3Rpb25hbFBhcnQsIG5vdywgcmVtb3ZlQ2xhc3MsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgcm91bmQsIHRyYW5zaXRpb25DaGVja1N0eWxlcywgdHJpZ2dlciwgdHJ1bmNhdGUsIHdyYXBKUXVlcnksIF9qUXVlcnlXcmFwcGVkLCBfb2xkLCBfcmVmLCBfcmVmMSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2U7XG5cbiAgVkFMVUVfSFRNTCA9ICc8c3BhbiBjbGFzcz1cIm9kb21ldGVyLXZhbHVlXCI+PC9zcGFuPic7XG5cbiAgUklCQk9OX0hUTUwgPSAnPHNwYW4gY2xhc3M9XCJvZG9tZXRlci1yaWJib25cIj48c3BhbiBjbGFzcz1cIm9kb21ldGVyLXJpYmJvbi1pbm5lclwiPicgKyBWQUxVRV9IVE1MICsgJzwvc3Bhbj48L3NwYW4+JztcblxuICBESUdJVF9IVE1MID0gJzxzcGFuIGNsYXNzPVwib2RvbWV0ZXItZGlnaXRcIj48c3BhbiBjbGFzcz1cIm9kb21ldGVyLWRpZ2l0LXNwYWNlclwiPjg8L3NwYW4+PHNwYW4gY2xhc3M9XCJvZG9tZXRlci1kaWdpdC1pbm5lclwiPicgKyBSSUJCT05fSFRNTCArICc8L3NwYW4+PC9zcGFuPic7XG5cbiAgRk9STUFUX01BUktfSFRNTCA9ICc8c3BhbiBjbGFzcz1cIm9kb21ldGVyLWZvcm1hdHRpbmctbWFya1wiPjwvc3Bhbj4nO1xuXG4gIERJR0lUX0ZPUk1BVCA9ICcoLGRkZCkuZGQnO1xuXG4gIEZPUk1BVF9QQVJTRVIgPSAvXlxcKD8oW14pXSopXFwpPyg/OiguKShkKykpPyQvO1xuXG4gIEZSQU1FUkFURSA9IDMwO1xuXG4gIERVUkFUSU9OID0gMjAwMDtcblxuICBDT1VOVF9GUkFNRVJBVEUgPSAyMDtcblxuICBGUkFNRVNfUEVSX1ZBTFVFID0gMjtcblxuICBESUdJVF9TUEVFREJPT1NUID0gLjU7XG5cbiAgTVNfUEVSX0ZSQU1FID0gMTAwMCAvIEZSQU1FUkFURTtcblxuICBDT1VOVF9NU19QRVJfRlJBTUUgPSAxMDAwIC8gQ09VTlRfRlJBTUVSQVRFO1xuXG4gIFRSQU5TSVRJT05fRU5EX0VWRU5UUyA9ICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgTVNUcmFuc2l0aW9uRW5kJztcblxuICB0cmFuc2l0aW9uQ2hlY2tTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcblxuICBUUkFOU0lUSU9OX1NVUFBPUlQgPSAodHJhbnNpdGlvbkNoZWNrU3R5bGVzLnRyYW5zaXRpb24gIT0gbnVsbCkgfHwgKHRyYW5zaXRpb25DaGVja1N0eWxlcy53ZWJraXRUcmFuc2l0aW9uICE9IG51bGwpIHx8ICh0cmFuc2l0aW9uQ2hlY2tTdHlsZXMubW96VHJhbnNpdGlvbiAhPSBudWxsKSB8fCAodHJhbnNpdGlvbkNoZWNrU3R5bGVzLm9UcmFuc2l0aW9uICE9IG51bGwpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICBNdXRhdGlvbk9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYktpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgY3JlYXRlRnJvbUhUTUwgPSBmdW5jdGlvbihodG1sKSB7XG4gICAgdmFyIGVsO1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gZWwuY2hpbGRyZW5bMF07XG4gIH07XG5cbiAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58IClcIiArIChuYW1lLnNwbGl0KCcgJykuam9pbignfCcpKSArIFwiKCB8JClcIiwgJ2dpJyksICcgJyk7XG4gIH07XG5cbiAgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgIHJlbW92ZUNsYXNzKGVsLCBuYW1lKTtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcbiAgfTtcblxuICB0cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUpIHtcbiAgICB2YXIgZXZ0O1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAhPSBudWxsKSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9O1xuXG4gIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcmVmLCBfcmVmMTtcbiAgICByZXR1cm4gKF9yZWYgPSAoX3JlZjEgPSB3aW5kb3cucGVyZm9ybWFuY2UpICE9IG51bGwgPyB0eXBlb2YgX3JlZjEubm93ID09PSBcImZ1bmN0aW9uXCIgPyBfcmVmMS5ub3coKSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYgOiArKG5ldyBEYXRlKTtcbiAgfTtcblxuICByb3VuZCA9IGZ1bmN0aW9uKHZhbCwgcHJlY2lzaW9uKSB7XG4gICAgaWYgKHByZWNpc2lvbiA9PSBudWxsKSB7XG4gICAgICBwcmVjaXNpb24gPSAwO1xuICAgIH1cbiAgICBpZiAoIXByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsKTtcbiAgICB9XG4gICAgdmFsICo9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICAgIHZhbCArPSAwLjU7XG4gICAgdmFsID0gTWF0aC5mbG9vcih2YWwpO1xuICAgIHJldHVybiB2YWwgLz0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gIH07XG5cbiAgdHJ1bmNhdGUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICBpZiAodmFsIDwgMCkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuICAgIH1cbiAgfTtcblxuICBmcmFjdGlvbmFsUGFydCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiB2YWwgLSByb3VuZCh2YWwpO1xuICB9O1xuXG4gIF9qUXVlcnlXcmFwcGVkID0gZmFsc2U7XG5cbiAgKHdyYXBKUXVlcnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvcGVydHksIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICBpZiAoX2pRdWVyeVdyYXBwZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5qUXVlcnkgIT0gbnVsbCkge1xuICAgICAgX2pRdWVyeVdyYXBwZWQgPSB0cnVlO1xuICAgICAgX3JlZiA9IFsnaHRtbCcsICd0ZXh0J107XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHByb3BlcnR5ID0gX3JlZltfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2goKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgdmFyIG9sZDtcbiAgICAgICAgICBvbGQgPSB3aW5kb3cualF1ZXJ5LmZuW3Byb3BlcnR5XTtcbiAgICAgICAgICByZXR1cm4gd2luZG93LmpRdWVyeS5mbltwcm9wZXJ0eV0gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHZhciBfcmVmMTtcbiAgICAgICAgICAgIGlmICgodmFsID09IG51bGwpIHx8ICgoKF9yZWYxID0gdGhpc1swXSkgIT0gbnVsbCA/IF9yZWYxLm9kb21ldGVyIDogdm9pZCAwKSA9PSBudWxsKSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2xkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZG9tZXRlci51cGRhdGUodmFsKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShwcm9wZXJ0eSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH1cbiAgfSkoKTtcblxuICBzZXRUaW1lb3V0KHdyYXBKUXVlcnksIDApO1xuXG4gIE9kb21ldGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIE9kb21ldGVyKG9wdGlvbnMpIHtcbiAgICAgIHZhciBlLCBrLCBwcm9wZXJ0eSwgdiwgX2Jhc2UsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3JlZjIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB0aGlzLmVsID0gdGhpcy5vcHRpb25zLmVsO1xuICAgICAgaWYgKHRoaXMuZWwub2RvbWV0ZXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5vZG9tZXRlcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZWwub2RvbWV0ZXIgPSB0aGlzO1xuICAgICAgX3JlZiA9IE9kb21ldGVyLm9wdGlvbnM7XG4gICAgICBmb3IgKGsgaW4gX3JlZikge1xuICAgICAgICB2ID0gX3JlZltrXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1trXSA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2tdID0gdjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKChfYmFzZSA9IHRoaXMub3B0aW9ucykuZHVyYXRpb24gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZS5kdXJhdGlvbiA9IERVUkFUSU9OO1xuICAgICAgfVxuICAgICAgdGhpcy5NQVhfVkFMVUVTID0gKCh0aGlzLm9wdGlvbnMuZHVyYXRpb24gLyBNU19QRVJfRlJBTUUpIC8gRlJBTUVTX1BFUl9WQUxVRSkgfCAwO1xuICAgICAgdGhpcy5yZXNldEZvcm1hdCgpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY2xlYW5WYWx1ZSgoX3JlZjEgPSB0aGlzLm9wdGlvbnMudmFsdWUpICE9IG51bGwgPyBfcmVmMSA6ICcnKTtcbiAgICAgIHRoaXMucmVuZGVySW5zaWRlKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgX3JlZjIgPSBbJ2lubmVySFRNTCcsICdpbm5lclRleHQnLCAndGV4dENvbnRlbnQnXTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIHByb3BlcnR5ID0gX3JlZjJbX2ldO1xuICAgICAgICAgIGlmICh0aGlzLmVsW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfdGhpcy5lbCwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZWYzO1xuICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSAnaW5uZXJIVE1MJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuaW5zaWRlLm91dGVySFRNTDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoX3JlZjMgPSBfdGhpcy5pbnNpZGUuaW5uZXJUZXh0KSAhPSBudWxsID8gX3JlZjMgOiBfdGhpcy5pbnNpZGUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZSh2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KShwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgICAgdGhpcy53YXRjaEZvck11dGF0aW9ucygpO1xuICAgICAgfVxuICAgICAgdGhpcztcbiAgICB9XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUucmVuZGVySW5zaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5pbnNpZGUuY2xhc3NOYW1lID0gJ29kb21ldGVyLWluc2lkZSc7XG4gICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgcmV0dXJuIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbnNpZGUpO1xuICAgIH07XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUud2F0Y2hGb3JNdXRhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoTXV0YXRpb25PYnNlcnZlciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVyID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsO1xuICAgICAgICAgICAgbmV3VmFsID0gX3RoaXMuZWwuaW5uZXJUZXh0O1xuICAgICAgICAgICAgX3RoaXMucmVuZGVySW5zaWRlKCk7XG4gICAgICAgICAgICBfdGhpcy5yZW5kZXIoX3RoaXMudmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZShuZXdWYWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2F0Y2hNdXRhdGlvbnMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydFdhdGNoaW5nTXV0YXRpb25zKCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2RvbWV0ZXIucHJvdG90eXBlLnN0YXJ0V2F0Y2hpbmdNdXRhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLndhdGNoTXV0YXRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5lbCwge1xuICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2RvbWV0ZXIucHJvdG90eXBlLnN0b3BXYXRjaGluZ011dGF0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9yZWY7XG4gICAgICByZXR1cm4gKF9yZWYgPSB0aGlzLm9ic2VydmVyKSAhPSBudWxsID8gX3JlZi5kaXNjb25uZWN0KCkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5jbGVhblZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICB2YXIgX3JlZjtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgoX3JlZiA9IHRoaXMuZm9ybWF0LnJhZGl4KSAhPSBudWxsID8gX3JlZiA6ICcuJywgJzxyYWRpeD4nKTtcbiAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1suLF0vZywgJycpO1xuICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgnPHJhZGl4PicsICcuJyk7XG4gICAgICAgIHZhbCA9IHBhcnNlRmxvYXQodmFsLCAxMCkgfHwgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb3VuZCh2YWwsIHRoaXMuZm9ybWF0LnByZWNpc2lvbik7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5iaW5kVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGV2ZW50LCByZW5kZXJFbnF1ZXVlZCwgX2ksIF9sZW4sIF9yZWYsIF9yZXN1bHRzLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAodGhpcy50cmFuc2l0aW9uRW5kQm91bmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2l0aW9uRW5kQm91bmQgPSB0cnVlO1xuICAgICAgcmVuZGVyRW5xdWV1ZWQgPSBmYWxzZTtcbiAgICAgIF9yZWYgPSBUUkFOU0lUSU9OX0VORF9FVkVOVFMuc3BsaXQoJyAnKTtcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZXZlbnQgPSBfcmVmW19pXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChyZW5kZXJFbnF1ZXVlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlbmRlckVucXVldWVkID0gdHJ1ZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICByZW5kZXJFbnF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIoX3RoaXMuZWwsICdvZG9tZXRlcmRvbmUnKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSwgZmFsc2UpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9O1xuXG4gICAgT2RvbWV0ZXIucHJvdG90eXBlLnJlc2V0Rm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZm9ybWF0LCBmcmFjdGlvbmFsLCBwYXJzZWQsIHByZWNpc2lvbiwgcmFkaXgsIHJlcGVhdGluZywgX3JlZiwgX3JlZjE7XG4gICAgICBmb3JtYXQgPSAoX3JlZiA9IHRoaXMub3B0aW9ucy5mb3JtYXQpICE9IG51bGwgPyBfcmVmIDogRElHSVRfRk9STUFUO1xuICAgICAgZm9ybWF0IHx8IChmb3JtYXQgPSAnZCcpO1xuICAgICAgcGFyc2VkID0gRk9STUFUX1BBUlNFUi5leGVjKGZvcm1hdCk7XG4gICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPZG9tZXRlcjogVW5wYXJzYWJsZSBkaWdpdCBmb3JtYXRcIik7XG4gICAgICB9XG4gICAgICBfcmVmMSA9IHBhcnNlZC5zbGljZSgxLCA0KSwgcmVwZWF0aW5nID0gX3JlZjFbMF0sIHJhZGl4ID0gX3JlZjFbMV0sIGZyYWN0aW9uYWwgPSBfcmVmMVsyXTtcbiAgICAgIHByZWNpc2lvbiA9IChmcmFjdGlvbmFsICE9IG51bGwgPyBmcmFjdGlvbmFsLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdCA9IHtcbiAgICAgICAgcmVwZWF0aW5nOiByZXBlYXRpbmcsXG4gICAgICAgIHJhZGl4OiByYWRpeCxcbiAgICAgICAgcHJlY2lzaW9uOiBwcmVjaXNpb25cbiAgICAgIH07XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGNsYXNzZXMsIGNscywgbWF0Y2gsIG5ld0NsYXNzZXMsIHRoZW1lLCBfaSwgX2xlbjtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RvcFdhdGNoaW5nTXV0YXRpb25zKCk7XG4gICAgICB0aGlzLnJlc2V0Rm9ybWF0KCk7XG4gICAgICB0aGlzLmluc2lkZS5pbm5lckhUTUwgPSAnJztcbiAgICAgIHRoZW1lID0gdGhpcy5vcHRpb25zLnRoZW1lO1xuICAgICAgY2xhc3NlcyA9IHRoaXMuZWwuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICBuZXdDbGFzc2VzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGNsYXNzZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgY2xzID0gY2xhc3Nlc1tfaV07XG4gICAgICAgIGlmICghY2xzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaCA9IC9eb2RvbWV0ZXItdGhlbWUtKC4rKSQvLmV4ZWMoY2xzKSkge1xuICAgICAgICAgIHRoZW1lID0gbWF0Y2hbMV07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9eb2RvbWV0ZXIoLXwkKS8udGVzdChjbHMpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q2xhc3Nlcy5wdXNoKGNscyk7XG4gICAgICB9XG4gICAgICBuZXdDbGFzc2VzLnB1c2goJ29kb21ldGVyJyk7XG4gICAgICBpZiAoIVRSQU5TSVRJT05fU1VQUE9SVCkge1xuICAgICAgICBuZXdDbGFzc2VzLnB1c2goJ29kb21ldGVyLW5vLXRyYW5zaXRpb25zJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhlbWUpIHtcbiAgICAgICAgbmV3Q2xhc3Nlcy5wdXNoKFwib2RvbWV0ZXItdGhlbWUtXCIgKyB0aGVtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDbGFzc2VzLnB1c2goXCJvZG9tZXRlci1hdXRvLXRoZW1lXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBuZXdDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgIHRoaXMucmliYm9ucyA9IHt9O1xuICAgICAgdGhpcy5mb3JtYXREaWdpdHModmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRXYXRjaGluZ011dGF0aW9ucygpO1xuICAgIH07XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUuZm9ybWF0RGlnaXRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBkaWdpdCwgdmFsdWVEaWdpdCwgdmFsdWVTdHJpbmcsIHdob2xlUGFydCwgX2ksIF9qLCBfbGVuLCBfbGVuMSwgX3JlZiwgX3JlZjE7XG4gICAgICB0aGlzLmRpZ2l0cyA9IFtdO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb3JtYXRGdW5jdGlvbikge1xuICAgICAgICB2YWx1ZVN0cmluZyA9IHRoaXMub3B0aW9ucy5mb3JtYXRGdW5jdGlvbih2YWx1ZSk7XG4gICAgICAgIF9yZWYgPSB2YWx1ZVN0cmluZy5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICB2YWx1ZURpZ2l0ID0gX3JlZltfaV07XG4gICAgICAgICAgaWYgKHZhbHVlRGlnaXQubWF0Y2goLzAtOS8pKSB7XG4gICAgICAgICAgICBkaWdpdCA9IHRoaXMucmVuZGVyRGlnaXQoKTtcbiAgICAgICAgICAgIGRpZ2l0LnF1ZXJ5U2VsZWN0b3IoJy5vZG9tZXRlci12YWx1ZScpLmlubmVySFRNTCA9IHZhbHVlRGlnaXQ7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5wdXNoKGRpZ2l0KTtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RGlnaXQoZGlnaXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNwYWNlcih2YWx1ZURpZ2l0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdob2xlUGFydCA9ICF0aGlzLmZvcm1hdC5wcmVjaXNpb24gfHwgIWZyYWN0aW9uYWxQYXJ0KHZhbHVlKSB8fCBmYWxzZTtcbiAgICAgICAgX3JlZjEgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYxLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGRpZ2l0ID0gX3JlZjFbX2pdO1xuICAgICAgICAgIGlmIChkaWdpdCA9PT0gJy4nKSB7XG4gICAgICAgICAgICB3aG9sZVBhcnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZERpZ2l0KGRpZ2l0LCB3aG9sZVBhcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgdmFyIGRpZmYsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jbGVhblZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgIGlmICghKGRpZmYgPSBuZXdWYWx1ZSAtIHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsICdvZG9tZXRlci1hbmltYXRpbmctdXAgb2RvbWV0ZXItYW5pbWF0aW5nLWRvd24gb2RvbWV0ZXItYW5pbWF0aW5nJyk7XG4gICAgICBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ29kb21ldGVyLWFuaW1hdGluZy11cCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ29kb21ldGVyLWFuaW1hdGluZy1kb3duJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0b3BXYXRjaGluZ011dGF0aW9ucygpO1xuICAgICAgdGhpcy5hbmltYXRlKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuc3RhcnRXYXRjaGluZ011dGF0aW9ucygpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICByZXR1cm4gYWRkQ2xhc3MoX3RoaXMuZWwsICdvZG9tZXRlci1hbmltYXRpbmcnKTtcbiAgICAgIH0sIDApO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgT2RvbWV0ZXIucHJvdG90eXBlLnJlbmRlckRpZ2l0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRnJvbUhUTUwoRElHSVRfSFRNTCk7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5pbnNlcnREaWdpdCA9IGZ1bmN0aW9uKGRpZ2l0LCBiZWZvcmUpIHtcbiAgICAgIGlmIChiZWZvcmUgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNpZGUuaW5zZXJ0QmVmb3JlKGRpZ2l0LCBiZWZvcmUpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5pbnNpZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc2lkZS5hcHBlbmRDaGlsZChkaWdpdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNpZGUuaW5zZXJ0QmVmb3JlKGRpZ2l0LCB0aGlzLmluc2lkZS5jaGlsZHJlblswXSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5hZGRTcGFjZXIgPSBmdW5jdGlvbihjaHIsIGJlZm9yZSwgZXh0cmFDbGFzc2VzKSB7XG4gICAgICB2YXIgc3BhY2VyO1xuICAgICAgc3BhY2VyID0gY3JlYXRlRnJvbUhUTUwoRk9STUFUX01BUktfSFRNTCk7XG4gICAgICBzcGFjZXIuaW5uZXJIVE1MID0gY2hyO1xuICAgICAgaWYgKGV4dHJhQ2xhc3Nlcykge1xuICAgICAgICBhZGRDbGFzcyhzcGFjZXIsIGV4dHJhQ2xhc3Nlcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5pbnNlcnREaWdpdChzcGFjZXIsIGJlZm9yZSk7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5hZGREaWdpdCA9IGZ1bmN0aW9uKHZhbHVlLCByZXBlYXRpbmcpIHtcbiAgICAgIHZhciBjaHIsIGRpZ2l0LCByZXNldHRlZCwgX3JlZjtcbiAgICAgIGlmIChyZXBlYXRpbmcgPT0gbnVsbCkge1xuICAgICAgICByZXBlYXRpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09PSAnLScpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3BhY2VyKHZhbHVlLCBudWxsLCAnb2RvbWV0ZXItbmVnYXRpb24tbWFyaycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09PSAnLicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3BhY2VyKChfcmVmID0gdGhpcy5mb3JtYXQucmFkaXgpICE9IG51bGwgPyBfcmVmIDogJy4nLCBudWxsLCAnb2RvbWV0ZXItcmFkaXgtbWFyaycpO1xuICAgICAgfVxuICAgICAgaWYgKHJlcGVhdGluZykge1xuICAgICAgICByZXNldHRlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGlmICghdGhpcy5mb3JtYXQucmVwZWF0aW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0dGVkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBvZG9tZXRlciBmb3JtYXQgd2l0aG91dCBkaWdpdHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlc2V0Rm9ybWF0KCk7XG4gICAgICAgICAgICByZXNldHRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNociA9IHRoaXMuZm9ybWF0LnJlcGVhdGluZ1t0aGlzLmZvcm1hdC5yZXBlYXRpbmcubGVuZ3RoIC0gMV07XG4gICAgICAgICAgdGhpcy5mb3JtYXQucmVwZWF0aW5nID0gdGhpcy5mb3JtYXQucmVwZWF0aW5nLnN1YnN0cmluZygwLCB0aGlzLmZvcm1hdC5yZXBlYXRpbmcubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgaWYgKGNociA9PT0gJ2QnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRTcGFjZXIoY2hyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGlnaXQgPSB0aGlzLnJlbmRlckRpZ2l0KCk7XG4gICAgICBkaWdpdC5xdWVyeVNlbGVjdG9yKCcub2RvbWV0ZXItdmFsdWUnKS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZGlnaXRzLnB1c2goZGlnaXQpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0RGlnaXQoZGlnaXQpO1xuICAgIH07XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICBpZiAoIVRSQU5TSVRJT05fU1VQUE9SVCB8fCB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uID09PSAnY291bnQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVDb3VudChuZXdWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlU2xpZGUobmV3VmFsdWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUuYW5pbWF0ZUNvdW50ID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgIHZhciBjdXIsIGRpZmYsIGxhc3QsIHN0YXJ0LCB0aWNrLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIShkaWZmID0gK25ld1ZhbHVlIC0gdGhpcy52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3RhcnQgPSBsYXN0ID0gbm93KCk7XG4gICAgICBjdXIgPSB0aGlzLnZhbHVlO1xuICAgICAgcmV0dXJuICh0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWx0YSwgZGlzdCwgZnJhY3Rpb247XG4gICAgICAgIGlmICgobm93KCkgLSBzdGFydCkgPiBfdGhpcy5vcHRpb25zLmR1cmF0aW9uKSB7XG4gICAgICAgICAgX3RoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBfdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICB0cmlnZ2VyKF90aGlzLmVsLCAnb2RvbWV0ZXJkb25lJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbHRhID0gbm93KCkgLSBsYXN0O1xuICAgICAgICBpZiAoZGVsdGEgPiBDT1VOVF9NU19QRVJfRlJBTUUpIHtcbiAgICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgICAgZnJhY3Rpb24gPSBkZWx0YSAvIF90aGlzLm9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgICAgZGlzdCA9IGRpZmYgKiBmcmFjdGlvbjtcbiAgICAgICAgICBjdXIgKz0gZGlzdDtcbiAgICAgICAgICBfdGhpcy5yZW5kZXIoTWF0aC5yb3VuZChjdXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KHRpY2ssIENPVU5UX01TX1BFUl9GUkFNRSk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5nZXREaWdpdENvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbWF4LCB2YWx1ZSwgdmFsdWVzLCBfaSwgX2xlbjtcbiAgICAgIHZhbHVlcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSB2YWx1ZXMubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICB2YWx1ZXNbaV0gPSBNYXRoLmFicyh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBtYXggPSBNYXRoLm1heC5hcHBseShNYXRoLCB2YWx1ZXMpO1xuICAgICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLmxvZyhtYXggKyAxKSAvIE1hdGgubG9nKDEwKSk7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5nZXRGcmFjdGlvbmFsRGlnaXRDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIHBhcnNlciwgcGFydHMsIHZhbHVlLCB2YWx1ZXMsIF9pLCBfbGVuO1xuICAgICAgdmFsdWVzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHBhcnNlciA9IC9eXFwtP1xcZCpcXC4oXFxkKj8pMCokLztcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IHZhbHVlcy5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIHBhcnRzID0gcGFyc2VyLmV4ZWModmFsdWVzW2ldKTtcbiAgICAgICAgaWYgKHBhcnRzID09IG51bGwpIHtcbiAgICAgICAgICB2YWx1ZXNbaV0gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlc1tpXSA9IHBhcnRzWzFdLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsIHZhbHVlcyk7XG4gICAgfTtcblxuICAgIE9kb21ldGVyLnByb3RvdHlwZS5yZXNldERpZ2l0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kaWdpdHMgPSBbXTtcbiAgICAgIHRoaXMucmliYm9ucyA9IFtdO1xuICAgICAgdGhpcy5pbnNpZGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICByZXR1cm4gdGhpcy5yZXNldEZvcm1hdCgpO1xuICAgIH07XG5cbiAgICBPZG9tZXRlci5wcm90b3R5cGUuYW5pbWF0ZVNsaWRlID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgIHZhciBib29zdGVkLCBjdXIsIGRpZmYsIGRpZ2l0Q291bnQsIGRpZ2l0cywgZGlzdCwgZW5kLCBmcmFjdGlvbmFsQ291bnQsIGZyYW1lLCBmcmFtZXMsIGksIGluY3IsIGosIG1hcmssIG51bUVsLCBvbGRWYWx1ZSwgc3RhcnQsIF9iYXNlLCBfaSwgX2osIF9rLCBfbCwgX2xlbiwgX2xlbjEsIF9sZW4yLCBfbSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICBmcmFjdGlvbmFsQ291bnQgPSB0aGlzLmdldEZyYWN0aW9uYWxEaWdpdENvdW50KG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICBpZiAoZnJhY3Rpb25hbENvdW50KSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgKiBNYXRoLnBvdygxMCwgZnJhY3Rpb25hbENvdW50KTtcbiAgICAgICAgb2xkVmFsdWUgPSBvbGRWYWx1ZSAqIE1hdGgucG93KDEwLCBmcmFjdGlvbmFsQ291bnQpO1xuICAgICAgfVxuICAgICAgaWYgKCEoZGlmZiA9IG5ld1ZhbHVlIC0gb2xkVmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZFRyYW5zaXRpb25FbmQoKTtcbiAgICAgIGRpZ2l0Q291bnQgPSB0aGlzLmdldERpZ2l0Q291bnQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgIGRpZ2l0cyA9IFtdO1xuICAgICAgYm9vc3RlZCA9IDA7XG4gICAgICBmb3IgKGkgPSBfaSA9IDA7IDAgPD0gZGlnaXRDb3VudCA/IF9pIDwgZGlnaXRDb3VudCA6IF9pID4gZGlnaXRDb3VudDsgaSA9IDAgPD0gZGlnaXRDb3VudCA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgIHN0YXJ0ID0gdHJ1bmNhdGUob2xkVmFsdWUgLyBNYXRoLnBvdygxMCwgZGlnaXRDb3VudCAtIGkgLSAxKSk7XG4gICAgICAgIGVuZCA9IHRydW5jYXRlKG5ld1ZhbHVlIC8gTWF0aC5wb3coMTAsIGRpZ2l0Q291bnQgLSBpIC0gMSkpO1xuICAgICAgICBkaXN0ID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0KSA+IHRoaXMuTUFYX1ZBTFVFUykge1xuICAgICAgICAgIGZyYW1lcyA9IFtdO1xuICAgICAgICAgIGluY3IgPSBkaXN0IC8gKHRoaXMuTUFYX1ZBTFVFUyArIHRoaXMuTUFYX1ZBTFVFUyAqIGJvb3N0ZWQgKiBESUdJVF9TUEVFREJPT1NUKTtcbiAgICAgICAgICBjdXIgPSBzdGFydDtcbiAgICAgICAgICB3aGlsZSAoKGRpc3QgPiAwICYmIGN1ciA8IGVuZCkgfHwgKGRpc3QgPCAwICYmIGN1ciA+IGVuZCkpIHtcbiAgICAgICAgICAgIGZyYW1lcy5wdXNoKE1hdGgucm91bmQoY3VyKSk7XG4gICAgICAgICAgICBjdXIgKz0gaW5jcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZyYW1lc1tmcmFtZXMubGVuZ3RoIC0gMV0gIT09IGVuZCkge1xuICAgICAgICAgICAgZnJhbWVzLnB1c2goZW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYm9vc3RlZCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyYW1lcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaiA9IHN0YXJ0OyBzdGFydCA8PSBlbmQgPyBfaiA8PSBlbmQgOiBfaiA+PSBlbmQ7IHN0YXJ0IDw9IGVuZCA/IF9qKysgOiBfai0tKXsgX3Jlc3VsdHMucHVzaChfaik7IH1cbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICB9KS5hcHBseSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSBfayA9IDAsIF9sZW4gPSBmcmFtZXMubGVuZ3RoOyBfayA8IF9sZW47IGkgPSArK19rKSB7XG4gICAgICAgICAgZnJhbWUgPSBmcmFtZXNbaV07XG4gICAgICAgICAgZnJhbWVzW2ldID0gTWF0aC5hYnMoZnJhbWUgJSAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlnaXRzLnB1c2goZnJhbWVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzZXREaWdpdHMoKTtcbiAgICAgIF9yZWYgPSBkaWdpdHMucmV2ZXJzZSgpO1xuICAgICAgZm9yIChpID0gX2wgPSAwLCBfbGVuMSA9IF9yZWYubGVuZ3RoOyBfbCA8IF9sZW4xOyBpID0gKytfbCkge1xuICAgICAgICBmcmFtZXMgPSBfcmVmW2ldO1xuICAgICAgICBpZiAoIXRoaXMuZGlnaXRzW2ldKSB7XG4gICAgICAgICAgdGhpcy5hZGREaWdpdCgnICcsIGkgPj0gZnJhY3Rpb25hbENvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKF9iYXNlID0gdGhpcy5yaWJib25zKVtpXSA9PSBudWxsKSB7XG4gICAgICAgICAgX2Jhc2VbaV0gPSB0aGlzLmRpZ2l0c1tpXS5xdWVyeVNlbGVjdG9yKCcub2RvbWV0ZXItcmliYm9uLWlubmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yaWJib25zW2ldLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICBmcmFtZXMgPSBmcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaiA9IF9tID0gMCwgX2xlbjIgPSBmcmFtZXMubGVuZ3RoOyBfbSA8IF9sZW4yOyBqID0gKytfbSkge1xuICAgICAgICAgIGZyYW1lID0gZnJhbWVzW2pdO1xuICAgICAgICAgIG51bUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgbnVtRWwuY2xhc3NOYW1lID0gJ29kb21ldGVyLXZhbHVlJztcbiAgICAgICAgICBudW1FbC5pbm5lckhUTUwgPSBmcmFtZTtcbiAgICAgICAgICB0aGlzLnJpYmJvbnNbaV0uYXBwZW5kQ2hpbGQobnVtRWwpO1xuICAgICAgICAgIGlmIChqID09PSBmcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgYWRkQ2xhc3MobnVtRWwsICdvZG9tZXRlci1sYXN0LXZhbHVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhudW1FbCwgJ29kb21ldGVyLWZpcnN0LXZhbHVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuYWRkRGlnaXQoJy0nKTtcbiAgICAgIH1cbiAgICAgIG1hcmsgPSB0aGlzLmluc2lkZS5xdWVyeVNlbGVjdG9yKCcub2RvbWV0ZXItcmFkaXgtbWFyaycpO1xuICAgICAgaWYgKG1hcmsgIT0gbnVsbCkge1xuICAgICAgICBtYXJrLnBhcmVudC5yZW1vdmVDaGlsZChtYXJrKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcmFjdGlvbmFsQ291bnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3BhY2VyKHRoaXMuZm9ybWF0LnJhZGl4LCB0aGlzLmRpZ2l0c1tmcmFjdGlvbmFsQ291bnQgLSAxXSwgJ29kb21ldGVyLXJhZGl4LW1hcmsnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE9kb21ldGVyO1xuXG4gIH0pKCk7XG5cbiAgT2RvbWV0ZXIub3B0aW9ucyA9IChfcmVmID0gd2luZG93Lm9kb21ldGVyT3B0aW9ucykgIT0gbnVsbCA/IF9yZWYgOiB7fTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciBrLCB2LCBfYmFzZSwgX3JlZjEsIF9yZXN1bHRzO1xuICAgIGlmICh3aW5kb3cub2RvbWV0ZXJPcHRpb25zKSB7XG4gICAgICBfcmVmMSA9IHdpbmRvdy5vZG9tZXRlck9wdGlvbnM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrIGluIF9yZWYxKSB7XG4gICAgICAgIHYgPSBfcmVmMVtrXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaCgoX2Jhc2UgPSBPZG9tZXRlci5vcHRpb25zKVtrXSAhPSBudWxsID8gKF9iYXNlID0gT2RvbWV0ZXIub3B0aW9ucylba10gOiBfYmFzZVtrXSA9IHYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH1cbiAgfSwgMCk7XG5cbiAgT2RvbWV0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCwgZWxlbWVudHMsIF9pLCBfbGVuLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoT2RvbWV0ZXIub3B0aW9ucy5zZWxlY3RvciB8fCAnLm9kb21ldGVyJyk7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGVsZW1lbnRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRzW19pXTtcbiAgICAgIF9yZXN1bHRzLnB1c2goZWwub2RvbWV0ZXIgPSBuZXcgT2RvbWV0ZXIoe1xuICAgICAgICBlbDogZWwsXG4gICAgICAgIHZhbHVlOiAoX3JlZjEgPSBlbC5pbm5lclRleHQpICE9IG51bGwgPyBfcmVmMSA6IGVsLnRleHRDb250ZW50XG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuICBpZiAoKCgoX3JlZjEgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICE9IG51bGwgPyBfcmVmMS5kb1Njcm9sbCA6IHZvaWQgMCkgIT0gbnVsbCkgJiYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0ICE9IG51bGwpKSB7XG4gICAgX29sZCA9IGRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnICYmIE9kb21ldGVyLm9wdGlvbnMuYXV0byAhPT0gZmFsc2UpIHtcbiAgICAgICAgT2RvbWV0ZXIuaW5pdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9vbGQgIT0gbnVsbCA/IF9vbGQuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChPZG9tZXRlci5vcHRpb25zLmF1dG8gIT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBPZG9tZXRlci5pbml0KCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gT2RvbWV0ZXI7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIgJiYgZXhwb3J0cyAhPT0gbnVsbCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gT2RvbWV0ZXI7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93Lk9kb21ldGVyID0gT2RvbWV0ZXI7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX29kb21ldGVyID0gcmVxdWlyZSgnb2RvbWV0ZXInKTtcblxudmFyIF9vZG9tZXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vZG9tZXRlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUmVhY3RPZG9tZXRlciA9IGZ1bmN0aW9uIChfUHVyZUNvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUmVhY3RPZG9tZXRlciwgX1B1cmVDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlYWN0T2RvbWV0ZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVhY3RPZG9tZXRlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVhY3RPZG9tZXRlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlYWN0T2RvbWV0ZXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5ub2RlID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZVJlZigpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvLyBJbmZvcm1hdGlvbiBhYm91dCBvcHRpb25zIGNhbiBiZSBmb3VuZCBoZXJlOlxuICAvLyBodHRwOi8vZ2l0aHViLmh1YnNwb3QuY29tL29kb21ldGVyL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFJlYWN0T2RvbWV0ZXIsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIHZhbHVlID0gX3Byb3BzLnZhbHVlLFxuICAgICAgICAgIG9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ3ZhbHVlJ10pO1xuXG4gICAgICB0aGlzLm9kb21ldGVyID0gbmV3IF9vZG9tZXRlcjIuZGVmYXVsdChfZXh0ZW5kcyh7XG4gICAgICAgIGVsOiB0aGlzLm5vZGUuY3VycmVudCxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9LCBvcHRpb25zKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcblxuICAgICAgdGhpcy5vZG9tZXRlci51cGRhdGUodmFsdWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICByZWY6IHRoaXMubm9kZVxuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJlYWN0T2RvbWV0ZXI7XG59KF9yZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVhY3RPZG9tZXRlcjsiXSwic291cmNlUm9vdCI6IiJ9