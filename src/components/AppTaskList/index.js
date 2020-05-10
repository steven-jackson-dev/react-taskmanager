import React, { useContext } from 'react'
import AppTaskListItem from './AppTaskListItem/index';
import { StoreContext } from 'context/TaskStore';


const AppTaskList = (props) => {
    const { tasks, isCompleted } = props;
    const [state, dispatch] = useContext(StoreContext);

    const taskList =
        (isCompleted) ?
            tasks.filter(task => task.isCompleted) :
            tasks.filter(task => !task.isCompleted);

    return (
        <div>
            {taskList.map(task => {
                return <AppTaskListItem key={task.id} {...task} />
            })}
        </div>

    )
}

AppTaskList.defaultProps = {
    tasks: [{
        id: 1,
        taskName: 'Open Default Task',
        taskDescription: 'Default Task Description',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date',
        dueDate: 'date'
    },
    {
        id: 2,
        taskName: 'Open Default Task',
        taskDescription: 'Default Task Description',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date',
        dueDate: 'date'
    },
    {
        id: 3,
        taskName: 'Completed Default Task',
        taskDescription: 'Default Task Description',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date',
        dueDate: 'date'
    },
    {
        id: 4,
        taskName: 'Completed Default Task',
        taskDescription: 'Default Task Description',
        isCompleted: true,
        createdAt: 'date',
        updatedAt: 'date',
        dueDate: 'date'
    },
    {
        id: 5,
        taskName: 'Open Default Task',
        taskDescription: 'Default Task Description',
        isCompleted: false,
        createdAt: 'date',
        updatedAt: 'date',
        dueDate: 'date'
    },
    ]
}

export default AppTaskList
