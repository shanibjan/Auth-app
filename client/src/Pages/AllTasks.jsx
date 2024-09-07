import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function AllTasks() {
    const location = useLocation()


    const [task, setTask] = useState([])
    const [title, setTitle] = useState()
    const [description, seteDescription] = useState()
    const [taskId, setTaskId] = useState()
   const[filter,setFilter]=useState('')
    console.log(filter);
    

    const completed=task.filter((c)=>{
        return c.status==true
    })
    const uncomplete=task.filter((c)=>{
        return c.status == false
    })
    

    const [updateButton, setUpdateButton] = useState(false)


    let userId = location.state._id






    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:7000/api/v1/task/get-users/${location.state._id}`
            );
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };




    useEffect(() => {
        fetchData()
    }, [])

    const addTask = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/task/add-task', { title, description, userId })
            console.log(res.data);
            if (res.data.success) {
                window.alert(res.data.message)

            } else {
                window.alert(res.data.message)
            }
            setTitle("")
            seteDescription("")
            fetchData()
        } catch (error) {
            window.alert(error.response.data.error);

        }
    }
    const changeTask = async (task) => {
        try {
            setTitle(task.title)
            seteDescription(task.description)
            setTaskId(task._id)
            setUpdateButton(true)
            const update=document.querySelector('.user-add-head')
            console.log(update);
            update.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } catch (error) {
            console.log(error);

        }
    }


    const updateTask = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/task/update/${taskId}`, { title, description, userId })
            console.log(res.data);
            if (res.data.success) {
                window.alert(res.data.message)

            } else {
                window.alert(res.data.message)
            }
            fetchData()
        } catch (error) {
            window.alert(error.response.data.error);
        }
        setUpdateButton(false)
        setTitle("")
        seteDescription("")
    }


    const deleteTask = async (task) => {

        try {

            const res = await axios.delete(`/api/v1/task/delete/${task}`)
            console.log(res.data);
            window.alert(res.data.message)
            fetchData()
        } catch (error) {
            window.alert(error.response.data);

        }
    }

    const handleChange = async (task) => {
        try {
            console.log(task._id);

            const status = !task.status
            console.log(status);

            const res = await axios.put(`/api/v1/task/update/${task._id}`, { status })
            console.log(res.data);
            fetchData()
        } catch (error) {

        }


    }


    return (
        <>
        <div className='user-add-head' >
        {updateButton ?  <div className='user-add-task' >
          <h1>Add Your Task</h1>
          <label htmlFor="">Title</label>
          <br />
          <input type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          <label htmlFor="">Description</label>
          <br />
          <textarea name="" id="" value={description} onChange={(e) => seteDescription(e.target.value)} ></textarea>
          <br />
          

          <div className="buttons">
            <button className='button-add' onClick={addTask} >Add Task</button>
             <button className='button-add' onClick={updateTask} >Update Task</button>
          </div>

        </div> : null}
        </div>
            <div className='options'>
                <label htmlFor="">Filter Tasks </label>
                <select name="" id="" onChange={(e)=>setFilter(e.target.value)} >
                    <option value="">All</option>
                    <option value="complete">Completed</option>
                    <option value="not">Not Completed</option>
                </select>
            </div>
            <div>
                <h1 className='task-head' >Your Tasks</h1>
                {filter=="complete"?(completed.map((t)=>{
                    return(
                        < div className='user-div' >
                            <h1>{t.title}</h1>
                            <h4>{t.description}</h4>
                            <h4>Task Status: <input
                                type="checkbox"
                                checked={t.status}
                                onChange={() => handleChange(t)}
                            />
                                {t.status ? "Completed" : "Not Completed"}</h4>

                            <div className='buttons' >
                                <button className='button-add' onClick={() => changeTask(t)} >Update Task</button>
                                <button className='button-add' onClick={() => deleteTask(t._id)} >Delete Task</button>
                            </div>

                        </div>
                    )
                })):filter=="not"? (uncomplete.map((t)=>{
                    return(
                        < div className='user-div' >
                            <h1>{t.title}</h1>
                            <h4>{t.description}</h4>
                            <h4>Task Status: <input
                                type="checkbox"
                                checked={t.status}
                                onChange={() => handleChange(t)}
                            />
                                {t.status ? "Completed" : "Not Completed"}</h4>

                            <div className='buttons' >
                                <button className='button-add' onClick={() => changeTask(t)} >Update Task</button>
                                <button className='button-add' onClick={() => deleteTask(t._id)} >Delete Task</button>
                            </div>

                        </div>
                    )
                })):(task.map((t, i) => {

                    return (

                        < div className='user-div' >
                            <h1>{t.title}</h1>
                            <h4>{t.description}</h4>
                            <h4>Task Status: <input
                                type="checkbox"
                                checked={t.status}
                                onChange={() => handleChange(t)}
                            />
                                {t.status ? "Completed" : "Not Completed"}</h4>

                            <div className='buttons' >
                                <button className='button-add' onClick={() => changeTask(t)} >Update Task</button>
                                <button className='button-add' onClick={() => deleteTask(t._id)} >Delete Task</button>
                            </div>

                        </div>

                    )


                }))}

                
            </div>
        </>
    )

}


export default AllTasks