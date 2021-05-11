import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {SearchArticles, SearchCategories, SearchSections} from "../hooks/search";
import queryString from 'query-string'
import {
    Link,
    useLocation
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SearchBar from "./searchBar";

export default function SearchResults() {
    return (
        <div>
            <SearchBar/>
            <Container maxWidth="md">
                <Grid container direction="column" spacing={2}>
                    <Results/>
                </Grid>
            </Container>
        </div>
    )
}

function Results() {
    const uniqueResults = uniqeBy(LoadSearchResults(), JSON.stringify);

    return (uniqueResults && uniqueResults.map(result => (
        <Grid item xs={12}>
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
    )))

}

function uniqeBy(array, key) {
    if(!array) return null;
    let seen = {};
    return array.filter(function(item) {
        let k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

function LoadSearchResults() {
    const keyWord = queryString.parse(useLocation().search).q;

    const articles = SearchArticles(keyWord);
    const sections = SearchSections(keyWord);
    const categories = SearchCategories(keyWord);

    if (articles.error || sections.error || categories.error) return null;
    if (articles.loading|| sections.loading || categories.loading) return null;

    const results = [];

    sections.data.forEach(function (section) {
        results.push(section.article);
    })

    categories.data.forEach(function (category) {
        category.articles.forEach(function (article) {
            results.push(article);
        })
    })

    articles.data.forEach(function (article) {
        results.push(article);
    })

    return results;
}