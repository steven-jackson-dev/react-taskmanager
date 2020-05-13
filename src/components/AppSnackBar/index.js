import React, { useContext } from 'react'
import { TaskFormContext } from 'context/TaskStore';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AppSnackBar() {
    const classes = useStyles();
    const [{ isSnackBar }, formDispatch] = useContext(TaskFormContext);
    const { isOpen, message, type } = isSnackBar;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        formDispatch({ type: 'CLOSE_SNACKBAR' })
    };

    return (
        <div className={classes.root}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
