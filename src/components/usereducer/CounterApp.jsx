import React from 'react';
import { useReducer } from 'react';

const initialState = 10;

const types = {
	increment: 'increment',
	decrement: 'decrement',
	reset: 'reset',
};

// este value es igual al initialState, es un mutador del estado inicial
const init = value => {
	return value + 1;
};
const reducer = (state, action) => {
	if (action.type == types.increment) {
		return state + 1;
	}
	if (action.type == types.decrement) {
		return state - 1;
	}
	if (action.type == types.reset) {
		return init(initialState);
	}
	// si no existe la accion entra por aca
	return state;
};

export const CounterApp = () => {
	const [counter, dispatch] = useReducer(reducer, initialState, init);
	return (
		<>
			<h1>{counter}</h1>

			<button onClick={() => dispatch({ type: types.increment })}>Increment</button>
			<button onClick={() => dispatch({ type: types.decrement })}>Decrement</button>
			<button onClick={() => dispatch({ type: types.reset })}>Reset</button>
		</>
	);
};
