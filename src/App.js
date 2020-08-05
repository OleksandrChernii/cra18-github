// создано с помощью лекций Виктора, Евгения и Романа Николаенкова

import React, {useState} from 'react';
import "./App.css"
import TodoList from "./TodoList";
import TodoCreateForm from "./TodoCreateForm";
import {v4 as uuid} from "uuid"     // для получения настоящего id, в дальнейшем применять так: uuid()
                                    // нужно выполнить команду в терминале "npm install uuidv4"

const initialList = [               // задаем массив объектов, каждый объект состоит из трех полей - id, title, done
  {id: uuid(), title: "Запустить Falcon 1", done: true},
  {id: uuid(), title: "Получить клиентов", done: true},
  {id: uuid(), title: "Получить контракт с NASA", done: true},
  {id: uuid(), title: "Запустить Falcon 9", done: true},
  {id: uuid(), title: "Построить свой пилотируемый корабль", done: true},
  {id: uuid(), title: "Запустить его к МКС", done: true},
  {id: uuid(), title: "Запустить геостационарный спутник", done: true},
  {id: uuid(), title: "Учиться садить ракеты на Землю", done: true},
  {id: uuid(), title: "Посадить хоть одну ракету на Землю", done: true},
  {id: uuid(), title: "Посадить хоть одну ракету на баржу", done: true},
  {id: uuid(), title: "Посадить хоть одну ракету на Землю после вывода на ГПО", done: true},
  {id: uuid(), title: "Запустить б/у ракету", done: true},
  {id: uuid(), title: "Запустить Falcon Heavy", done: true},
  {id: uuid(), title: "Вернуть обтекатель", done: true},
  {id: uuid(), title: "Сделать Crew Dragon", done: true},
  {id: uuid(), title: "Повторно использовать обтекатель", done: true},
  {id: uuid(), title: "Начать запуски с астронавтами", done: true},
  {id: 1234567890, title: "--- Вы находитесь здесь ---", done: undefined},
// вы находитесь здесь
  {id: uuid(), title: "Переделать конструкцию Starship для полётов на Луну в 2020 году", done: false},
  {id: uuid(), title: "Вместе с NASA и Jeff Bezos организовать постоянную базу на Луне в 2022 году", done: false},
  {id: uuid(), title: "Запустить корабль на Марс в 2022 году", done: false},
  {id: uuid(), title: "Посадить автоматический корабль на Марс в 2022 году", done: false},
  {id: uuid(), title: "Посадить пилотируемый корабль на Марс в 2024 году", done: false},
  {id: uuid(), title: "Организовать колонию на Марсе в 2030 году", done: false},
  {id: uuid(), title: "Терраформировать Марс в 2050 году", done: false}
]
// -----------------------------------------------------------------
export default function App() {
  const [list, setList] = useState(initialList); // задаём начальное значение переменной list через через переменную initialList

  // const [list, setList] = useState([{id: 1, title: "First Todo", done: true},          // вариант задания начального
  //                                           {id: 2, title: "Second Todo", done: true}, // массива объектов напрямую,
  //                                           {id: 3, title: "Third Todo", done: false}, // а не через переменную initialList
  //                                           {id: 4, title: "4th Todo", done: false}]); //
// -----------------------------------------------------------------
  function create (title) {   // классический вариант создания неанонимной функции без стрелки
    const newItem = {id: uuid(), title: title, done: false} // создание нового элемента массива
    // console.log({newItem})                // для отладки
    // console.log({list})                   // для отладки
    setList([...list, newItem])      // вставка нового элемента в текущий массив
    // console.log({list})                   // для отладки
  }
// --- предыдушие интересные варианты ---
//     const create = (title) => {       // функция для создания нового Todo, на входе - текст title
// console.log(`title=${title}`)         // для отладки
//     const newItem = {                     // структура нового элемента Todo:
//             id: Math.random() * 1000000000000000000,    // id - генерируется псевдослучайным образом
//             title: title,                               // title - получаем на входе из компонента TodoCreateForm
//             done: false}                                // состояние по умолчанию - false, ещё не выполнено
// console.log({newItem})                // для отладки
//     setList([...list, newItem]);            // вариант прямого, без участия переменной, ререндеринга
//     const updatedList = [...list, newItem]; // вариант ререндеринга через создание переменной updateList
//     setList(updatedList);                   // сделать ререндеринг
// console.log({updatedList})            // для отладки
// console.log({list})                   // для отладки
// console.log('---------------')        // для отладки
//     };
// -----------------------------------------------------------------
  function markUnmark (currentId) {               // универсальная функция Инвертирование поля done="вкл-выкл перечёркивание"
    // console.log(todoId)                      // для отладки
    const markedList = list.map (el => {            // перебираем входной массива list по el (каждый el - объект массива list)
      if (el.id === currentId)                    // если поле id текущего перебираемого элемента массива list (то есть поле id объекта)
          // равно переданному из TodoListItem, то
        return ({...el,done: !el.done})         // инвертировать поле done (интересный приём - spread объекта + значение поля done
                                                // инвертировать и заменить им имеющееся значение),
      return el;                                  // иначе ничего не делать с этим элементом (объектом)
    })
    setList(markedList);                        // сделать ререндеринг
  }
// -----------------------------------------------------------------
  function deleteCurrentTodo (currentId) {        // функция удаления элемента массива list (объекта) по полю id, присланному из TodoListItem
    const updatedList = [...list].filter        // копируем текущий массив list spread'ом, применяя метод filter:
        (el => el.id !== currentId)                 // копировать те элементы, поле id которых не равно id, присланному из TodoListItem
    setList(updatedList);                       // сделать ререндеринг
  }
// -----------------------------------------------------------------
  const todoUpdate = (currentId, newTodo) => {    // функция замены текста поля title на новое значение newTodo
    const updatedList = list.map (el => {       // перебираем входной массива list по el (каждый el - объект массива list)
      if  (el.id === currentId)               // если поле id текущего перебираемого элемента массива list (поле id объекта)
          // равно переданному из TodoListItem, то
        return {...el, title: newTodo}          // заменить в нужном элементе поле title на поле newTodo (из TodoListItem),
      return el                               // иначе ничего не делать с этим элементом (объектом)
    })
    setList(updatedList);                       // сделать ререндеринг
  }
// -----------------------------------------------------------------
  return (
      <div align="center">
        <h4>Elon Musk's Todo List</h4>
        <TodoCreateForm create={create}/>   {/* вызываем компонент TodoCreateForm, чтобы иметь возможность ввести новый Todo */}
        {/* {console.log({list})}           // для отладки */}
        <TodoList list={list} markUnmark={markUnmark} deleteCurrentTodo={deleteCurrentTodo} todoUpdate={todoUpdate}/> {/* Чтобы наш "Todo list" отрисовался */}
      </div>
  );
}