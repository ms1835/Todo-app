import React,{useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import './App.css';
import {nanoid} from 'nanoid'

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks,setTasks] = useState(props.tasks)
  const [filter,setFilter] = useState('All')

  function addTask(name) {
    const newTask = {id:"todo-"+nanoid(),name:name,completed:false}
    setTasks([...tasks,newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task,completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function editTask(id,newName) {
    const editedTasklist = tasks.map(task => {
      if(id === task.id){
        return {...task,name:newName}
      }
      return task
    })
    setTasks(editedTasklist)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  const tasklist = tasks
  .filter(FILTER_MAP[filter])
  .map(task => 
  <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
 />)

 const filterList = FILTER_NAMES.map(name => (
   <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
    />
 ))
  
  const tasksNoun = tasklist.length !==1 ? 'tasks' : 'task'

  let headingText = `${tasklist.length} ${tasksNoun} remaining`
  if(filter === 'Completed'){
    headingText = `${tasklist.length} ${tasksNoun} completed`
  }
  if(filter === 'All'){
    headingText = `${tasklist.length} ${tasksNoun} noted`
  }
  
  
  
  return (
    <div className="card m-5 bg-info">
      <h1 className='text-center'><b>TODO</b></h1>
      <Form addTask={addTask} />
      <div className="btn-group m-3">
        {filterList}
      </div>
      <h2 id="list-heading" className='container'>
        {headingText}
      </h2>
      <ul
        // role="list"
        className="list-group list-unstyled"
        aria-labelledby="list-heading"
      >
        {tasklist}
      </ul>
    </div>
  );
}

export default App;

