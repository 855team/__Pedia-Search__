import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./utils/history";
import IndexView from "./view/IndexView";
import ResultView from "./view/ResultView";

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
                    <Route path="/search/:keyword" component={ ResultView }/>
                    <Redirect to="/index"/>
                </Switch>
            </Router>
        )
    }
}

export default BasicRouter;