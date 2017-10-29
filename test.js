const test = require('ava');
const combineNestedReducers = require('.');

test('throws error on invalid object', t => {
	t.throws(() => combineNestedReducers(false), '[combine-nested-reducers] Invalid item in reducer object. Expected function or object, got boolean');
});

test('combines object into function', t => {
	const reducer = {
		root: () => null
	};

	t.is(typeof combineNestedReducers(reducer), 'function');
});

test('combines reducer object of functions and objects', t => {
	const reducerObj = {
		counter: (state = 0) => state + 1,
		counterObject: {
			counter2: (state = 1) => state + 1
		}
	};

	const combinedReducer = combineNestedReducers(reducerObj);

	t.deepEqual(combinedReducer(), {
		counter: 1,
		counterObject: {
			counter2: 2
		}
	});
});

test('should throw error on null object', t => {
	const reducerObj = {
		null: null
	};

	t.throws(() => combineNestedReducers(reducerObj), '[combine-nested-reducers] Invalid item in reducer object. Expected function or object, got null');
});
