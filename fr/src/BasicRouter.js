import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { history } from "./utils/history";
import IndexView from "./view/IndexView";
import ResultView from "./view/ResultView";
import LoginView from "./view/LoginView";
import RegisterView from "./view/RegiterView";

/** 全局路由 **/
class BasicRouter extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={ history }>
                <Switch>
                    <Route exact path="/index" component={ IndexView }/>
                    <Route exact path="/search/:keyword" component={ ResultView }/>
                    <Route exact path="/login" component={LoginView}/>
                    <Route exact path="/register" component={RegisterView}/>
                    <Redirect to="/index"/>
                </Switch>
            </Router>
        )
    }
}

export default BasicRouter;