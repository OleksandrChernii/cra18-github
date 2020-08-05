import React from 'react';
import TodoListItem from "./TodoListItem";
export default function TodoList({list, markUnmark, deleteCurrentTodo, todoUpdate}) {
// -----------------------------------------------------------------
// const {list}=props - можно и так получить из пропсов поля объекта массива list
// -----------------------------------------------------------------
    return (
        <div>
            {list.map(el=> <TodoListItem
                id={el.id}
                key={el.id}                         // Поле key обязательно, 'Warning: Each child in a list should have a unique "key" prop'
                title={el.title}
                done={el.done}
                deleteCurrentTodo={deleteCurrentTodo}
                markUnmark={markUnmark}
                todoUpdate={todoUpdate}
            />)}
        </div>
    );
}