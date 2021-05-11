import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json())

export function SearchArticles(keyword) {
    const {data, error} = useSWR(`http://localhost:1337/articles?_q=${keyword}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function SearchSections(keyword) {
    const {data, error} = useSWR(`http://localhost:1337/sections?_q=${keyword}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function SearchCategories(keyword) {
    const {data, error} = useSWR(`http://localhost:1337/categories?_q=${keyword}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}