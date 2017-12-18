import {
	DEFAULT_OPTIONS,
	INPUT_TEMPLATE,
	SPACE_REGEX,
} from './const';
import {
	KEYMAP
} from './keyboard';
import {
	addEvent,
	show,
	hide
} from './utils';

class Input {
	/**
	 * Creates an instance of Input.
	 * @param {Element} element target
	 * @param {Object} [option={}] options
	 * @memberof Input
	 */
	constructor(element, option = {}) {
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

		this.init();
	}
	init() {
		const { element } = this;
		element.innerHTML = INPUT_TEMPLATE;
		this.$input = document.querySelector('#pure-input');
		this.$result = document.querySelector('#pure-input-result');
		this.addEventToInput();
		this.addEventToKeyBoard();
	}
	// add event to input
	addEventToInput() {
		const { $input, $result, inputChange } = this;
		$input.oninput = inputChange.bind(this);
		$input.onpropertychange = $input.oninput;
		addEvent($result,'mousedown',function(e){
			e = e || window.event;
			$input.value = e.target.innerText;
		});
		addEvent($input, 'focus', () => {
			if (SPACE_REGEX.test(this.inputValue)) return;
			show.call($result);
		});
		addEvent($input, 'blur', (e) => {
			e = e || window.event;
			event.stopPropagation();
			hide.call($result);
		});
	}
	// listen keyboard event
	addEventToKeyBoard() {
		if (!inputFocus) return;
		addEvent(document, "keydown", function (e) {
			const keyCode = getKeyDownCode(e);
			switch (keyCode) {
				// press up arror
				case 38:
					keyUp();
					break;
				// press down arror
				case 40:
					keyDown();
					break;
				// press enter
				case 13:
					keyEnter();
					break;
				default:
					return;
					break;
			}
		});
	}
	// deal input change
	inputChange() {
		this.inputValue = this.$input.value || '';
		this.getResult().then(result=>{
			this.result = result;
			console.log('inputchange search result',result);
			this.renderResultList();
		});
	}
	// clear result <li>
	clearResultList() {
		const { $result } = this;
		while ($result.firstChild) {
			$result.removeChild($result.firstChild);
		}
	}
	// render result <li>
	renderResultList() {
		const { $result, result } = this;
		$result.innerHTML = result.reduce((pre, cur) => `${pre}<li>${cur}</li>`,'');
	}
	// search
	getResult() {
		const { inputValue } = this;
		const { search } = this.option;
		return new Promise((resolve, reject) => {
			try {
				resolve(search(inputValue));
			} catch (err) {
				reject(err);
			}
		});
	}
}

export default Input;
