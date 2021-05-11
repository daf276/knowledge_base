import useSWR from "swr";

const url = "http://localhost:1337/"
const fetcher = (url) => fetch(url).then(res => res.json())

function Load(suburl) {
    const {data, error} = useSWR(`${url}${suburl}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function LoadCategory(title) {
    if (!title) title = "Main Page"; // If our category doesnt have a title that means were on the Main Page, which for now is also just a category
    return Load(`categories/${title}`);
}

export function LoadSubCategories(title) {
    if (!title) title = "Main Page"; // If our category doesnt have a title that means were on the Main Page, which for now is also just a category
    return Load(`categories?category.title=${title}`);
}

export function LoadAllCategories() {
    return Load(`categories`);
}

export function LoadArticle(title) {
    return Load(`articles/${title}`);
}

export function LoadArticles(title) {
    return Load(`articles?category.title=${title}`);
}

export function LoadSections(title) {
    return Load(`sections?article.title=${title}`);
}

export function SearchCategories(keyword) {
    return Load(`categories?_q=${keyword}`);
}

export function SearchArticles(keyword) {
    return Load(`articles?_q=${keyword}`);
}

export function SearchSections(keyword) {
    return Load(`sections?_q=${keyword}`);
}