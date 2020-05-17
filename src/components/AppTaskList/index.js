import React, { useContext } from 'react'
import { StoreContext } from 'context/TaskStore';
import AppTaskListItem from './AppTaskListItem/index';

const AppTaskList = (props) => {
    const { is_completed } = props;
    // eslint-disable-next-line no-unused-vars
    const [{tasks}, dispatch] = useContext(StoreContext);

    const taskList =
        (is_completed) ?
            tasks.filter(task => task.is_completed) :
            tasks.filter(task => !task.is_completed);

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
        task_name: 'Open Default Task',
        task_description: 'Default Task Description',
        is_completed: false,
        created_at: 'date',
        updated_at: 'date',
        due_date: 'date'
    },
    {
        id: 2,
        task_name: 'Open Default Task',
        task_description: 'Default Task Description',
        is_completed: true,
        created_at: 'date',
        updated_at: 'date',
        due_date: 'date'
    },
    ]
}

export default AppTaskList
