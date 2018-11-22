import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import IntervalOperationsExercise from "./IntervalOperationsExercise";
import IntervalOperationsConfigEditor from "./IntervalOperationsConfigEditor";

class IntervalOperations extends Component {

    render() {
        return (
            <div>
                <h3>Операции с интервалами</h3>
                <Switch>
                    <Route exact path="/intervalOperations/exercise" component={IntervalOperationsExercise}/>
                    <Route exact path="/intervalOperations/config" component={IntervalOperationsConfigEditor}/>
                    <Redirect from="/intervalOperations/" to="/intervalOperations/exercise"/>
                </Switch>
            </div>
        );
    }
}

export default IntervalOperations;
