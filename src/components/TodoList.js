import React,{useState} from 'react';
import '../App.css'
import { ACTIONS } from '../App';


function TodoList({todo,dispatch}) {

  const [currentTodo, setCurrentTodo] = useState("list");
  const [text,setText]=useState(todo.name);
  const [checked, setChecked] = useState(todo.checked)
  
  return (
    <div>
      {
        currentTodo === "list" ?
        <div id="todoList">
          <input 
            type="checkbox" 
            defaultChecked={checked}
            onChange={()=>setChecked(!checked)} 
            onClick={()=>dispatch({type:ACTIONS.TOGGLE_TODO, payload:{id:todo.id}})}
          />
          <p id="todoname" 
            style={{textDecoration:todo.checked?"line-through":''}}
          >
            {todo.name}
          </p>
          <button onClick={()=>setCurrentTodo(dispatch({type:ACTIONS.EDIT_TODO,payload:{id:todo.id, name:todo.name}}))} type="button" id="editBtn">
            <i className="fa fa-pencil"></i>
          </button>
          <button onClick={()=>dispatch({type:ACTIONS.DELETE_TODO, payload:{id:todo.id}})} type="button" id="deleteBtn">
            X
          </button>
        </div> :
        <div id="editTodo">
          <input  value={text} onChange={e => setText(e.target.value)} id="editedtodo"/>
          <button onClick={()=>{dispatch({type:ACTIONS.EDIT_TODO,payload:{id:todo.id,name:text}});setCurrentTodo("list")}} id="saveBtn">Save</button>
          <button onClick={()=>setCurrentTodo("list")} id="cancelBtn">Cancel</button>
        </div>
      }
      
    </div>
  );
}

export default TodoList;