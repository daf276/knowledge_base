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
import {LoadCategory, LoadSubCategories, LoadArticles, LoadAllCategories} from "../hooks/loadData";
import SearchBar from "./searchBar";
import {makeStyles} from "@material-ui/core/styles";
import LoadingCircle from "./loadingCircle";
import ErrorMsg from "./loadError";

const useStyles = makeStyles((theme) => ({
  categoryTitle: {
    color: theme.palette.primary.title,
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem"
  },
  categoryDescription: {
    color: theme.palette.primary.description,
    display: "flex",
    justifyContent: "center",
    textAlign: "justify"
  },
  card: {
    textDecoration: "none",
  },
  cardTitle: {
    color: theme.palette.primary.main,
  },
  subCategoryDescription: {
    color: theme.palette.primary.description,
    textAlign: "justify"
  },
  articleContainer:{
    marginTop: "3rem"
  }
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

export function Main() {
  return (
    <div>
      <SearchBar/>
      <MainPageDescription/>
      <MainCategories/>
    </div>
  );
}

function MainPageDescription() {
  const classes= useStyles();

  return (
    <Container maxWidth="md">
      <Typography className={classes.categoryTitle} component="h3" variant="h3">
        This is the Main Page
      </Typography>
      <Typography className={classes.categoryDescription} variant="h6" paragraph>
        Below you will find all top-level categories
      </Typography>
    </Container>
  )
}

function CategoryTitleAndDescription() {
  const classes = useStyles();
  const category = LoadCategory(useParams().categoryTitle);
  if (category.loading) return <LoadingCircle/>;
  if (category.error) return <ErrorMsg errorMsg={"Category does not exist or could not be loaded."}/>;

  return (
    <Container maxWidth="md">
      <Typography className={classes.categoryTitle} component="h3" variant="h3">
        {category.data.title}
      </Typography>
      <Typography className={classes.categoryDescription} variant="h6" paragraph>
        {category.data.description}
      </Typography>
    </Container>
  )
}

function MainCategories() {
  const allCategories = LoadAllCategories();
  if (allCategories.loading) return <LoadingCircle/>;
  if (allCategories.error || allCategories.data.error) return <ErrorMsg errorMsg={"Subcategories could not be loaded."}/>;

  const topLevelCategories = allCategories.data.filter(category => !category.category);
  return <RenderSubCategories subCategories={topLevelCategories}/>
}

function SubCategories() {
  const subCategories = LoadSubCategories(useParams().categoryTitle);
  if (subCategories.loading) return <LoadingCircle/>;
  if (subCategories.error || subCategories.data.error) return <ErrorMsg errorMsg={"Subcategories could not be loaded."}/>;
  if (!subCategories.data) return null;
  return <RenderSubCategories subCategories={subCategories.data}/>
}

function RenderSubCategories(data) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {
          data.subCategories.map(category => (
            <Grid item key={category.id} xs={4}>
              <Link className={classes.card} to={`/${category.title}`} >
                <Card>
                  <CardContent >
                    <Typography className={classes.cardTitle} gutterBottom variant="h6">
                      {category.title}
                    </Typography>
                    <Typography className={classes.subCategoryDescription} variant="body1">
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
  if (articles.loading) return <LoadingCircle/>;
  if (articles.error || articles.data.error) return <ErrorMsg errorMsg={"Articles of this category could not be loaded."}/>;
  if (!articles.data || articles.data.length === 0) return <ErrorMsg errorMsg={"This Category seems to not have any articles yet"}/>;

  return (
    <Container className={classes.articleContainer} maxWidth="md">
      <Grid container direction="column" spacing={2}>{
        articles.data.map(article => (
          <Grid item key={article.id} xs={12}>
            <Link to={`/${article.category.title}/${article.title}`} className={classes.card}>
              <Card>
                <CardContent>
                  <Typography className={classes.cardTitle} variant="h6" component="h6">
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