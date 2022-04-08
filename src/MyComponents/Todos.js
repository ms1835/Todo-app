import React from "react";
import {TodoItem} from './TodoItem';

export const Todos=(props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto"
    }
    return (
        <div className="container" style={myStyle}>
        <h3 className="my-3 text-secondary">TODOS LIST</h3>
        {props.todos.length===0? "Yay! No Todos to perform":  
            props.todos.map((todo)=>{
                console.log(todo.id);
                return (<TodoItem todo={todo} key={todo.id} onDelete={props.onDelete}/>   
                )
            })
              } 
    </div> 
    )
}