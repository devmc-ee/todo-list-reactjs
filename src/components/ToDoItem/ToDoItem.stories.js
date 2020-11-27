import React from 'react';
import ToDoItem from "./ToDoItem";


export default {
    title: 'ToDoItem',
    component: ToDoItem,
    args: {
        checked: [0, 2],
        handleComplete: function (value) {
            console.log(value)
        },
        handleDelete: function (value) {
            console.log(value)
        }
    }

}
const data = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}

const Template = args => <ToDoItem {...args} />;
export const Item1 = Template.bind({});
Item1.args = {
    todoId: data.id,
    todoUserId: data.userId,
    todoText: data.title,
    todoCompleted: data.completed
}
