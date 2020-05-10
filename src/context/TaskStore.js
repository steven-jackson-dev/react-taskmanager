import React, { createContext, useReducer } from 'react'
import { DATE_TODAY } from 'utils/common/index';

export const StoreContext = createContext([]);
export const TaskFormContext = createContext([]);

function reducer(state, action) {

    switch (action.type) {
        case 'TOGGLE_COMPLETED':
            return {
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload) {
                        task.isCompleted = !task.isCompleted
                        return task
                    }
                    return task
                })
            }
        case 'ADD_TASK':
            action.payload.id = Math.floor(Math.random() * 999);
            return {
                tasks: [...state.tasks, { ...action.payload }]
            }
        case 'UPDATE_TASK':
            return {
                tasks: state.tasks.map(task => {
                    console.log("reducer -> task", task)

                    if (task.id === action.payload.id) {

                        return action.payload
                    }
                    return task
                })
            }
        case 'DELETE_TASK':
            return { tasks: state.tasks.filter(task => task.id !== action.payload) }
        default:
            return state;
    }
}

function formReducer(state, action) {
    console.log("formReducer -> action", action)
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
        taskName: 'New Task',
        taskDescription: 'Default Task Description',
        isCompleted: false,
        createdAt: DATE_TODAY(),
        updatedAt: DATE_TODAY(),
        taskDueDate: DATE_TODAY()
    },
    {
        id: Math.floor(Math.random() * 999),
        taskName: 'Completed Task',
        taskDescription: 'Default Task Description',
        isCompleted: true,
        createdAt: DATE_TODAY(),
        updatedAt: DATE_TODAY(),
        taskDueDate: DATE_TODAY()
    }]
}

export default TaskStore
