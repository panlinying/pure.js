/*!
* Pure.js v1.0.0
* undefined
*
* Copyright (c) 2017 undefined
* Released under the MIT license
*
* Date: 2017-12-19T07:47:42.135Z
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Pure = factory());
}(this, (function () { 'use strict';

var _window = window;
var document$1 = _window.document;
var DEFAULT_OPTIONS = {
	search: function search() {}
};
var INPUT_TEMPLATE = '<input type="text" id="pure-input"><ul id="pure-input-result"></ul>';

var KEYMAP = {
	backspace: 8,
	tab: 9,
	clear: 12,
	enter: 13,
	'return': 13,
	esc: 27,
	escape: 27,
	space: 32,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	del: 46
};

// ref to https://github.com/jaywcjlove/hotkeys/blob/5d9ef40d72b802f4e1279be9a0c4e9bbe7c5380a/src/hotkeys.js
/**
 * get num of keyboard
 * @export
 * @param {any} x keyboard
 * @returns {number} key number
 */
function code(x) {
  return KEYMAP[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}

/**
 * get key code when when click keyboard
 * @export
 * @param {any} e event
 * @returns {number} clicked key number
 */
function getKeyDownCode(e) {
  e = e || window.event;
  var keyCode = e.keyCode || e.which || e.charCode;
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // transfer to code
  }
  return keyCode;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// export const WINDOW = typeof window !== 'undefined' ? window : {};
// document.prototype.ready = ready

/**
 * do something after DOMContentLoaded
 * @export
 * @param {any} callback callback function
 */


/**
 * charge whether the value is a number
 * @export
 * @param {any} value charge value
 * @returns {boolen} true or false
 */
function isNumber(value) {
	var isNaN = Number.isNaN;

	return typeof value === 'number' && !isNaN(value);
}

/**
 * charge whether the value is a function
 * @export
 * @param {any} value charge value
 * @returns {boolen} true or false
 */
function isFunction(value) {
	return typeof value === 'function';
}

/**
 * refer to https://github.com/madrobby/zepto/blob/master/src/zepto.js#L382
 * Iterate elements by callback
 * @export
 * @param {Element} elements the elements for iterate
 * @param {Function} callback function for each element
 * @returns {Element} the elements after iterate
 */
function each(elements, callback) {
	if (!elements) return;
	if ((typeof elements === 'undefined' ? 'undefined' : _typeof(elements)) === 'object') {
		var keys = Object.keys(elements);
		if (keys.length === 0) {
			callback.call(elements, 0, elements);
		} else {
			keys.forEach(function (key) {
				callback.call(elements[key], key, elements[key]);
			});
		}
	} else if (Array.isArray(elements) || isNumber(elements.length)) {
		var i = void 0;
		for (i = 0; i < elements.length; i += 1) {
			if (callback.call(elements[i], i, elements[i]) === false) return elements;
		}
	} else {
		throw new Error("each target not object ,array or array like");
	}
	return elements;
}

/**
 * get or set className to node
 * access className property while respecting SVGAnimatedString
 * @export
 * @param {node} node className target
 * @param {string} value className value
 * @returns {any} return false or className value
 */
function getSetClassName(node, value) {
	var klassName = node.className || '';
	var svg = klassName && klassName.baseVal !== undefined;
	if (value === undefined) return svg ? klassName.baseVal : klassName; // get className
	if (svg) {
		klassName.baseVal = value;
	} else {
		node.className = value;
	}
	return false;
}

/**
 * if element has className
 * @export
 * @param {Element} element className target
 * @param {string} className className value
 * @returns {boolean} has or not
 */
function hasClass(element, className) {
	if (!className) return false;
	return element.classList ? element.classList.contains(className) : getSetClassName(element).indexOf(className) > -1;
}

/**
 * add class to element
 * @export
 * @param {Element} element to be added target
 * @param {string} className to be added class name
 */
function addClass(element, className) {
	if (!className) return;
	each(element, function (idx, ele) {
		if (!('className' in ele)) return;
		var classList = [];
		var cls = getSetClassName(ele);
		className.split(/\+s/g).forEach(function (cl) {
			if (!hasClass(ele, cl)) classList.push(cl);
		});
		if (classList.length) getSetClassName(element, cls + (cls ? ' ' : '') + classList.join(' '));
	});
}

/**
 * remove class of element
 * @export
 * @param {Element} element remove target
 * @param {string} className removed class name
 */
function removeClass(element, className) {
	each(element, function (idx, ele) {
		if (!('className' in ele)) return;
		if (className === undefined) {
			getSetClassName(ele, '');
			return;
		}
		var cls = getSetClassName(ele);
		cls.split(/\+s/g).forEach(function (cl) {
			cls = cls.replace(cl, '');
		});
		getSetClassName(element, cls);
	});
}

/**
 * add event on element
 * @export
 * @param {Element} element event target
 * @param {string} eventName event name
 * @param {function} callback  evnet callback
 */
function addEvent(element, eventName, callback) {
	if (!isFunction(callback)) return;
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, callback);
	} else {
		element['on' + eventName] = callback;
	}
}

/**
 * remove element child nodes
 * @export
 * @param {Element} element remove target
 */


/**
 * let this show
 * @export
 */
function show() {
	this.style.display = 'block';
}

/**
 * let this hide
 * @export
 */
function hide() {
	this.style.display = 'none';
}

var Input = function () {
	/**
  * Creates an instance of Input.
  * @param {Element} element target
  * @param {Object} [option={}] options
  * @memberof Input
  */
	function Input(element) {
		var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		classCallCheck(this, Input);

		this.element = element;
		this.option = Object.assign({}, DEFAULT_OPTIONS, option);

		// input element
		this.$input = {};
		// result list conatiner
		this.$result = {};
		// input value
		this.inputValue = '';
		// search result
		this.result = [];
		// active result li
		this.active = 0;

		this.init();
	}

	createClass(Input, [{
		key: 'init',
		value: function init() {
			var element = this.element;

			element.innerHTML = INPUT_TEMPLATE;
			this.$input = document.querySelector('#pure-input');
			this.$result = document.querySelector('#pure-input-result');
			this.bind();
		}
		// bind event

	}, {
		key: 'bind',
		value: function bind() {
			var _this = this;

			var $input = this.$input,
			    $result = this.$result,
			    inputChange = this.inputChange;
			var chooseEvent = this.option.chooseEvent;

			$input.oninput = inputChange.bind(this);
			$input.onpropertychange = $input.oninput;
			addEvent($result, 'mousedown', function (e) {
				e = e || window.event;
				_this.inputValue = e.target.innerText;
				$input.value = _this.inputValue;
				_this.clearResultList();
				chooseEvent(_this.inputValue);
			});
			addEvent($input, 'focus', function () {
				_this.inputFocus = true;
				// if (SPACE_REGEX.test(this.inputValue)) return;
				// show.call($result);
			});
			addEvent($input, 'blur', function () {
				_this.inputFocus = false;
				hide.call($result);
			});
			addEvent(document, "keydown", function (e) {
				if (!_this.inputFocus) return;
				show.call($result);
				e = e || window.event;
				var $input = _this.$input;

				var keyCode = getKeyDownCode(e);
				var resultLength = _this.result.length;
				var activeList = document.querySelectorAll("#pure-input-result li");
				switch (keyCode) {
					// press up arror
					case 38:
						e.preventDefault();
						if (_this.active <= 1 || resultLength === 0) return;
						_this.active--;
						removeClass(activeList[_this.active], 'active');
						addClass(activeList[_this.active - 1], 'active');
						$input.value = _this.result[_this.active - 1];
						break;
					// press down arror
					case 40:
						e.preventDefault();
						if (_this.active === resultLength || resultLength === 0) return;

						if (_this.active > 0) {
							removeClass(activeList[_this.active - 1], 'active');
						}
						addClass(activeList[_this.active], 'active');
						_this.active++;
						$input.value = _this.result[_this.active - 1];
						break;
					// press enter
					case 13:
						if (_this.active === 0) return;
						$input.value = _this.result[_this.active - 1];
						_this.clearResultList();
						_this.inputValue = $input.value;
						chooseEvent(_this.inputValue);
						break;
					default:
						return;
						break;
				}
			});
		}
		// deal input change

	}, {
		key: 'inputChange',
		value: function inputChange() {
			var _this2 = this;

			this.active = 0;
			this.inputValue = this.$input.value || '';
			this.getResult().then(function (result) {
				_this2.result = result;
				console.log('inputchange search result', result);
				_this2.renderResultList();
			});
		}
		// clear result <li>

	}, {
		key: 'clearResultList',
		value: function clearResultList() {
			var $result = this.$result;

			while ($result.firstChild) {
				$result.removeChild($result.firstChild);
			}
			this.result = [];
			this.active = 0;
		}
		// render result <li>

	}, {
		key: 'renderResultList',
		value: function renderResultList() {
			var $result = this.$result,
			    result = this.result;

			$result.innerHTML = result.reduce(function (pre, cur) {
				return pre + '<li>' + cur + '</li>';
			}, '');
			this.active = 0;
		}
		// search

	}, {
		key: 'getResult',
		value: function getResult() {
			var inputValue = this.inputValue;
			var search = this.option.search;

			return new Promise(function (resolve, reject) {
				try {
					resolve(search(inputValue));
				} catch (err) {
					reject(err);
				}
			});
		}
	}]);
	return Input;
}();

var Pure = {
	Input: Input
};

return Pure;

})));
