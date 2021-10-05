import { C, CA, F, Q, QA } from '../Utils/DOM';
import StateFull from './StateFull';
import ListAPI from './ListAPI';

class StateFullList extends ListAPI {
	state = [];
	handler = {};
	templateEle;
	list = [];
	_slection;
	constructor(Element, handler = {}) {
		super(Element, handler);
		/*  Checking Element Type */
		if (Element instanceof HTMLElement) this.current = Element;
		else if (typeof Element === 'string' && Q(Element)) this.current = Q(Element);
		else throw new Error('Invalid argument');
		this.handler = handler;
	}

	//  Template Element Genrate
	template(ElementSlecrorOrHtmlString) {
		if (!ElementSlecrorOrHtmlString) throw new Error('Please Provide => Slector | Dom Element | Html String ');
		if (ElementSlecrorOrHtmlString instanceof HTMLElement) {
			this.templateEle = ElementSlecrorOrHtmlString.cloneNode(true);
			return this;
		}
		const isHtmlString = ElementSlecrorOrHtmlString.match(/<.+?>/g);
		if (isHtmlString) {
			if (isHtmlString.length < 2)
				throw new Error('Please Provide Proper HtmlTag, Like\n\n <div> List Ele {{Id}}</div> \n\n');
			this.templateEle = new DOMParser()
				.parseFromString(ElementSlecrorOrHtmlString, 'text/html')
				.querySelector('body> *');
			return this;
		}
		const Ele = Q(ElementSlecrorOrHtmlString);
		if (Ele) {
			this.templateEle = Ele.cloneNode(true);
			return this;
		}
		throw new Error('Invalid argument');
	}

	async setState(newState) {
		if (JSON.stringify(this.state) === JSON.stringify(newState)) return;

		//  check List Length
		const stateLength = await this.state.length;
		const newstateLength = await newState.length;

		// Items Added
		if (stateLength < newstateLength) {
			for (let index = stateLength; index < newstateLength; index++) {
				await this._genrateListItem(newState[index]);
			}
		}

		// Items Removed
		if (stateLength > newstateLength) {
			const newStateIds = await newState.map((ele) => ele.id);
			await this.state.forEach((ele) => {
				!newStateIds.includes(ele.id) && this._removeListItem(ele.id);
			});
		}
		//  Set State
		await this._Render(newState);
	}

	// on(event, callback) {
	// 	this.list.forEach((ele) => {
	// 		if (this._slection) ele.select(this._slection).on(event, callback);
	// 		else ele.on(event, callback);
	// 	});
	// 	this.handler[event] = { cb: callback, slection: this.slection };
	// 	this.slection = undefined;
	// 	return this;
	// }
	_genrateListItem(state) {
		if (!this.templateEle instanceof HTMLElement)
			throw new Error('Please use template() Method for creating List item Template');
		this.list[state.id] = StateFull(this.templateEle.cloneNode(true), this.handler);
		this.list[state.id].appendIn(this.current);
		// for (let event in this.handler) {
		// 	const { cb, slectionn } = this.handler[event];
		// 	if (slectionn) this.list[state.id].select(slectionn).on(event, cb);
		// 	else this.list[state.id].on(event, cb);
		// }
	}

	_removeListItem(id) {
		if (this.has(id)) {
			this.get(id).current.remove();
			delete this.list[id];
		}
	}

	_Render(newState) {
		// /*  Call Function Befor State Update */
		// if (this._beforeUpdate) {
		// 	const update = this._beforeUpdate(this.state, newState);
		// 	if (!update) return;
		// }
		/*  Check State Object is Update then Call Render Function */
		if (newState.length === 0) return;
		newState.forEach((ele) => {
			this.list[ele.id].setState(ele);
		});

		this.state = newState;

		// /* Call Function After State Update */
		// this._afterUpdate && this._afterUpdate(this.state);

		// /* Call Subscribed Function */
		// this._runSubscribed();
	}
}

const init = (ParaentElement, handler = {}) => new StateFullList(ParaentElement, handler);

export default init;
