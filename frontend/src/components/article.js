import {
  useParams, useRouteMatch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTree from "./categoryTree";
import {LoadArticle, url} from "../hooks/loadData";
import {List, ListItem, ListItemText} from "@material-ui/core";
import SearchBar from "./searchBar";
import {HashLink} from 'react-router-hash-link';
import Markdown from 'markdown-to-jsx';
import LoadingCircle from "./loadingCircle";
import ErrorMsg from "./loadError";

export default function Article() {
  return (
    <div>
      <SearchBar/>
      <CategoryTree/>
      <Title/>
      <SectionOverview/>
      <Sections/>
    </div>
  )
}

function Title() {
  const article = LoadArticle(useParams().articleTitle);
  if (article.error || !article.data) return null;
  if (article.loading) return <LoadingCircle/>;

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
        {article.data.title}
      </Typography>
    </Container>
  )
}

function SectionOverview() {
  const {url} = useRouteMatch();
  const article = LoadArticle(useParams().articleTitle);
  if (article.loading) return <LoadingCircle/>;
  if (article.error || !article.data || !article.data.sections || article.data.sections.length === 0) return null;

  return (
    <Container maxWidth="md">
      <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
        Sections
      </Typography>
      <List>
        {
          article.data.sections.map(section => (
            <Container key={section.id} maxWidth="md">
              <HashLink to={`${url}#${section.title}`}>
                <ListItem button>
                  <ListItemText primary={`${section.title}`}/>
                </ListItem>
              </HashLink>
            </Container>
          ))
        }
      </List>
    </Container>
  )
}

function Sections() {
  const article = LoadArticle(useParams().articleTitle);
  if (article.loading) return <LoadingCircle/>;
  if (article.error || !article.data) return <ErrorMsg errorMsg={"This Article does not exist"}/>;
  if (!article.data.sections || article.data.sections.length === 0) return <ErrorMsg errorMsg={"This Article does not have any content"}/>;

  return (
    article.data.sections.map(section => (
      <Container key={section.id} maxWidth="md">
        <Typography id={`${section.title}`} component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
          {section.title}
        </Typography>
        <Markdown>{section.content}</Markdown>
      </Container>
    ))
  )
}