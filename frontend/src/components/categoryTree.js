import {Breadcrumbs, Link} from "@material-ui/core";
import {LoadAllCategories, LoadCategory, LoadArticle} from "../hooks/loadData"
import {useParams} from "react-router-dom";
import LoadingCircle from "./loadingCircle";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageTree: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.dark
  },
}));

export default function CategoryTree() {
  const classes = useStyles();

  const articleTitle = useParams().articleTitle;
  const categoryTitle = useParams().categoryTitle;

  const categories = LoadAllCategories();
  const currentArticle = LoadArticle(articleTitle);
  const currentCategory = LoadCategory(categoryTitle);

  if (categories.loading) return <LoadingCircle/>;
  if (categories.error || categories.data.error) return null;

  let currentPage;
  if (articleTitle) {
    if (currentArticle.loading) return <LoadingCircle/>;
    if (currentArticle.error || currentArticle.data.error) return null;
    currentPage = currentArticle.data;
  } else if (categoryTitle) {
    if (currentCategory.loading) return <LoadingCircle/>;
    if (currentCategory.error || currentCategory.data.error) return null;
    currentPage = currentCategory.data;
  }

  return (
    <Breadcrumbs className={classes.pageTree} separator="›">
      <Link color="inherit" href="/" key="Home">
        Home
      </Link>
      {
        buildCategoryTree(categories, currentPage).map(categoryTitle => (
          <Link color="inherit" href={`/${categoryTitle}`} key={categoryTitle}>
            {categoryTitle}
          </Link>
        ))
      }
      <Typography color="textPrimary">{currentPage.title}</Typography>
    </Breadcrumbs>
  )
}

function buildCategoryTree(categories, currentPage) {
  let array = [];
  while (currentPage.category) {
    array.push(currentPage.category.title);
    currentPage = categories.data.filter(category => category.title === currentPage.category.title)[0];
  }
  return array.reverse(); //Reverse because we want a top-down tree and its currently bottom-up
}