import React,{useState} from "react";

export default function Todo(props) {
  const [isEditing,setEditing] = useState(false)
  const [newName,setNewName] = useState('')

  function handleChange(e){
    setNewName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    props.editTask(props.id,newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className='col-12'>
          <label className="mt-3" htmlFor={props.id}>
            <h5>New name for {props.name} </h5>
          </label>
        </div>
        <div className='col-sm-8'>
          <input 
            id={props.id} 
            className="form-control" 
            type="text" 
            value={newName}
            onChange={handleChange} 
          />
        </div>
        
      </div>
      <div className="btn-group p-2">
        <button 
          type="button" 
          className="btn btn-secondary rounded" 
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn-secondary rounded mx-2">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="container">
      <div className="content mt-3">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="mx-3" htmlFor={props.id}>
            <strong>{props.name}</strong>
          </label>
        </div>
        <div className="btn-group p-2">
          <button type="button" className="btn btn-primary rounded" onClick={() => setEditing(true)}>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn-danger rounded mx-2"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );

    return(
        <li className="wrapper">
          {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}