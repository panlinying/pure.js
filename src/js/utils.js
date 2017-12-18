// export const WINDOW = typeof window !== 'undefined' ? window : {};
import { document } from './const';
// document.prototype.ready = ready

/**
 * do something after DOMContentLoaded
 * @export
 * @param {any} callback callback function
 */
export function ready(callback) {
	function handler() {
		document.removeEventListener('DOMContentLoaded', handler, false);
		window.removeEventListener('load', handler, false);
		callback();
	}
	// don't use "interactive" on IE <= 10 (it can fired premature)
	if (document.readyState === 'complete' ||
		(document.readyState !== 'loading' && !document.documentElement.doScroll)) {
		setTimeout(callback(), 0);
	} else {
		handler();
		document.addEventListener('DOMContentLoaded', handler, false);
		window.addEventListener('load', handler, false);
	}
}

/**
 * charge whether the value is a number
 * @export
 * @param {any} value charge value
 * @returns {boolen} true or false
 */
export function isNumber(value) {
	const { isNaN } = Number;
	return typeof value === 'number' && !isNaN(value);
}

/**
 * charge whether the value is a function
 * @export
 * @param {any} value charge value
 * @returns {boolen} true or false
 */
export function isFunction(value) {
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
export function each(elements, callback) {
	if (Array.isArray(elements) || isNumber(elements.length)) {
		let i;
		for (i = 0; i < elements.length; i += 1) {
			if (callback.call(elements[i], i, elements[i]) === false) return elements;
		}
	} else {
		Object.keys(elements).forEach((key) => {
			callback.call(elements[key], key, elements[key]);
		});
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
export function getSetClassName(node, value) {
	const klassName = node.className || '';
	const svg = klassName && klassName.baseVal !== undefined;
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
export function hasClass(element, className) {
	if (!className) return false;
	return element.classList
		? element.classList.contains(className)
		: getSetClassName(element).indexOf(className) > -1;
}

/**
 * add class to element
 * @export
 * @param {Element} element to be added target
 * @param {string} className to be added class name
 */
export function addClass(element, className) {
	if (!className) return;
	each(element, (idx, ele) => {
		if (!('className' in ele)) return;
		const classList = [];
		const cls = getSetClassName(ele);
		className.split(/\+s/g).forEach((cl) => {
			if (!ele.hasClass(cl)) classList.push(cl);
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
export function removeClass(element, className) {
	each(element, (idx, ele) => {
		if (!('className' in ele)) return;
		if (className === undefined) {
			getSetClassName(ele, '');
			return;
		}
		let cls = getSetClassName(ele);
		cls.split(/\+s/g).forEach((cl) => {
			cls = cls.replace(cl, '');
		});
	});
}

/**
 * add event on element
 * @export
 * @param {Element} element event target
 * @param {string} eventName event name
 * @param {function} callback  evnet callback
 */
export function addEvent(element, eventName, callback) {
	if (!isFunction(callback)) return;
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent(`on${eventName}`, callback);
	} else {
		element[`on${eventName}`] = callback;
	}
}

/**
 * remove element child nodes
 * @export
 * @param {Element} element remove target
 */
export function removeChildNodes(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

/**
 * let this show
 * @export
 */
export function show() {
	this.style.display = 'block';
}

/**
 * let this hide
 * @export
 */
export function hide() {
	this.style.display = 'none';
}
