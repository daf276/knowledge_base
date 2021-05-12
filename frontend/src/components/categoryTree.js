import Container from "@material-ui/core/Container";
import {ListItemText} from "@material-ui/core";
import {LoadAllCategories, LoadCategory, LoadArticle} from "../hooks/loadData"
import {useParams, useRouteMatch} from "react-router-dom";
import ListItemLink from "./listItemLink";
import Grid from "@material-ui/core/Grid";
import LoadingCircle from "./loadingCircle";

export default function CategoryTree() {
  const articleTitle = useParams().articleTitle;
  const categoryTitle = useParams().categoryTitle;

  const categories = LoadAllCategories();
  const currentArticle = LoadArticle(articleTitle);
  const currentCategory = LoadCategory(categoryTitle);

  if (categories.error) return null;
  if (categories.loading) return <LoadingCircle/>;

  let currentPage;
  if (articleTitle) {
    if (currentArticle.error) return null;
    if (currentArticle.loading) return <LoadingCircle/>;
    currentPage = currentArticle.data;
  } else if (categoryTitle) {
    if (currentCategory.error) return null;
    if (currentCategory.loading) return <LoadingCircle/>;
    currentPage = currentCategory.data;
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container direction="row" spacing={1}>
          {
            buildCategoryTree(categories, currentPage).map(categoryTitle => (
              <Grid item key={categoryTitle} xs={2}>
                <ListItemLink href={`/${categoryTitle}`}>
                  <ListItemText primary={`${categoryTitle}`}/>
                  <ListItemText primary={">"}/>
                </ListItemLink>
              </Grid>
            ))
          }
          <CurrentPage currentPage={currentPage}/>
        </Grid>
      </Container>
    </div>
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

function CurrentPage(data) {
  return (
    <Grid item key={data.currentPage.title} xs={2}>
      <ListItemLink href={`${useRouteMatch().url}`}>
        <ListItemText primary={`${data.currentPage.title}`}/>
      </ListItemLink>
    </Grid>
  )
}