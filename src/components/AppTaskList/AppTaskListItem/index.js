import React, { useContext } from 'react'
import { StoreContext, TaskFormContext } from 'context/TaskStore';
import { Button, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Checkbox, FormControlLabel, Typography, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AppTaskListItem = (props) => {
    const { id, task_name, task_description, is_completed, is_highlighted } = props
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(StoreContext);
    // eslint-disable-next-line no-unused-vars
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
            <ExpansionPanelSummary style={{ color: '#fff', backgroundColor: (is_highlighted) ? '#009688' : is_completed ? '#3f51b5' : '#404040' }}
                expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                aria-label="Expand"
                aria-controls="task-description-content-header"
                id="task-description-content-header">

                <FormControlLabel
                    aria-label="Is Completed"
                    control={<Checkbox
                        style={{ color: is_completed ? '#fff' : 'inherit' }}
                        checked={is_completed}
                        onChange={() => dispatch({ type: 'TOGGLE_COMPLETED', payload: id })} />
                    }
                    label={`${task_name}`} />
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" style={{ padding: '0.5em 0px 3em 0 ', textAlign: 'left' }}>{task_description}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {!is_completed && <Button variant="contained" color="primary" onClick={handleEditClick} style={{ marginRight: '1em' }}>Edit</Button>}
                        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>

        </ExpansionPanel>
    )
}


AppTaskListItem.defaultProps = {
    id: 1,
    task_name: 'Default Task',
    task_description: 'Default Description',
    is_completed: false,
    created_at: 'date',
    updated_at: 'date',
    due_date: 'date'
}

export default AppTaskListItem
