import React, {useState} from 'react';
import {connect} from 'react-redux'
import {addTodo} from '../../action/todo'

function NewTask(props){
    let clickAddTodo = ()=>{
        if(input.length > 0)
            props.addTodo(props.userID,{todo:input});
        setInput("");
    }

    const [input, setInput] = useState("");
    return (
        <div className='newTask'>
            <input className='newTaskInput' type = 'text' value={input} onChange ={(e)=>{setInput(e.target.value)}}></input>
            <button className="addBtn" onClick={clickAddTodo}>New Task</button>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        userID: state.user.userID
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        addTodo: (id,task)=>{
            let url = 'http://localhost:3001/api/todos/user/' + id
            fetch(url, {
                method:"POST",
                credentials : 'include',
                mode: "cors",
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(task)
            })
            .then(response=>response.json())
            .then(task=>{
                if(task.error)
                    throw new Error(String(task.error.message))
                dispatch(addTodo(task))
            })
            .catch(error=>console.log(error))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewTask);