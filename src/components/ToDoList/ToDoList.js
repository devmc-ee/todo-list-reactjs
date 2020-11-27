import React from 'react';
import {List} from '@material-ui/core'
import ToDoItem from "../ToDoItem/ToDoItem";

/**
 * List of TODO items
 * @param props
 * @returns {*}
 * @constructor
 */
const ToDoList = props => {
    const {todoList = [],completed, handleComplete, handleDelete} = props;

    return (
        <List >
            {todoList.map((todoItem)=>{
             return   <ToDoItem
                    key={todoItem.id}
                    todoId={todoItem.id}
                    todoUserId={todoItem.userId}
                    todoText={todoItem.title}
                    todoCompleted={todoItem.completed}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    checked={completed}
            />
            })}
        </List>
    )
}
export default ToDoList;
