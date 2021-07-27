import React from 'react'

export default function FilterButton(props) {
    return(
        <button 
          type="button" 
          className="btn rounded bg-warning m-1 border" 
          aria-pressed={props.isPressed}
          onClick={() => props.setFilter(props.name)}
        >
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    );
}