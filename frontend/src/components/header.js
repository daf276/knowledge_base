import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Link to="/">
                                <Typography variant="h6" noWrap>
                                    Return to Main Page
                                </Typography>
                                </Link>
                            </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="center" noWrap>
                                Knowledge Base
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;