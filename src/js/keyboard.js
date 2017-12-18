import { KEYMAP } from './const';

// ref to https://github.com/jaywcjlove/hotkeys/blob/5d9ef40d72b802f4e1279be9a0c4e9bbe7c5380a/src/hotkeys.js
/**
 * get num of keyboard
 * @export
 * @param {any} x keyboard
 * @returns {number} key number
 */
export function code(x) {
	return KEYMAP[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}

/**
 * get key code when when click keyboard
 * @export
 * @param {any} e event
 * @returns {number} clicked key number
 */
export function getKeyDownCode(e) {
	e = e || window.event;
	let keyCode = e.keyCode || e.which || e.charCode;
	if (typeof (keyCode) === 'string') {
		keyCode = code(keyCode); // transfer to code
	}
	return keyCode;
}

