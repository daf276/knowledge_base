import {
  useParams, useRouteMatch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTree from "./categoryTree";
import {LoadArticle} from "../hooks/loadData";
import SearchBar from "./searchBar";
import {HashLink} from 'react-router-hash-link';
import Markdown from 'markdown-to-jsx';
import LoadingCircle from "./loadingCircle";
import ErrorMsg from "./loadError";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.title,
    display: "flex",
    justifyContent: "left",
    marginBottom: "1rem"
  },
  categoryDescription: {
    color: theme.palette.primary.description,
    display: "flex",
    justifyContent: "center",
    textAlign: "justify"
  },
  sectionOverview: {
    background: theme.palette.primary.lightgray,
    display: "flex",
    justifyContent: "left"
  },
  overviewTitle: {
    color: theme.palette.primary.title,
  },
  overviewSection: {
    color: theme.palette.primary.dark,
    textDecoration: "none",
  },
  overviewContainer: {
    display: "flex",
    justifyContent:"left",
    marginBottom: "1rem",
  }
}));

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
  const classes = useStyles();
  const article = LoadArticle(useParams().articleTitle);
  if (article.error || !article.data) return null;
  if (article.loading) return <LoadingCircle/>;

  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h4">
        {article.data.title}
      </Typography>
    </Container>
  )
}

function SectionOverview() {
  const classes = useStyles();
  const {url} = useRouteMatch();
  const article = LoadArticle(useParams().articleTitle);
  if (article.loading) return <LoadingCircle/>;
  if (article.error || !article.data || !article.data.sections || article.data.sections.length === 0) return null;

  return (
    <Container maxWidth="md" className={classes.overviewContainer}>
      <Box minWidth={"25%"}>
        <Grid className={classes.sectionOverview} container direction="column" spacing={1}>
          <Grid item key="title" xs={12}>
            <Typography className={classes.overviewTitle} component="h6" variant="h6">
              Sections
            </Typography>
          </Grid>
          {
            article.data.sections.map(section => (
              <Grid item key={section.title} xs={12}>
                <HashLink to={`${url}#${section.title}`} className={classes.overviewSection}>
                  {section.title}
                </HashLink>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Container>
  )
}

function Sections() {
  const classes = useStyles();
  const article = LoadArticle(useParams().articleTitle);
  if (article.loading) return <LoadingCircle/>;
  if (article.error || !article.data) return <ErrorMsg errorMsg={"This Article does not exist"}/>;
  if (!article.data.sections || article.data.sections.length === 0) return <ErrorMsg
    errorMsg={"This Article does not have any content"}/>;

  return (
    article.data.sections.map(section => (
      <Container key={section.id} maxWidth="md">
        <Typography id={`${section.title}`} className={classes.title} component="h4" variant="h4">
          {section.title}
        </Typography>
        <Markdown>{section.content}</Markdown>
      </Container>
    ))
  )
}