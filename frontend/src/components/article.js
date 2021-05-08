import {
    useParams,
} from "react-router-dom";

export default function Article() {
    let { id} = useParams();
    console.log(useParams())
    return (
        <div className="App">
            <h3>{id}</h3>
        </div>
    )
}