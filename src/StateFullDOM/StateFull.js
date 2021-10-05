import { C, CA, F, Q, QA } from '../Utils/DOM';
import { removBracket } from '../Utils/helper';

import API from './Api';

class StateFull extends API {
	state = {};
	change = [];
	handlers = {};
	_parantEle;
	_slection;

	constructor(Element /* (<Dom Element> | <String>) */, handlers = {}) {
		super(Element);
		/*  Checking Element Type */
		if (Element instanceof HTMLElement) this.current = Element;
		else if (typeof Element === 'string' && Q(Element)) this.current = Q(Element);
		else throw new Error('Invalid argument');
		this.handlers = handlers;
		this._init();
	}
	// on(event, callback) {
	// 	let SelectElements = QA(this._slection, this._parantEle || this.current);

	// 	if (SelectElements.length === 0) SelectElements = [this.current];
	// 	SelectElements.forEach((ele) =>
	// 		ele.addEventListener(event, (e) => {
	// 			e.state = this.state;
	// 			e.is = (Query) => F(e.target, Query);
	// 			callback(e);
	// 		})
	// 	);

	// 	this._slection = undefined;
	// 	return this;
	// }
	_init() {
		this._genrateVariable();

		for (const key in this.handlers) {
			this.current.addEventListener(key, (e) => this.handlers[key](e, this.state));
		}
	}

	_genrateVariable() {
		[...QA('*', this.current), this.current].forEach((element) => {
			// select Dynamic Attributes Form Element
			element.getAttributeNames().forEach((attr) => {
				this._setVariables(element.getAttributeNode(attr));
			});
			//  Select Dynamic Text Nodes
			element.childNodes.forEach((textNode) => {
				if (!textNode.nodeValue) return;
				this._setVariables(textNode);
			});
		});
	}
	_setVariables(node) {
		const variable = [...new Set(node.nodeValue.match(/{{.+?}}/g))];
		if (variable.length !== 0) {
			this.change.push({
				variable,
				value: node.nodeValue,
				element: node,
			});
		}
	}

	async setState(newStateOrFunction) {
		if (typeof newStateOrFunction === 'function') newStateOrFunction = newStateOrFunction(this.state);
		if (typeof newStateOrFunction !== 'object') throw new Error('Invalid argument');

		/* Check State Object is Update then Call Render Function */
		const updatedState = { ...this.state, ...newStateOrFunction };
		if (JSON.stringify(this.state) === JSON.stringify(updatedState)) return;

		await this._render(newStateOrFunction, updatedState);
		return this;
	}

	async _render(newState, updatedState) {
		// /*  Call Function Befor State Update */
		// if (this._beforeUpdate) {
		// 	const update = this._beforeUpdate(this.state, newState);
		// 	if (!update) return;
		// }
		/*  Check State Object is Update then Call Render Function */
		Object.keys(newState).forEach((key) => {
			this.change.forEach((change) => {
				if (!change.variable.includes(`{{${key}}}`)) return;
				const newText = change.value.replaceAll(
					/{{.+?}}/g,
					(slectedEle) => updatedState[removBracket(slectedEle)] ?? ''
				);
				if (newText !== change.element.nodeValue) change.element.nodeValue = newText;
			});
		});
		this.state = updatedState;

		// /* Call Function After State Update */
		// this._afterUpdate && this._afterUpdate(this.state);

		// /* Call Subscribed Function */
		// this._runSubscribed();
	}
}

const init = (Element, handlers = {}) => new StateFull(Element, handlers);

export default init;
