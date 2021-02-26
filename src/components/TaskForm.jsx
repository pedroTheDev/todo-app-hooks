import React, {useContext, useState, useEffect} from 'react';
import {TaskListContext} from '../context/TaskListContext';

const TaskForm = () => {
	const {addTask, clearList, editItem, editTask} = useContext(TaskListContext);

	const [title, setTitle] = useState('');

	const handleChange = e => {
		setTitle(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		if(!editItem){
			addTask(title)
			setTitle('');
		}else{
			editTask(title, editItem.id);
		}
	};

	useEffect(() => {
		if(editItem){
			setTitle(editItem.title);
		} else {
			setTitle('');
		}

	},[editItem])
	//for editItem

	return (
		<form onSubmit={ handleSubmit } className="form">
			<input type="text"
				value={title}
				onChange={handleChange}
				className="task-input"
				placeholder="Enter a task"
				required />
			<div className="buttons">
				<button type="submit" className="btn add-task-btn">
					{editItem ? 'Edit Task' : 'Add Task'}
				</button>
				<button 
					className="btn clear-btn"
					onClick={clearList}>
					Clear
				</button>
			</div>
		</form>
	)
}

export default TaskForm
