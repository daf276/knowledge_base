import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline/>
      <footer className={classes.footer}>
        <Container style={{display: 'flex', justifyContent: 'right'}}>
          <Button size="small" color="primary"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Back to top
          </Button>
        </Container>
      </footer>
    </div>
  );
}