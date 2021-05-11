import {
    useParams,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTree from "./categoryTree";
import {LoadArticle} from "../hooks/loadArticles";
import {LoadSections} from "../hooks/loadSections";
import {List, ListItemText} from "@material-ui/core";
import ListItemLink from "./listItemLink";
import SearchBar from "./searchBar";

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
                            <ListItemLink href={`#${section.title}`}>
                                <ListItemText primary={`${section.title}`}/>
                            </ListItemLink>
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
                {/*TODO make it so this is the anchor*/}
                <Typography component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
                    {section.title}
                </Typography>
                <Typography variant="h6" align="left" color="textSecondary" paragraph>
                    {section.content}
                </Typography>
            </Container>
        ))
    )
}
