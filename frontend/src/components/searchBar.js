import {Redirect} from "react-router-dom";
import {TextField} from "@material-ui/core";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  searchBar: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

export default function SearchBar() {
  const classes = useStyles();

  const [keyWord, setKeyWord] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) return <Redirect to={`/search?q=${keyWord}`}/>;

  return (
    <div className={classes.searchBar} align="center">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField variant="outlined" label="Search ..." id="searchbar"
                   value={keyWord}
                   onChange={e => setKeyWord(e.target.value)}/>
      </form>
    </div>
  );
}