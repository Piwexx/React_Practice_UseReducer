import React from 'react';
import { useState } from 'react';
import { useReducer } from 'react';

const initialTodo = [
	{ id: 1, title: 'todo #1' },
	{ id: 2, title: 'todo #2' },
];

const reducer = (state, action) => {
	if (action.type == 'delete') {
		return state.filter(todo => todo.id !== action.payload);
	}
	if (action.type == 'add') {
		return [...state, action.payload];
	}
	if (action.type == 'update') {
		const todoEdit = action.payload;
		return state.map(todo => (todo.id === todoEdit.id ? todoEdit : todo));
	}
	return state;
};
export const TodoApp = () => {
	const [todoData, dispatch] = useReducer(reducer, initialTodo);
	const [text, setText] = useState('');
	const newTodo = { id: Date.now(), title: text };
	return (
		<>
			<h1>TodoApp</h1>
			<input
				placeholder='New Task'
				value={text}
				onChange={e => setText(e.target.value)}></input>
			<button
				onClick={() => {
					dispatch({ type: 'add', payload: newTodo });
				}}>
				Add
			</button>
			<ul>
				{todoData.map(todo => (
					<li key={todo.id}>
						{todo.title}
						<button
							onClick={() => {
								dispatch({ type: 'delete', payload: todo.id });
							}}>
							Delete
						</button>
						<button
							onClick={() => {
								dispatch({ type: 'update', payload: { ...todo, title: text } });
							}}>
							Update
						</button>
					</li>
				))}
			</ul>
		</>
	);
};
