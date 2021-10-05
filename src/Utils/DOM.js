// Dom Slector
export const Q = (query, parentEl = document) => parentEl.querySelector(query);
export const QA = (query, parentEl = document) => parentEl.querySelectorAll(query);

// Class List
export const C = (element = document.body, method = 'toggle', className = 'active') =>
	element.classList[method](className);
export const CA = (element = [], method = 'toggle', className = 'active') =>
	element.forEach((ele) => ele.classList[method](className));

// Find DOM Element
export const F = (element = document.body, query = 'div') => element.closest(query);
