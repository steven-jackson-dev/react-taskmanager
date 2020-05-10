import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import AppRoutes from 'global/AppRoutes.module'

const AppNavBar = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        React Task Manager
            </Typography>

                    {AppRoutes.map(route => {
                        if (route.inMenu) {
                            return <Link key={route.id} to={route.path} style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'white' }}>{route.name}</Button>
                            </Link>
                        }
                        return ''
                    })}
                </Toolbar>
            </AppBar>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default withRouter(AppNavBar)