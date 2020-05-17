import React, { useContext, useEffect } from 'react'
import { StoreContext, TaskFormContext } from 'context/TaskStore';

import { Typography, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { AppTaskForm, AppTaskList } from 'components';
import AppSnackBar from 'components/AppSnackBar';
import { fetchTasks } from 'api/index';

const Homepage = () => {

  // USE CONTEXT API
  const [tasks, dispatch] = useContext(StoreContext);
  // eslint-disable-next-line no-unused-vars
  const [formState, formDispatch] = useContext(TaskFormContext);

  useEffect(() => {
    fetchAllTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAllTasks = async () => {
    const tasks = await fetchTasks();
    if (tasks) dispatch({ type: 'SET_TASKS', payload: { 'tasks': tasks } })
  }

  return (
    <section className="TaskManager" style={{ padding: '2em 0' }}>
      <AppSnackBar />
      {/* GRID CONTAINER */}
      <Grid container>
        {/* SHOW TASK LIST COMPONENT */}
        <Grid item xs={12} sm={10}>
          <div className="OpenTasks">
            <Typography gutterBottom variant="h6" component="h2" style={{ padding: '.5em 0' }}>Open Tasks:</Typography>
            <AppTaskList {...tasks} />

          </div>

          <div className="CompletedTasks">
            <Typography gutterBottom variant="h6" component="h2" style={{ padding: '.5em 0', marginTop: '1em' }}>Completed Tasks:</Typography>
            <AppTaskList  {...tasks} is_completed />
          </div>
        </Grid>
        {/* !SHOW TASK LIST COMPONENT */}

        {/* ADD TASK FLOATING ACTION BUTTON */}
        <Grid item xs={12} sm={2}>
          <div className="TaskManagerAddTask" style={{ textAlign: 'center', margin: '2em 0' }}>
            <Fab color="primary" aria-label="add Task" onClick={() => formDispatch({ type: 'TOGGLE_FORM' })}><AddIcon /></Fab>
          </div>
        </Grid>
        {/* !ADD TASK FLOATING ACTION BUTTON */}
      </Grid>
      {/* !GRID CONTAINER */}

      {/* FORM COMPONENT */}
      <div className='TaskManagerForm'>
        <AppTaskForm />
      </div>
      {/* !FORM COMPONENT */}

    </section>
  )
}


export default Homepage
