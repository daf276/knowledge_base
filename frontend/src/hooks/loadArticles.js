import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json())

export function LoadArticle(title) {
    const {data, error} = useSWR(`http://localhost:1337/articles/${title}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}

export function LoadArticles(title) {
    const {data, error} = useSWR(`http://localhost:1337/articles?category.title=${title}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}