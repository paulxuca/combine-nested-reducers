const {combineReducers} = require('redux');

const isNull = x => x === null;

const combineNestedReducers = reducerObj => {
	if (typeof reducerObj === 'function') {
		return reducerObj;
	}

	if (typeof reducerObj === 'object' && !isNull(reducerObj)) {
		const reducerKeys = Object.keys(reducerObj);
		const combinedReducersObj = {};

		for (const key of reducerKeys) {
			combinedReducersObj[key] = combineNestedReducers(reducerObj[key]);
		}

		return combineReducers(combinedReducersObj);
	}

	throw new Error(`[combine-nested-reducers] Invalid item in reducer object. Expected function or object, got ${isNull(reducerObj) ? 'null' : typeof reducerObj}`);
};

module.exports = combineNestedReducers;
