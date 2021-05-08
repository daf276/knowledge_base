import Header from "./header";
import Footer from "./footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Category from "./categories";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Category/>
                    </Route>
                    <Route path="/:category">
                        <Category/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;