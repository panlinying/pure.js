/*!
* Pure.js v1.0.0
* undefined
*
* Copyright (c) 2017 undefined
* Released under the MIT license
*
* Date: 2017-12-18T11:32:54.773Z
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
var SPACE_REGEX = /^$|\s+/g;

// ref to https://github.com/jaywcjlove/hotkeys/blob/5d9ef40d72b802f4e1279be9a0c4e9bbe7c5380a/src/hotkeys.js
/**
 * get num of keyboard
 * @export
 * @param {any} x keyboard
 * @returns {number} key number
 */


/**
 * get key code when when click keyboard
 * @export
 * @param {any} e event
 * @returns {number} clicked key number
 */

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


/**
 * get or set className to node
 * access className property while respecting SVGAnimatedString
 * @export
 * @param {node} node className target
 * @param {string} value className value
 * @returns {any} return false or className value
 */


/**
 * if element has className
 * @export
 * @param {Element} element className target
 * @param {string} className className value
 * @returns {boolean} has or not
 */


/**
 * add class to element
 * @export
 * @param {Element} element to be added target
 * @param {string} className to be added class name
 */


/**
 * remove class of element
 * @export
 * @param {Element} element remove target
 * @param {string} className removed class name
 */


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
		// input value changed
		// this.valueChanged = false;

		this.init();
	}

	createClass(Input, [{
		key: 'init',
		value: function init() {
			var element = this.element;

			element.innerHTML = INPUT_TEMPLATE;
			this.$input = document.querySelector('#pure-input');
			this.$result = document.querySelector('#pure-input-result');
			var $input = this.$input,
			    $result = this.$result;

			this.addEventToInput();
			addEvent($result, 'mousedown', function (e) {
				e = e || window.event;
				$input.value = e.target.innerText;
				// $valueContainer.innerHTML = '';
			});
		}
		// add event to input

	}, {
		key: 'addEventToInput',
		value: function addEventToInput() {
			var _this = this;

			var $input = this.$input,
			    $result = this.$result,
			    inputChange = this.inputChange;

			$input.oninput = inputChange.bind(this);
			$input.onpropertychange = $input.oninput;
			// addEvent($input, 'focus', async () => {
			// 	if (SPACE_REGEX.test(this.inputValue)) return;
			// 	this.result = await this.getResult();
			// });
			addEvent($input, 'focus', function () {
				if (SPACE_REGEX.test(_this.inputValue)) return;
				show.call($result);
			});
			addEvent($input, 'blur', function (e) {
				e = e || window.event;
				event.stopPropagation();
				hide.call($result);
			});
		}
		// deal input change

	}, {
		key: 'inputChange',
		value: function inputChange() {
			var _this2 = this;

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
