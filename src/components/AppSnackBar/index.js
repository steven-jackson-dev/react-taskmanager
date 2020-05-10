import React, { useContext } from 'react'
import { TaskFormContext } from 'context/TaskStore';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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
    const [formState, formDispatch] = useContext(TaskFormContext);
    const { isOpen, message, type } = formState.isSnackBar;

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
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </div>
    );
}
