import {CircularProgress} from "@material-ui/core";

export default function LoadingCircle() {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress/>
    </div>
  );
}