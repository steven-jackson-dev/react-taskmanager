import React, { createContext, useReducer } from 'react'
import { createTask, deleteTask, updateTask } from 'api/index'
import { DATE_TODAY } from 'utils/common/index';

export const StoreContext = createContext([]);
export const TaskFormContext = createContext([]);

function reducer(state, action) {

    switch (action.type) {
        case 'TOGGLE_COMPLETED':
            return {
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload) {
                        task.is_completed = !task.is_completed
                        updateTask(task)
                        return task
                    }
                    return task
                })
            }
        case 'ADD_TASK':
            createTask(action.payload)
            action.payload.id = Math.floor(Math.random() * 999);
            return {
                tasks: [...state.tasks, { ...action.payload }]
            }
        case 'SET_TASKS':
            return {
                tasks: [...state.tasks, ...action.payload.tasks]
            }
        case 'UPDATE_TASK':
            updateTask(action.payload)

            return {
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {

                        return action.payload
                    }
                    return task
                })
            }
        case 'DELETE_TASK':
            deleteTask(action.payload)
            return { tasks: state.tasks.filter(task => task.id !== action.payload) }
        default:
            return state;
    }
}

function formReducer(state, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SET_EDIT_MODE':
            newState.task = action.payload;
            newState.isOpen = true;
            newState.isEdit = true;
            console.log("formReducer -> newState", newState)
            return newState
        case 'TOGGLE_FORM':
            newState.isOpen = !state.isOpen
            newState.isEdit = false;
            return newState
        case 'SHOW_SNACKBAR':
            newState.isSnackBar.isOpen = true
            newState.isSnackBar.type = action.payload.snackBar.type
            newState.isSnackBar.message = action.payload.snackBar.message
            return newState
        case 'CLOSE_SNACKBAR':
            newState.isSnackBar.isOpen = false
            return newState
        case 'RESET_FORM_STATE':
            return initialFormState
        default:
            return state;
    }

}

const TaskStore = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [formState, formDispatch] = useReducer(formReducer, initialFormState)
    return (
        <TaskFormContext.Provider value={[formState, formDispatch]}>
            <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
        </TaskFormContext.Provider>
    )
}

const initialFormState = {
    task: {},
    isEdit: false,
    isOpen: false,
    isSnackBar: {
        isOpen: false,
        type: 'success',
        message: 'Default Snackbar Message'
    }
}

const initialState = {
    tasks: [{
        id: Math.floor(Math.random() * 999),
        task_name: 'Hello From Steven Jackson',
        task_description: 'Hi there, thank you for checking out my small little project. I know things are rather basic and definitely not flushed out, however I am just tinkering around with React and do not plan to actually use this version. ',
        is_completed: false,
        is_highlighted: true,
        created_at: DATE_TODAY(),
        updated_at: DATE_TODAY(),
    },
    {
        id: Math.floor(Math.random() * 999),
        task_name: 'Project Info',
        task_description: 'This project is connected to my private API that I am currently building. You are welcome to leave your mark here or play around. End Point: http://178.128.37.229/tasks/. Kind Regards, Steven',
        is_completed: false,
        is_highlighted: true,
        created_at: DATE_TODAY(),
        updated_at: DATE_TODAY(),
    }]
}

export default TaskStore
