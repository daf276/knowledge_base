import Header from "./header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, useRouteMatch
} from "react-router-dom";
import Category from "./categories";
import StickyFooter from "./footer";
import {makeStyles} from "@material-ui/core/styles";
import SearchResults from "./searchResults";
import Article from "./article";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));

export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <Header/>
            <div className={classes.root}>
                <Switch>
                    <Route exact
                           path="/"> {/* For this demo the default page just redirects to a category named Main Page */}
                        <Redirect to="/Main Page"/>
                    </Route>
                    <Route path="/:page">
                        <Routing/>
                    </Route>
                </Switch>
            </div>
            <StickyFooter/>
        </Router>
    );
}

function Routing() {
    return (
        <Switch>
            <Route exact path={`/search`}>
                <SearchResults/>
            </Route>
            <Route exact path="/:categoryTitle">
                <Category/>
            </Route>
            <Route path={`${useRouteMatch().url}/:articleTitle`}>
                <Article/>
            </Route>
        </Switch>
    );
}