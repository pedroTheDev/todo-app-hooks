import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
// icons from uuid

// context and provider at the same file

export const TaskListContext = createContext();

const TaskListContextProvider = props => {

	const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

	const [tasks, setTasks] = useState(initialState);
	// add to provider
	const [editItem, setEditItem] = useState(null);

  // saves tasks at local storage
	useEffect(() =>{
		localStorage.setItem('tasks',JSON.stringify(tasks))
	},[tasks])

	const addTask = (title) => {
		setTasks([...tasks, {title, id:uuid()}])
	}
	// add to provider
	//go to taskform

	const removeTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id))
	}
	// add to provider
	// go to task

	const clearList = () => {
		setTasks([]);
	}

	const findItem = (id) => {
		const item = tasks.find(task => task.id === id);

		setEditItem(item);
	};
	// add to provider
	// go to task

	const editTask = (title, id) => {
		const newTasks = tasks.map(task => (task.id === id ? {title, id} : task))

		setTasks(newTasks)
		setEditItem(null)
	}
	// add to provider
	// go to taskform

	return (
		<TaskListContext.Provider value={{tasks, addTask, removeTask, clearList, findItem, editTask, editItem}}>
		{props.children}
		</TaskListContext.Provider>
	)
}

export default TaskListContextProvider;
