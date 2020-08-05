import React,{useState} from 'react';
export default function TodoCreateForm({create}) {
// -----------------------------------------------------------------

    const [inputValue, setInputValue] = useState('Построить работающий фотонный звездолёт в 2075 году');   // useState со значением по умолчанию
    const inputOnChange = (e) => {setInputValue(e.target.value)};                                       // получить только e.target.value

    // const inputOnChange = (e) => {console.log(e.target.value); setInputValue(e.target.value)};       // вариант для отладки

    const onCreate = ( ) => {create(inputValue);
        setInputValue('Построить работающий фотонный звездолёт в 2075 году');}

// -----------------------------------------------------------------
    return (
        <div>
            <input
                type="text"
                value={inputValue}                    // inputValue - переменная, куда будет занесён введённый в окне текст
                onChange={inputOnChange}              // onChange -  обработчик
            />
            <button onClick={onCreate}>Новая цель</button>
        </div>
    );
}