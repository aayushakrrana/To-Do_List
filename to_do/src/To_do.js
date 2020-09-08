import React, { useState } from 'react';
import list from './list.png';
import './To_do.css';
//import './To_do_back.css';

function To_do (){
    const [todos, setTodos] = useState([
       {
        content: 'Use "Enter" to add new task',
        isComplete: false,
       },
       {
           content: '"Delete" to remove task',
           isComplete: false,
       },
       {
           content: 'Select checkbox for completed task',
           isComplete: false,
       }
    ]);
    
    function handleKeyDown(e,i){
        if(e.key ==='Enter'){
            createTodoAtIndex(e,i);
        }
        if(e.key === 'Backspace' && todos[i].content === ''){
            e.preventDefault();
            return removeTodoAtIndex(i);
        }
        if(e.key === 'Delete' || todos[i].content === ''){
            e.preventDefault();
            return removeTodoAtIndex(i);
        }
    }

    function removeTodoAtIndex(i){
        if(i===0 && todos.length ===1) return;
        setTodos(todos => todos.slice(0,i).concat(todos.slice(i+1,todos.length)));
        setTimeout(() => {
            document.forms[0].elements[i-1].focus();
        },0);
    }


    function createTodoAtIndex(e,i){
        const newTodos = [...todos];
        newTodos.splice(i+1, 0, {
            content:'Add Task',
            isComplete:false,
        });

        setTodos(newTodos);
        setTimeout(() => {
            document.forms[0].elements[i+1].focus();
        },0);
    }

    function updateTodoAtIndex(e,i){
        const newTodos = [...todos];
        newTodos[i].content = e.target.value;
        setTodos(newTodos);
    }

    function toggleTodoCompleteAtIndex(index)
    {
        const tempTodos=[...todos];
        tempTodos[index].isComplete =!tempTodos[index].isComplete;
        setTodos(tempTodos);
    }
    
    return (
        <div className="app">
          <div className="header">
            <img src={list} className="logo" alt="logo" />
            <h1>Task List</h1>
          </div>
          <form className="todo-list">
            <ul>
                {todos.map((todo, i) =>(
                    
                        <div className={`todo ${todo.isComplete && 'todo-is-completed'}`}>
                            <div className={'checkbox'} onClick={()=> toggleTodoCompleteAtIndex(i)}>
                            {todo.isComplete && (
                                <span>&#x2714;</span>
                            )}
                            </div>
                            
                    <input type="text" placeholder={todo.content} onKeyDown={e => handleKeyDown(e, i)} onChange={e => updateTodoAtIndex(e,i)}/>
                    
                            </div>
                            
                     
                )
                )}
              
            </ul>
          </form>
        </div>
      );
}
    
export default To_do;