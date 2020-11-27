import React from "react";
import {
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './ToDoItem.css';

/**
 * Single TODO item
 * @param props
 * @returns {*}
 * @constructor
 */
const ToDoItem = props => {
    const {todoId, todoText, todoUserId, handleComplete, handleDelete, todoCompleted} = props;

    const labelId = `checkbox-list-label-${todoId}`;

    return (
        <ListItem key={todoId} role={undefined} button onClick={() => handleComplete(todoId)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={todoCompleted}
                    disabled={todoCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{'aria-labelledby': labelId}}
                />
            </ListItemIcon>
            <ListItemText
                className={todoCompleted ? 'isCompleted' : ''}
                id={labelId}
                primary={`(ID: ${todoId}) TODO: "${todoText}"  | by userId: ${todoUserId}`}
            />

            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todoId)}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
export default ToDoItem;
