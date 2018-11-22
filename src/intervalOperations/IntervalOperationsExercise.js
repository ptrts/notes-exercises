import {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

class IntervalOperationsExercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            interval1: 0,
            interval2: 0,
            operation: 1,
            result: 0,
        };
    }

    render() {
        return (
            <div>
                <LinkContainer to="/intervalOperations/config">
                    <Button>
                        <FontAwesomeIcon icon="cogs"/>
                    </Button>
                </LinkContainer>

                <div>Само упражнение</div>
            </div>
        );
    }
}

export default IntervalOperationsExercise;
