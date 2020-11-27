import React from "react";
import ToDoList from "./ToDoList";

export default {
    title: 'ToDoList',
    component: ToDoList,
    args: {
        checked: [4,6],
        handleComplete: function (value) {
            console.log(value)
        },
        handleDelete: function (value) {
            console.log(value)
        },
        todoList: [
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "userId": 1,
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
            },
            {
                "userId": 1,
                "id": 3,
                "title": "fugiat veniam minus",
                "completed": false
            },
            {
                "userId": 1,
                "id": 4,
                "title": "et porro tempora",
                "completed": true
            },
            {
                "userId": 1,
                "id": 5,
                "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
                "completed": false
            },
            {
                "userId": 1,
                "id": 6,
                "title": "qui ullam ratione quibusdam voluptatem quia omnis",
                "completed": true
            }
        ]
    }
}

export const List = args => <ToDoList {...args}/>;
