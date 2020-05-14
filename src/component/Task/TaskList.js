import React from 'react';
import {connect} from 'react-redux'
import Task from './Task'
import {toggleTodo, deleteTodo, editTodo} from '../../action/todo'

function TaskList(props){
    const taskListDom = props.todos.map((todo)=>
        (<Task key={todo._id} 
            editTodo={props.editTodo(props.userID)} 
            deleteTodo={props.deleteTodo(props.userID)} 
            onClick={(e)=>{props.toggleTodo(props.userID)(todo)}} 
            {...todo} />));
    return(
        <div className='tasklist'>
            {taskListDom}
        </div>
    )
}

function mapStateToProps(state){
    return {
        todos: state.todos.todos,
        userID: state.user.userID
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleTodo: (id)=>{
            return (todo)=>{
                let url = `http://localhost:3001/api/todos/user/${id}/${todo._id}`
                fetch(url, {
                    method: "PUT",
                    mode: "cors",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({...todo, done: !todo.done})
                })
                .then(response=>response.json())
                .then(data=>{
                    if(data.error)
                        throw new Error(String(data.error.message))
                    dispatch(toggleTodo(todo))
                })
                .catch(error=>{
                    alert(error);
                })
            }
        },
        deleteTodo: (id)=>{
            return (todo) =>{
                let url = `http://localhost:3001/api/todos/user/${id}/${todo._id}`
                fetch(url, {
                    method: "DELETE",
                    mode: "cors",
                    credentials:"include"
                })
                .then(response=>{
                    if(response.ok)
                        dispatch(deleteTodo(todo))
                    else throw new Error("fail to delete this todo, it‘s probably due to some internal server error.")
                })
            }
        },
        editTodo: (id)=>{
            return (todo)=>{
                let url = `http://localhost:3001/api/todos/user/${id}/${todo._id}`
                fetch(url, {
                    method: "PUT",
                    mode: "cors",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(todo)
                })
                .then(response=>response.json())
                .then(data=>{
                    if(data.error)
                        throw new Error(String(data.error.message))
                    dispatch(editTodo(todo))
                })
                .catch(error=>{
                    alert(error);
                })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)