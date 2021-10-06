import { C, CA, F, Q, QA } from '../Utils/DOM.js';

const useInput = (element, initialValue = '') => {
	if (element instanceof HTMLElement) element = element;
	else if (typeof element === 'string') element = Q(element);
	else throw new Error('useInput: Invalid element argument');
	/* Function */
	const set = (value) => (element.value = value);
	const get = () => element.value;

	/* intiallize*/
	set(initialValue);

	return [get, set];
};

export default useInput;
