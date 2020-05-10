import React, { useContext } from 'react'
import { StoreContext, TaskFormContext } from 'context/TaskStore';
import { Button, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Checkbox, FormControlLabel, Typography, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AppTaskListItem = (props) => {
    const { id, taskName, taskDescription, taskDueDate, isCompleted } = props
    const [state, dispatch] = useContext(StoreContext);
    const [formState, formDispatch] = useContext(TaskFormContext);

    const handleEditClick = (e) => {
        formDispatch({ type: 'SET_EDIT_MODE', payload: props })
    }
    const handleDelete = () => {
        formDispatch({ type: 'SHOW_SNACKBAR', payload: { snackBar: { isOpen: true, type: 'info', message: 'Task Deleted' } } })
        dispatch({ type: 'DELETE_TASK', payload: id })
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary style={{ color: isCompleted ? '#fff' : 'inherit', backgroundColor: isCompleted ? '#3f51b5' : 'inherit' }}
                expandIcon={<ExpandMoreIcon style={{ color: isCompleted ? '#fff' : 'inherit' }} />}
                aria-label="Expand"
                aria-controls="task-description-content-header"
                id="task-description-content-header">

                <FormControlLabel
                    aria-label="Is Completed"
                    control={<Checkbox
                        style={{ color: isCompleted ? '#fff' : 'inherit' }}
                        checked={isCompleted}
                        onChange={() => dispatch({ type: 'TOGGLE_COMPLETED', payload: id })} />
                    }
                    label={`${taskName}`} />
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" style={{ padding: '0.5em 0px 3em 0 ', textAlign: 'left' }}>{taskDescription}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {!isCompleted && <Button variant="contained" color="primary" onClick={handleEditClick} style={{ marginRight: '1em' }}>Edit</Button>}
                        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>

        </ExpansionPanel>
    )
}


AppTaskListItem.defaultProps = {
    id: 1,
    taskName: 'Default Task',
    taskDescription: 'Default Description',
    isCompleted: false,
    createdAt: 'date',
    updatedAt: 'date',
    dueDate: 'date'
}

export default AppTaskListItem
