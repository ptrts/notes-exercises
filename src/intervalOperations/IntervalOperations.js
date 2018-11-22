import {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import IntervalOperationsExercise from "./IntervalOperationsExercise";
import IntervalOperationsConfig from "./IntervalOperationsConfig";
import React from "react";

class IntervalOperations extends Component {

    render() {
        return (
            <div>
                <h2>Операции с интервалами</h2>
                <Switch>
                    <Route exact path="/intervalOperations/exercise" component={IntervalOperationsExercise}/>
                    <Route exact path="/intervalOperations/config" component={IntervalOperationsConfig}/>
                    <Redirect from="/intervalOperations/" to="/intervalOperations/exercise"/>
                </Switch>
            </div>
        );
    }
}

export default IntervalOperations;
