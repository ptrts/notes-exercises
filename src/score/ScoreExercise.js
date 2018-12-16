import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as ScoreConfigService from './ScoreConfigService';

class ScoreExercise extends Component {

    constructor(props) {
        super(props);
        this.config = ScoreConfigService.load();
        this.state = this._getNewState();
    }
    
    _integerRandomBetween(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
    
    _getNewState() {
        const noteNumber = this._integerRandomBetween(this.config.min, this.config.max);
        return {
            noteNumber,
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

    _noteName(noteNumber) {
        return '' + noteNumber;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col align="center">

                        <h3 className="mt-5">
                            {
                                '' + this._noteName(this.state.noteNumber)
                            }
                        </h3>

                        <h3>=</h3>

                        <p>
                            <Button
                                onClick={this.handleClickResult.bind(this)}
                                disabled={this.state.showResult}
                            >
                                {this.state.showResult
                                    ?
                                    this._noteName(this.state.noteNumber)
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
                            <LinkContainer to="/score/config">
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

export default ScoreExercise;
