import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
    Link,
    useParams,
} from "react-router-dom";
import CategoryTree from "./categoryTree";
import {LoadCategory, LoadSubCategories} from "../hooks/loadCategories";
import {LoadArticles} from "../hooks/loadArticles";
import SearchBar from "./searchBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    articles: {
        marginTop: '2rem',
    },
}));

export default function Category() {
    return (
        <div>
            <SearchBar/>
            <CategoryTree/>
            <CategoryTitleAndDescription/>
            <SubCategories/>
            <Articles/>
        </div>
    );
}

function CategoryTitleAndDescription() {
    const category = LoadCategory(useParams().categoryTitle);
    if (category.error) return <div>Error</div>;
    if (category.loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {category.data.title}
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                {category.data.description}
            </Typography>
        </Container>
    )
}

function SubCategories() {
    const subCategories = LoadSubCategories(useParams().categoryTitle);
    if (subCategories.error) return <div>Error</div>;
    if (subCategories.loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                {
                    subCategories.data.map(category => (
                        <Grid item xs={4}>
                            <Link to={`/${category.title}`}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {category.title}
                                        </Typography>
                                        <Typography variant="body1">
                                            {category.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

function Articles() {
    const classes = useStyles();

    const articles = LoadArticles(useParams().categoryTitle);
    if (articles.error) return <div>Error</div>;
    if (articles.loading) return <div>Loading...</div>;

    return (
        <Container className={classes.articles} maxWidth="md">
            <Grid container direction="column" spacing={2}>{
                articles.data.map(article => (
                    <Grid item xs={12}>
                        <Link to={`/${article.category.title}/${article.title}`}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {article.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>

                ))}
            </Grid>
        </Container>
    )
}
