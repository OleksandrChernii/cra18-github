import React, {useState} from 'react';
export default function TodoListItem({title, id, done, markUnmark, deleteCurrentTodo, todoUpdate}) {
// -----------------------------------------------------------------

    const listStyle = {
        listStyle: "none",                              // стиль "убрать точки при выводе каждого элемента массива list"
        textDecoration: done ? "line-through" : null    // выбрать стиль текста (перечеркивать или нет) в зависимости от значения поля done
    };

    const markUnmarkText = done? "Отменить отметку" :   // выбрать текст "Отменить отметку" или
        "Сделано"              // "Сделано"
                               // в зависимости от значения поля done true или false

    const isShowButton = id !== 1234567890              // проверяем значение id
        ? (                                             // если id - не 1234567890, выполняем код ниже
            <span>
                     <button
                         onClick={() => markUnmark(id)}>    {/* назначить функцию markUnmark (Инвертирование поля done) кнопке */}
                         {markUnmarkText}                   {/* с текстом "Отменить отметку" или "Сделано" */}
                         {/* в зависимости от значения поля done *!/*/}
                     </button>
                     <button
                         onClick={() => deleteCurrentTodo(id)}> {/* назначить функцию deleteCurrentTodo (Удалить текущий объект) */}
                         Удалить элемент                        {/* кнопке с текстом "Удалить элемент" */}
                     </button>
                     <button onClick={() => setIsEditMode(true)}>   {/* включить режим editMode */}
                         Редактировать                                   {/* надпись на кнопке */}
                     </button>
            </span>
        )
        : null                                                              // для элемента с id 1234567890 не выводить кнопки

    const [isEditMode, setIsEditMode] = useState(false);           // заводим useState для управления режимом редактирования

    const [newTodo, setNewTodo] = useState(title);                          // заводим useState для получения нового значения title->newTodo

    const inputHandler = (e) => {setNewTodo (e.target.value)}               // получить значение todo

    const saveButtonHandler = () => {todoUpdate (id, newTodo);              // вызвать функцию перезаписи нового значения todo в текущий объект
        setIsEditMode(false)}              // выключить режим editMode
// -----------------------------------------------------------------
    if (isEditMode) {
        return (
            <li style={listStyle}>
                <div>
                    <input onChange={inputHandler} value={newTodo}/>    {/* получить новое значение */}
                    <button onClick={saveButtonHandler}>                {/* записать новое значение */}
                        Сохранить                                           {/* надпись на кнопке */}
                    </button>
                </div>
            </li>
        )
    } else {
        return (

            <li style={listStyle}>
                {title}             {/* вывести поле title текущего объекта (элементам массива list) */}
                {isShowButton}      {/* вывести три кнопки, если на входе элемент не с id=234567890 */}
            </li>
        )
    }

//     return (
//         <div>
//         { isEditMode ? (
//             <div>
//                 <input onChange={inputHandler} value={newTodo}/>    {/* получить новое значение */}
//                 <button onClick={saveButtonHandler}>                {/* записать новое значение */}
//                 Сохранить                                           {/* надпись на кнопке */}
//                 </button>
//             </div>
//             ):(
//             <div>
//                 <li style={listStyle}>                              {/* выводить все элементы массива list со стилями, определёнными переменной listStyle */}
//
//                     {title}                                         {/* вывести поле title текущего объекта (элементам массива list) */}
//
//                     <button onClick={()=>markUnmark(id)}>           {/* назначить функцию markUnmark (Инвертирование поля done) кнопке */}
//                     {markUnmarkText}                                {/* с текстом "Отменить отметку" или "Сделано" */}
//                                                                     {/* в зависимости от значения поля done *!/*/}
//                     </button>
//
//                     <button onClick={()=>deleteCurrentTodo(id)}>    {/* назначить функцию deleteCurrentTodo (Удалить текущий объект) */}
//                     Удалить элемент                                 {/* кнопке с текстом "Удалить элемент" */}
//                     </button>
//
//                     <button onClick={()=>setIsEditMode(true)}> {/* включить режим editMode */}
//                     Редактировать                                       {/* надпись на кнопке */}
//                     </button>
//                 </li>
//             </div>) }
//         </div>
//         );
}