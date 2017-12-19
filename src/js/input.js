import {
	DEFAULT_OPTIONS,
	INPUT_TEMPLATE,
	SPACE_REGEX,
	KEYMAP
} from './const';
import {
	getKeyDownCode
} from './keyboard';
import {
	addEvent,
	show,
	hide,
	addClass,
	removeClass
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
		// active result li
		this.active = 0;

		this.init();
	}
	init() {
		const { element } = this;
		element.innerHTML = INPUT_TEMPLATE;
		this.$input = document.querySelector('#pure-input');
		this.$result = document.querySelector('#pure-input-result');
		this.bind();
	}
	// bind event
	bind() {
		const { $input, $result, inputChange } = this;
		const { chooseEvent } = this.option;
		$input.oninput = inputChange.bind(this);
		$input.onpropertychange = $input.oninput;
		addEvent($result,'mousedown',(e) => {
			e = e || window.event;
			this.inputValue = e.target.innerText;
			$input.value = this.inputValue;
			this.clearResultList();
			chooseEvent(this.inputValue);
		});
		addEvent($input, 'focus', () => {
			this.inputFocus = true;
			// if (SPACE_REGEX.test(this.inputValue)) return;
			// show.call($result);
		});
		addEvent($input, 'blur', () => {
			this.inputFocus = false;
			hide.call($result);
		});
		addEvent(document, "keydown", (e) => {
			if(!this.inputFocus) return;
			show.call($result);
			e = e || window.event;
			const { $input } = this;
			const keyCode = getKeyDownCode(e);
			const resultLength = this.result.length;
			const activeList = document.querySelectorAll("#pure-input-result li");
			switch (keyCode) {
				// press up arror
				case 38:
					e.preventDefault();
					if (this.active <= 1 || resultLength === 0) return;
					this.active--;
					removeClass(activeList[this.active],'active');
					addClass(activeList[this.active-1],'active');
					$input.value = this.result[this.active-1];
					break;
				// press down arror
				case 40:
					e.preventDefault();	
					if (this.active === resultLength || resultLength === 0) return;
					
					if (this.active > 0) {
						removeClass(activeList[this.active-1],'active');
					}
					addClass(activeList[this.active],'active')
					this.active++;
					$input.value = this.result[this.active-1];
					break;
				// press enter
				case 13:
					if (this.active === 0) return;
					$input.value = this.result[this.active - 1];
					this.clearResultList();
					this.inputValue = $input.value;
					chooseEvent(this.inputValue);
					break;
				default:
					return;
					break;
			}
		});
	}
	// deal input change
	inputChange() {
		this.active = 0;
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
		this.result = [];
		this.active = 0;
	}
	// render result <li>
	renderResultList() {
		const { $result, result } = this;
		$result.innerHTML = result.reduce((pre, cur) => `${pre}<li>${cur}</li>`,'');
		this.active = 0;
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
