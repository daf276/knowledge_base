import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: '2rem',
    color: theme.palette.error.main
  },
}));

export default function ErrorMsg(data) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography className={classes.error} variant="body1" align="center" gutterBottom>
        {data.errorMsg}
      </Typography>
    </Container>
  )
}