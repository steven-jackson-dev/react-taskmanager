import React, { useContext, useEffect, forwardRef } from 'react';
import { StoreContext, TaskFormContext } from 'context/TaskStore';
import { DATE_TODAY, parseDate } from 'utils/common/index';
import useInputState from 'utils/hooks/useInputState';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppTaskForm() {

    const [state, dispatch] = useContext(StoreContext);
    const [formState, formDispatch] = useContext(TaskFormContext);

    const [inputTaskName, setInputTaskName] = useInputState('');
    const [inputTaskDesc, setInputTaskDesc] = useInputState('');
    const [inputTaskDueDate, setInputTaskDueDate] = useInputState(DATE_TODAY);

    // SET PAYLOAD FOR REDUCERS
    const payload = {
        'id': (formState.task.id) ? formState.task.id : 0,
        'taskName': inputTaskName,
        'taskDescription': inputTaskDesc,
        'taskDueDate': inputTaskDueDate,
    }

    useEffect(() => {

        // IF FORM IS IN EDIT MODE SET INPUT VALUES OR SET TO BLANK TO ADD A NEW TASK
        if (formState.isEdit) {
            const { taskName, taskDescription, taskDueDate } = formState.task;
            setInputTaskName(taskName)
            setInputTaskDesc(taskDescription)
            setInputTaskDueDate(taskDueDate)
        } else {
            setInputTaskName('')
            setInputTaskDesc('')
            setInputTaskDueDate(DATE_TODAY)
        }
    }, [formState])

    const validateInputs = () => {
        if (!inputTaskName || !inputTaskDesc || !inputTaskDueDate) {
            formDispatch({ type: 'SHOW_SNACKBAR', payload: { snackBar: { isOpen: true, type: 'error', message: 'Fields cannot be empty' } } })
        } else {
            handleSubmitTask()
        }
    }

    const handleSubmitTask = () => {

        // IF FORM IS IN EDIT MODE. UPDATE THE TASK OR ADD A NEW TASK
        if (formState.isEdit) {
            dispatch({ type: 'UPDATE_TASK', payload: payload })
            formDispatch({ type: 'SHOW_SNACKBAR', payload: { snackBar: { isOpen: true, type: 'success', message: 'Task Updated Successfully' } } })

            handleClose()
            formDispatch({ type: 'RESET_FORM_STATE' })
        } else {
            dispatch({ type: 'ADD_TASK', payload: payload })
            formDispatch({ type: 'SHOW_SNACKBAR', payload: { snackBar: { isOpen: true, type: 'success', message: 'Task Added Successfully' } } })
            handleClose()
        }

    }

    const handleClose = () => {
        // TOGGLE THE DIALOG WITH THE TASK FORM
        formDispatch({ type: 'TOGGLE_FORM' })
    };



    return (
        <div>

            <Dialog
                open={formState.isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="task-manager-form"
                aria-describedby="task-manager-form-dialog">
                <DialogTitle id="task-manager-form-dialog-title">{"Add New Task"}</DialogTitle>
                <DialogContent>

                    <TextField id="taskName" label="Task Name" onChange={setInputTaskName} value={inputTaskName} fullWidth required />

                    <TextField
                        id="taskDescription"
                        label="Task Description"
                        onChange={setInputTaskDesc}
                        multiline
                        rows={4}
                        fullWidth
                        style={{ margin: '1.5em 0' }}
                        value={inputTaskDesc}
                        required
                    />

                    <TextField
                        id="taskDueDate"
                        onChange={setInputTaskDueDate}
                        label="Due Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: '1em 0' }}
                        defaultValue={(inputTaskDueDate) ? parseDate(inputTaskDueDate) : DATE_TODAY()}

                        required
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={validateInputs} type='submit' color="primary" variant='contained'>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}