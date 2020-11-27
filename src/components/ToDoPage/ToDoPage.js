import React, {useEffect, useState} from "react";
import ToDoList from "../ToDoList/ToDoList";
import {Button, InputLabel, ButtonGroup, Select, MenuItem, FormControl, TextField} from "@material-ui/core";
import './ToDoPage.css';

/**
 * ToDo List page
 * - Create new todos (imitate adding to db)
 * - Fetches from db
 * - Update in db
 * @returns {*}
 * @constructor
 */
const ToDoPage = () => {
    const [todoList, setTodoList] = useState([]);
    const [activeFilter, setActiveFilter] = useState(0);
    const [isVisibleAddTodo, setIsVisibleAddTodo] = useState(false)
    const [entryStatus, setEntryStatus] = useState({
        isInvalid: false,
        helperText: ''
    });

    /**
     * Handle complete actions, when todo item is marked as completed
     * Handle fake db update, mocks data set for new items
     * PUT
     * @param value
     */
    const handleComplete = function (value) {
        let todoItem;
        for (let index in todoList) {
            if (todoList[index].id === value) {
                todoItem = todoList[index];
                if (todoItem.completed) {
                    return;
                }
                todoItem.completed = true;
                todoList[index] = todoItem;
                setTodoList([...todoList]);
            }
        }

        // only for new items that are not in the mock db (only 200 items)
        if (todoItem.id > 200) {
            console.log('Updated id: ' + todoItem.id);
            return;
        }

        fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: todoItem.id,
                title: todoItem.title,
                completed: true,
                userId: todoItem.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(() => {
                console.log('Updated id: ' + todoItem.id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    /**
     * Handle delete action
     * DELETE
     * @param value
     */
    const handleDelete = function (value) {
        let todoItem;
        for (let index in todoList) {
            if (todoList[index].id === value) {
                todoItem = todoList[index];
                todoList.splice(index, 1)
                setTodoList([...todoList]);
            }
        }

        // only for new items that are not in the mock db (only 200 items)
        if (todoItem.id > 200) {
            console.log('deleted id:' + value);
            return;
        }

        fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => console.log('deleted id:' + value))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * Set active button contained
     * Fetches todoList according to set filter parameters
     *
     * @param activeFilterValue
     * @param filterName
     * @param filterValue
     */
    const handleFilterButton = (activeFilterValue, filterName = '', filterValue = '') => {
        setActiveFilter(activeFilterValue);
        getFilteredTodos(filterName, filterValue);
    }

    /**
     * Fetch API with filters. If none is set, then return all todos
     * @param filter
     * @param value
     */
    const getFilteredTodos = (filter = '', value = '') => {
        let url = '';
        if ('' === filter || '' === value) {
            url = 'https://jsonplaceholder.typicode.com/todos/';
        } else {
            url = `https://jsonplaceholder.typicode.com/todos/?${filter}=${value}`;
        }
        setIsVisibleAddTodo(false);
        fetch(url)
            .then(response => response.json())
            .then(json => setTodoList(json))
    }

    /**
     * Handle Insert (POST) request
     */
    const handleAddNewToDo = () => {
        const newAddToDoItemValue = document.querySelector('#addTodoItem').value;
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: newAddToDoItemValue,
                completed: false,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                json.id = todoList.length + 1; //fake id growth

                //add new item at the beginning of the list
                setTodoList([json, ...todoList]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        document.querySelector('#addTodoItem').value = '';
    }

    /**
     * Validate Add ToDO input
     * - min 3 letters
     * - max 50 letters
     * - /[a-zA-z0-9_,\- ]/gi
     * @param value
     */
    const validateInput = value => {
        let helperText = '';
        if (value.length < 3) helperText = 'Min. 3 letters';
        if (value.length > 50) helperText = 'Max. 50 letters';
        const regex = /[a-zA-z0-9_,\- ]/gi;
        if (value.replaceAll(regex, '').length > 0) helperText = 'Only a-z, A-Z, 0-9, including the _ ';
        if (helperText.length > 0) {
            setEntryStatus({isInvalid: true, helperText: helperText});
        } else {
            setEntryStatus({isInvalid: false, helperText: ''});
        }
    }

    /**
     * initial fetching of todoList
     */
    useEffect(() => {
        getFilteredTodos();
    }, []);

    return (
        <div className="TodoListPage">
            <div className="todoFiltersBar">
                <Button variant={"contained"} color="secondary" onClick={() => setIsVisibleAddTodo(true)}>
                    +
                </Button>
                <ButtonGroup variant="text" color="primary" aria-label="outlined primary button group">
                    <Button variant={activeFilter === 0 ? 'contained' : ''}
                            onClick={() => handleFilterButton(0)}>
                        All ToDos
                    </Button>
                    <Button variant={activeFilter === 1 ? 'contained' : ''}
                            onClick={() => handleFilterButton(1, 'completed', 'true')}>
                        Completed
                    </Button>
                    <Button variant={activeFilter === 2 ? 'contained' : ''}
                            onClick={() => handleFilterButton(2, 'completed', 'false')}>
                        Uncompleted
                    </Button>
                </ButtonGroup>
                <FormControl className="filter-by-user-id-select">
                    <InputLabel id="filter-by-user-id-label">Filter by UserID:</InputLabel>
                    <Select
                        labelId="filter-by-user-id-label"
                        id="filter-by-user-id"
                        onChange={(event) => getFilteredTodos('userId', event.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={`addTodoBar ${isVisibleAddTodo ? '' : 'isHidden'}`}>
                <TextField id="addTodoItem"
                           className="addTodoItemInput"
                           error={entryStatus.isInvalid}
                           onChange={(event => setTimeout(validateInput(event.target.value), 1000))}
                           helperText={entryStatus.helperText}
                           label="Add ToDo"/>
                <Button variant='contained'
                        disabled={entryStatus.isInvalid}
                        className="addTodoItemButton"
                        onClick={() => handleAddNewToDo()}>
                    Add ToDo
                </Button>

            </div>
            <ToDoList todoList={todoList} handleComplete={handleComplete} handleDelete={handleDelete}/>
        </div>

    );
}

export default ToDoPage;
