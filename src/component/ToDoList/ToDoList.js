import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import { Trash, Pencil, ArrowCircleDown, ArrowCircleUp, File, Coins } from 'phosphor-react';

const ToDoList = ({ totalSavings }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [selectedColor, setSelectedColor] = useState('firstColor');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleClick = () => {
        if (newTask.trim() !== '') {
            setTasks((prevTasks) => [
                {
                    label: newTask,
                    completed: false,
                },
                ...prevTasks,
            ]);
            setNewTask('');
        }
    };

    const deleteItem = (index) => {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    };

    const editItem = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) => {
                if (i === index) {
                    return {
                        ...task,
                        editing: !task.editing,
                    };
                }
                return task;
            })
        );
    };

    const toggleCompleted = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) => {
                if (i === index) {
                    return {
                        ...task,
                        completed: !task.completed,
                    };
                }
                return task;
            })
        );
    };

    const moveItem = (index, direction) => {
        if (direction === 'up' && index > 0) {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
                return updatedTasks;
            });
        } else if (direction === 'down' && index < tasks.length - 1) {
            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
                return updatedTasks;
            });
        }
    };

    const handleLabelChange = (index, newValue) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].label = newValue;
            return updatedTasks;
        });
    };

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className='todo-app'>
            {/* Color Choose Component */}
            <div className="newColor text-center mt-3">
                <ul>
                    {['firstColor', 'secondColor', 'thirdColor'].map((color) => (
                        <li
                            key={color}
                            className={`${color} ${selectedColor === color ? 'selected' : ''}`}
                            onClick={() => handleSelectColor(color)}
                        ></li>
                    ))}
                </ul>
            </div>

            {/* Todo List Component */}
            <div className={`todo-container text-muted ${selectedColor === 'firstColor'? 'firstBorderColor': selectedColor==='secondColor'? 'secondBorderColor' : 'thirdBorderColor'}`}>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Coins size={32} weight="fill" color='#F1C93B' />  <span>Total Savings: ${totalSavings()}</span>
                    </div>
                    <h2 className={`head text-center ${selectedColor === 'firstColor'? 'firstTextColor': selectedColor==='secondColor'? 'secondTextColor' : 'thirdTextColor'}`}>Wish List</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input
                        className="form-control new-task"
                        type="text"
                        placeholder="What needs to be done?"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <button className={`add-button ${selectedColor}`} onClick={handleClick}>add</button>
                </div>

                {tasks.length > 0 && (
                    <div className="tasks-body">
                        <h3 className="doing text-center tasks-header">Let's do this!</h3>
                        <ul className={`task-container ${selectedColor === 'firstColor'? 'firstBorderColor': selectedColor==='secondColor'? 'secondBorderColor' : 'thirdBorderColor'}`}>
                            {tasks.map((task, index) => (
                                <li key={index} className={`todoItem ${task.completed ? 'completed' : ''}`}>
                                    <input
                                        type="checkbox"
                                        className="checkBox"
                                        checked={task.completed}
                                        onChange={() => toggleCompleted(index)}
                                    />
                                    {task.editing ? (
                                        <input
                                            className='edit-input'
                                            type="text"
                                            value={task.label}
                                            onChange={(e) => handleLabelChange(index, e.target.value)}
                                            onBlur={() => editItem(index)}
                                            autoFocus
                                        />
                                    ) : (
                                        <label className='label'>{task.label}</label>
                                    )}
                                    <button className="button delete-todo tasks-body-button" onClick={() => deleteItem(index)}>
                                        <Trash size={20} weight="fill" />
                                    </button>
                                    <button className="button edit-todo tasks-body-button" onClick={() => editItem(index)}>
                                        {task.editing ? <File size={20} weight="fill" /> : <Pencil size={20} weight="fill" />}
                                    </button>
                                    <button className="button down-todo tasks-body-button" onClick={() => moveItem(index, 'down')}>
                                        <ArrowCircleDown size={20} weight="fill" />
                                    </button>
                                    <button className="button up tasks-body-button" onClick={() => moveItem(index, 'up')}>
                                        <ArrowCircleUp size={20} weight="fill" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <footer className="activeTodo"></footer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToDoList;
