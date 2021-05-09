import Header from "./header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Category from "./categories";
import StickyFooter from "./footer";
import {makeStyles} from "@material-ui/core/styles";

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
            <div className={classes.root}>
                <Header/>
                <Switch>
                    <Route exact path="/"> {/* For this demo the default page just redirects to a category named Main Page */}
                        <Redirect to="/Main Page" />
                    </Route>
                    <Route path="/:categoryTitle">
                        <Category/>
                    </Route>
                </Switch>
            </div>
            <StickyFooter/>
        </Router>
    );
}