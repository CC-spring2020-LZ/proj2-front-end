import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO, EDIT_TODO,INIT_TODO} from '../action/todo'

function todos(state={todos:[]}, action){
    let todos = state.todos.splice(0);
    switch (action.type){
        case ADD_TODO: 
        //if this case, task won't have an id\
            todos.push(action.task);
            break;
        case REMOVE_TODO:
        //in this case, task has an id
            todos = todos.filter(todo=>todo._id !== action.todo._id);
            break;
        case TOGGLE_TODO:
        //in this case, task has an id
            for(let todo of todos){
                if(todo._id === action.todo._id)
                    todo.done = !todo.done;
            }
            break;
        case EDIT_TODO:
            for(let todo of todos){
                if(todo._id === action.todo._id)
                    todo.todo = action.todo.todo;
            }
            break;
        case INIT_TODO:
            return {todos: action.todo};
        default:
            return state;
    }
    return {todos: todos};
}

export default todos