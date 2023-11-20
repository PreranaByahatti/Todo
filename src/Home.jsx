import React, {useEffect, useState} from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs"
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'


function Home(){
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/get")
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put("http://localhost:3001/update/"+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    
    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/delete/"+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err)) 
    }

    return (
        <div className='home'>
        <h2>Todo List</h2>
        
        <Create />
        
        
        {
            todos.length === 0 
            ?
                <div><h2>No Record</h2></div>
            :
            todos.map(todo => (
                <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                    {todo.done ? <BsCheckCircleFill className='icon'></BsCheckCircleFill>
                    :
                    <BsCircleFill className='icon'></BsCircleFill>
                    }
                                           
                    <ul>
                                        
                  <li className={todo.done ? "line_through" : ""}> {todo.task} </li>
                                      </ul>
                       
                </div>
                <div>
                    <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}></BsFillTrashFill></span>
                </div>
                </div>
             ) )
        } 
        
        </div>
    )
}

export default Home;