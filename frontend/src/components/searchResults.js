import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {SearchArticles, SearchCategories, SearchSections} from "../hooks/loadData";
import queryString from 'query-string'
import {
  Link,
  useLocation
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import LoadingCircle from "./loadingCircle";

const useStyles = makeStyles((theme) => ({
  results: {
    marginTop: '4rem',
  },
}));

export default function SearchResults() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.results} maxWidth="md">
        <Grid container direction="column" spacing={2}>
          <Results/>
        </Grid>
      </Container>
    </div>
  )
}

function Results() {
  const {results, loading, error} = LoadSearchResults();
  if (loading) return <LoadingCircle/>;
  if (error || !results || results.length === 0) return <NoResults/>;

  const uniqueResults = deduplicate(results);
  return (uniqueResults.map(result => (
    <Grid item key={result.id} xs={12}>
      <Link to={`/${result.category.title}/${result.title}`}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {result.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )));
}

function deduplicate(results) {
  console.log(results);
  if (!results) return null;

  let seen = {};
  return results.filter(function (item) {
    let id = item.id;
    return seen.hasOwnProperty(id) ? false : (seen[id] = true);
  })
}

function LoadSearchResults() {
  //TODO make it possible to search for sections again
  const keyWord = queryString.parse(useLocation().search).q;

  const articles = SearchArticles(keyWord);
  const categories = SearchCategories(keyWord);

  if (articles.error || categories.error) return {results: null, loading: false, error: true};
  if (articles.loading || categories.loading) return {results: null, loading: true, error: false};

  const results = [];

  categories.data.forEach(function (category) {
    category.articles.forEach(function (article) {
      results.push(article);
    })
  })

  articles.data.forEach(function (article) {
    results.push(article);
  })

  return {results: results, loading: false, error: false}
}

function NoResults() {
  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        No Search Results found :(
      </Typography>
    </Container>
  )
}