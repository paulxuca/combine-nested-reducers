const {combineReducers} = require('redux');
const isPlainObj = require('is-plain-obj');

const hasObject = obj => Object.keys(obj).some(key => isPlainObj(obj[key]));
const mapObj = arr => {
	const result = {};

	for (const [val, key] of arr) {
		result[key] = Array.isArray(val) ? mapObj(val) : val;
	}

	return result;
};

const combineNestedReducers = reducer => {
	const itermediateReducer = Object.keys(reducer).map(key => {
		let value = reducer[key];

		value = (isPlainObj(value) && (hasObject(value) ? combineNestedReducers(value) : combineReducers(value))) || value;

		return [value, key];
	});

	return combineReducers(mapObj(itermediateReducer));
};

module.exports = combineNestedReducers;

