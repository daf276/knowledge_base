import React, {useContext, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import useSWR from "swr";
import {makeStyles} from "@material-ui/core/styles";

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

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Categories() {
    const [fetchID, setFetchID] = useState(4);
    const { data, error } = useSWR(`http://localhost:1337/categories?category.id=${fetchID}`, fetcher)
    const { categories} = LoadCategories(fetchID);
    const { articles} = LoadArticles(fetchID);

    console.log(error)
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                <DisplayCategories data={categories} setFetchID={setFetchID}/>
                <DisplayArticles data={articles}/>
            </Grid>
        </Container>
    );
}

function DisplayCategories(props) {
    if (!props.data) return null;
    return (
        props.data && props.data.map(category => (
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
                        <Button size="small" color="primary" onClick={() => {props.setFetchID(category.id)}} >
                            View
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
    )
}

function DisplayArticles(props) {
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
                        <Button size="small" color="primary" onClick={() => {props.setFetchID(category.id)}} >
                            View
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
    )
}

function LoadCategories (id) {
    const { data, error } = useSWR(`http://localhost:1337/categories?category.id=${id}`, fetcher)

    return {
        categories: data,
        isLoading: !error && !data,
        error: error
    }
}

function LoadArticles (id) {
    const { data, error } = useSWR(`http://localhost:1337/articles?category.id=${id}`, fetcher)

    return {
        articles: data,
        isLoading: !error && !data,
        error: error
    }
}