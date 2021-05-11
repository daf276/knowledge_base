import {
    useParams, useRouteMatch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTree from "./categoryTree";
import {LoadArticle, LoadSections} from "../hooks/loadData";
import {List, ListItem, ListItemText} from "@material-ui/core";
import SearchBar from "./searchBar";
import {HashLink} from 'react-router-hash-link';
import Markdown from 'markdown-to-jsx';

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
    if (article.error) return <div>Error</div>;
    if (article.loading) return <div>Loading...</div>;

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
    const sections = LoadSections(useParams().articleTitle);
    if (sections.error) return <div>Error</div>;
    if (sections.loading) return <div>Loading...</div>;

    return (
        <Container maxWidth="md">
            <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                Sections
            </Typography>
            <List>
                {
                    sections.data.map(section => (
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
    const sections = LoadSections(useParams().articleTitle);
    if (sections.error) return <div>Error</div>;
    if (sections.loading) return <div>Loading...</div>;

    return (
        sections.data.map(section => (
            <Container key={section.id} maxWidth="md">
                <Typography id={`${section.title}`} component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
                    {section.title}
                </Typography>
                <Markdown>{section.content}</Markdown>
            </Container>
        ))
    )
}
