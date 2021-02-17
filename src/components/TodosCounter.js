import React from 'react';

function TodosCounter({todos}){
    const total = todos.length;
    const completed = todos.filter(todo=>todo.checked === true).length;
    const remaining = todos.filter(todo=>todo.checked === false).length;
    return(
        <div id="todoscounter">
            <p className="text-primary">Total: {total}</p>
            <p className="text-success">Completed: {completed}</p>
            <p className="text-danger">Remaining: {remaining}</p>
        </div>
    );
}
export default TodosCounter;