import Container from "@material-ui/core/Container";
import {List, ListItemText} from "@material-ui/core";
import {LoadAllCategories, LoadCategory} from "../hooks/loadCategories"
import {LoadArticle} from "../hooks/loadArticles";
import {useParams} from "react-router-dom";
import ListItemLink from "./listItemLink";

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

export default function CategoryTree() {
    const articleTitle = useParams().articleTitle;
    const categoryTitle = useParams().categoryTitle;

    const categories = LoadAllCategories();
    const currentArticle = LoadArticle(articleTitle);
    const currentCategory = LoadCategory(categoryTitle);

    if (categories.error) return <div>Error</div>;
    if (categories.loading) return <div>Loading...</div>;

    let currentPage;
    if(articleTitle) {
        if (currentArticle.error) return <div>Error</div>;
        if (currentArticle.loading) return <div>Loading...</div>;
        currentPage = currentArticle.data;
    } else if (categoryTitle) {
        if (currentCategory.error) return <div>Error</div>;
        if (currentCategory.loading) return <div>Loading...</div>;
        currentPage = currentCategory.data;
    }

    return (
        <div>
            <Container maxWidth="lg">
                <List className="list-horizontal-display" style={flexContainer}>
                    {
                        buildCategoryTree(categories, currentPage).map(categoryTitle => (
                            <ListItemLink href={`/${categoryTitle}`}>
                                <ListItemText primary={`${categoryTitle}`}/>
                            </ListItemLink>
                        ))
                    }
                    <ListItemText primary={`${currentPage.title}`}/>
                </List>
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