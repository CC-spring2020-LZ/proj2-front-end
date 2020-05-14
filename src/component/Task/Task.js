import React from 'react'
import './Task.css'

function editTodo(todo, editTodo, id) {
    var oldTask = todo.innerHTML;
    var newTodoInput = document.createElement('input');
    newTodoInput.type = 'text';
    newTodoInput.value = oldTask;
    newTodoInput.onblur = function() {
        todo.innerHTML = this.value === oldTask ? oldTask : this.value;
        todo.setAttribute("ondblclick", "ShowElement(this);");
        editTodo({todo:todo.innerHTML, _id:id});
    }
    todo.innerHTML = '';
    todo.appendChild(newTodoInput);
    newTodoInput.setSelectionRange(0, oldTask.length);
    newTodoInput.focus();
    newTodoInput.parentNode.setAttribute("ondblclick", "");
}

function Task(props){
    let style = {
        textDecoration: (props.done)? 'line-through' : 'none'
    }
    return(
        <div className="todo"  onClick={()=>props.onClick()}>
            <span onDoubleClick={(e)=>editTodo(e.target, props.editTodo, props._id)} style={style}>{props.todo}</span>
            <button className='deleteBtn' onClick={(e)=>{e.stopPropagation();props.deleteTodo({todo:props.todo, _id:props._id})}}><span>delete</span></button>
        </div>
    )
}

export default Task