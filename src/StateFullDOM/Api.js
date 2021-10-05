import { C, CA, F, Q, QA } from '../Utils/DOM.js';

class API {
	// subscribed = [];
	// _beforeUpdate;
	// _afterUpdate;

	// subscribe(Function) {
	// 	this.subscribed.push(Function);
	// 	return this;
	// }
	// _runSubscribed() {
	// 	this.subscribed.forEach((Function) => Function(this.state));
	// }
	// beforeUpdate(Function) {
	// 	if (typeof Function !== 'function') throw new Error('Invalid argument');
	// 	this._beforeUpdate = Function;
	// 	return this;
	// }
	// afterUpdate(Function) {
	// 	if (typeof Function !== 'function') throw new Error('Invalid argument');
	// 	this._afterUpdate = Function;
	// 	return this;
	// }
	// select(queryOrElement) {
	// 	this._slection = queryOrElement;
	// 	return this;
	// }
	appendIn(Element) {
		Element.appendChild(this.current);
	}
	remove() {
		this.current.remove();
	}
}

export default API;
