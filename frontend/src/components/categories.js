import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Article from "./article";
import CategoryTree from "./categoryTree";
import {LoadCategory, LoadSubCategories} from "../hooks/loadCategories";
import {LoadArticles} from "../hooks/loadArticles";

export default function Category() {
    return (
        <Switch>
            <Route exact path={`/:categoryTitle`}>
                <CategoryTree/>
                <CategoryTitleAndDescription/>
                <SubCategories/>
                <Articles/>
            </Route>
            <Route path={`${useRouteMatch().url}/:articleTitle`}>
                <Article/>
            </Route>
        </Switch>
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
                        <Grid item key={category.id} xs={12} sm={6} md={4}>
                            <Link to={`/${category.title}`}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {category.title}
                                        </Typography>
                                        <Typography>
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
    const articles = LoadArticles(useParams().categoryTitle);
    if (articles.error) return <div>Error</div>;
    if (articles.loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>{
                articles.data.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
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
