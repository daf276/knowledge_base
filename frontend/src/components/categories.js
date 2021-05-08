import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import useSWR from "swr";
import {makeStyles} from "@material-ui/core/styles";
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Article from "./article";

const classes = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Category() {
    let {url} = useRouteMatch();
    let {category} = useParams();

    const {categories, categoriesLoading, categoriesLoadError} = LoadSubCategories(category);
    const {articles, articlesLoading, articlesLoadError} = LoadArticles(category);

    if (categoriesLoadError || articlesLoadError) return <div>Error</div>;
    if (categoriesLoading || articlesLoading) return <div>Loading...</div>;

    return (
        <Switch>
            <Route exact path={url}>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <DisplayCategories data={categories}/>
                        <DisplayArticles data={articles}/> //TODO Display articles differently
                    </Grid>
                </Container>
            </Route>
            <Route path={`${url}/:id`}>
                <Article/>
            </Route>
        </Switch>
    );
}

function DisplayCategories(props) {
    if (!props.data) return null;
    return (
        props.data.map(category => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {category.title}
                        </Typography>
                        <Typography>
                            {category.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/${category.title}`}>
                            <Button size="small" color="primary">
                                View
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        ))
    )
}

function DisplayArticles(props) {
    if (!props.data) return null;
    return (
        props.data.map(article => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {article.title}
                        </Typography>
                        <Typography>
                            {article.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/${article.category.title}/${article.title}`}>
                            <Button size="small" color="primary">
                                View
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        ))
    )
}

const fetcher = (url) => fetch(url).then(res => res.json())

function LoadSubCategories(title) {
    if (!title) title = "Main Page"; // If our category doesnt have a title that means were on the Main Page, which for now is also just a category
    const {data, error} = useSWR(`http://localhost:1337/categories?category.title=${title}`, fetcher)

    return {
        categories: data,
        categoriesLoading : !error && !data,
        categoriesLoadError: error
    }
}

function LoadArticles(title) {
    const {data, error} = useSWR(`http://localhost:1337/articles?category.title=${title}`, fetcher)

    return {
        articles: data,
        articlesLoading : !error && !data,
        articlesLoadError: error
    }
}