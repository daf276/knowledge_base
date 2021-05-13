import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerText: {
    color: theme.palette.primary.contrastText,
  },
  headerLink: {
    color: theme.palette.primary.verylight,
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Link to="/" className={classes.link}>
              <Typography className={classes.headerLink} variant="h6" noWrap>
                Return to Main Page
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.headerText} variant="h6" align="center" noWrap>
              Knowledge Base
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}