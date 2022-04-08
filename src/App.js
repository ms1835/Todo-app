import React,{useState,useEffect} from "react";
import {Todos} from './MyComponents/Todos';
import {Header} from './MyComponents/Header';
import {Footer} from './MyComponents/Footer';
import './App.css';
import { AddTodo } from "./MyComponents/AddTodo";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  
  const onDelete=(todo)=> {
    console.log("I am onDelete",todo);
    setTodos(todos.filter((e) => {
      return e!==todo;
    }));
    console.log("deleted",todos);
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const addTodo = (title,desc) => {
    let id;
    if(todos.length===0)
        id=1;
    else{
        id = todos[todos.length-1].id +1;
    }
    const myTodo = {
        id:id,
        title:title,
        desc:desc
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }

const [todos,setTodos] = useState(initTodo);
useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
},[todos])

  return (
    <>
    <Header title="My Todos List"/>
    <AddTodo addTodo={addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    <Footer />
    </>
  );
  
}

export default App;



