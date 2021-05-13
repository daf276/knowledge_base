import useSWR from "swr";

//const url = "https://knowledge-base-example.herokuapp.com/"
export const BASE_URL = "http://localhost:1337/"
const fetcher = (url) => fetch(url).then(res => res.json())

function Load(suburl) {
    const {data, error} = useSWR(`${BASE_URL}${suburl}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function LoadCategory(title) {
    return Load(`categories/${title}`);
}

export function LoadSubCategories(title) {
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

export function SearchCategories(keyword) {
    return Load(`categories?_q=${keyword}`);
}

export function SearchArticles(keyword) {
    return Load(`articles?_q=${keyword}`);
}

export function SearchSections(keyword) {
    return Load(`content-search?_q=${keyword}`);
}