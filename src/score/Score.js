import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ScoreExercise from "./ScoreExercise";
import ScoreConfigEditor from "./ScoreConfigEditor";

class Score extends Component {

    render() {
        return (
            <div>
                <h3>Ноты</h3>
                <Switch>
                    <Route exact path="/score/exercise" component={ScoreExercise}/>
                    <Route exact path="/score/config" component={ScoreConfigEditor}/>
                    <Redirect from="/score/" to="/score/exercise"/>
                </Switch>
            </div>
        );
    }
}

export default Score;
