import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json())

export function LoadCategory(title) {
    if (!title) title = "Main Page"; // If our category doesnt have a title that means were on the Main Page, which for now is also just a category
    const {data, error} = useSWR(`http://localhost:1337/categories/${title}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function LoadSubCategories(title) {
    if (!title) title = "Main Page"; // If our category doesnt have a title that means were on the Main Page, which for now is also just a category
    const {data, error} = useSWR(`http://localhost:1337/categories?category.title=${title}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function LoadAllCategories() {
    const {data, error} = useSWR(`http://localhost:1337/categories`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}