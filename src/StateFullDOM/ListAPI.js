import API from './Api';

class ListApi extends API {
	constructor(...arg) {
		super(...arg);
	}

	has(id) {
		if (this.list[id]) return true;
		return false;
	}
	get(id) {
		if (this.has(id)) {
			const { current, state, parantEle } = this.list[id];
			return { current, state, parantEle };
		}
		return {};
	}
	add(state) {
		if (this.has(state?.id)) return this;
		this.setState([...this.state, state]);
		return this;
	}
	remove(id) {
		if (!this.has(id)) return this;
		this.setState(this.state.filter((ele) => ele.id !== id));
		return this;
	}
	update(state) {
		if (!this.has(state?.id)) return this;
		this.setState(
			this.state.map((ele) => {
				if (ele.id === state.id) {
					return state;
				}
				return ele;
			})
		);
		return this;
	}

	addOrUpdate(state) {
		if (this.has(state?.id)) {
			this.update(state);
		} else {
			this.add(state);
		}
		return this;
	}
}

export default ListApi;
