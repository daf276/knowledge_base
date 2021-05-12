import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function ErrorMsg(data) {
  return (
    <Container maxWidth="md">
      <Typography variant="body1" align="center" color="error" gutterBottom>
        {data.errorMsg}
      </Typography>
    </Container>
  )
}