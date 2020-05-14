import React from 'react'
import NewTask from './NewTask'
import TaskList from './TaskList'

function Panel(props){
    return(
        <div>
            <NewTask />
            <TaskList />
        </div>
    )
}

export default Panel