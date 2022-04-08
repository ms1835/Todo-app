import React,{useState} from 'react'


function Form(props) {
    const [name,setName] = useState('')

    function handleChange(e) {
        setName(e.target.value)
    }
    

    function handleSubmit(e) {
        e.preventDefault()
        props.addTask(name)
        setName('')
    }

    return(
        <form onSubmit={handleSubmit} className='container'>
        <div className="form-group row">
          <label htmlFor="new-todo-input" className="m-2">
            <h3>What needs to be done?</h3>
          </label>
          <div className='col-sm-8'>
            <input
              type="text"
              id="new-todo-input"
              className="form-control"
              name="text"
              autoComplete="off"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className='col-sm-2'>
            <button type="submit" className="btn btn-success mt-1">
              Add
            </button>
          </div>
        </div>
      </form>
    );
}
export default Form;