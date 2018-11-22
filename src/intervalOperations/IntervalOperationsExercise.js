import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as IntervalOperationsConfigService from './IntervalOperationsConfigService';
import * as IntervalService from '../interval/IntervalService';

class IntervalOperationsExercise extends Component {

    constructor(props) {
        super(props);
        this.config = IntervalOperationsConfigService.load();
        this.state = this._getNewState();
    }
    
    _integerRandomBetween(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
    
    _randomOperation() {
        const min = this.config.allowPlus ? 0 : 1;
        const max = this.config.allowMinus ? 1 : 0;
        const zeroForPlusOneForMinus = this._integerRandomBetween(min, max);
        return 1 - 2 * zeroForPlusOneForMinus;
    }
    
    _getNewState() {
        const interval1 = this._integerRandomBetween(this.config.min1, this.config.max1);
        const interval2 = this._integerRandomBetween(this.config.min2, this.config.max2);
        const operation = this._randomOperation();
        const result = interval1 + operation * interval2;
        return {
            interval1,
            interval2,
            operation,
            result,
            showResult: false,
        };
    }

    handleClickNext() {
        this.setState(this._getNewState());
    }
    
    handleClickResult() {
        this.setState({
            showResult: true
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col align="center">

                        <h3 className="mt-5">
                            {'' + IntervalService.shortName(this.state.interval1) + (this.state.operation === 1 ? ' + ' : ' - ') + IntervalService.shortName(this.state.interval2)}
                        </h3>

                        <h3>=</h3>

                        <p>
                            <Button
                                onClick={this.handleClickResult.bind(this)}
                                disabled={this.state.showResult}
                            >
                                {this.state.showResult
                                    ?
                                    IntervalService.shortName(this.state.result)
                                    :
                                    '?'
                                }
                            </Button>
                        </p>

                        <p className="mt-5">
                            <Button
                                onClick={this.handleClickNext.bind(this)}
                            >
                                Следующий пример
                            </Button>
                        </p>

                        <p className="mt-5">
                            <LinkContainer to="/intervalOperations/config">
                                <Button>
                                    <FontAwesomeIcon icon="cogs"/>
                                </Button>
                            </LinkContainer>
                        </p>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default IntervalOperationsExercise;
