import React, {useState,useReducer,useRef, useEffect} from 'react';
import './App.css';
//import AddTodo from './Components/AddTodo';
import TodoList from './components/TodoList';
import TodosCounter from './components/TodosCounter';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  EDIT_TODO: "edit-todo",
  DELETE_TODO: "delete-todo"
}

function reducer(todos,action){
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      todos = [...todos,addTodo(action.payload.name)]
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    
    case ACTIONS.TOGGLE_TODO:
      todos = todos.map(todo=>{
        if(todo.id === action.payload.id){
          return {...todo,checked: !todo.checked}
        }
        return todo;
      })
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;

    case ACTIONS.DELETE_TODO:
      todos = todos.filter(todo => todo.id !== action.payload.id);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    
    case ACTIONS.EDIT_TODO:
      todos = todos.map(todo=>{
        if(todo.id === action.payload.id){
          todo.name = action.payload.name;
          return {...todo, name:todo.name}
        }
        return todo;
      })
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
      
      
    default:
      return todos;
  }
  
}

function addTodo(name){
  return {id:Date.now(), name:name, checked:false};
}

//const initialState = JSON.parse(localStorage.getItem('todos')) || [];

function App() {
  //var today = new Date();
  var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
  //var dateState = today.toLocaleDateString('en-IN',options);
  
  const [date,setDate] = useState(new Date().toLocaleDateString('en-IN',options))
  
  const [todos,dispatch] = useReducer(reducer,initialState)
  const [todoName,setTodoName] = useState('')

  const inputFocusRef = useRef(null);

  useEffect(()=>{
    inputFocusRef.current.focus();
  })

  const handleTodoForm = (e) =>{
    e.preventDefault();
    if(todoName === ''){
      alert('Please Enter Your Todo...')
    }else{
      dispatch({type:ACTIONS.ADD_TODO, payload:{name:todoName}});
      setTodoName('');
    }
    
  }

  console.log(todos);

  return (
    <div className="App text-center">
        <h2>React TODO App</h2>
       
        <section className="date-section">
          <h4 className="date text-center" onChange={e=>setDate(e.target.value)}>{date}</h4>
        </section>

        <form onSubmit={handleTodoForm} id="todoForm">
          <input
            type="text"
            id="todoInput"
            placeholder="Enter Your TODO..."
            value={todoName}
            onChange={e=>setTodoName(e.target.value)}
            ref={inputFocusRef}
          />
          <button onClick={handleTodoForm} type="button" id="addTodoBtn">
            <i className="fa fa-plus"></i>
          </button>
        </form>

        <TodosCounter todos={todos}/>

        <h3>Your TODO List</h3>
        
        {
          todos.map(todo=>{
            return <TodoList key={todo.id} todo={todo} dispatch={dispatch}/>
          })
        }

    </div>
  );
}

export default App;

