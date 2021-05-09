import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json())

export function LoadSections(title) {
    const {data, error} = useSWR(`http://localhost:1337/sections?article.title=${title}`, fetcher)

    return {
        data: data,
        loading: !error && !data,
        error: error
    }
}