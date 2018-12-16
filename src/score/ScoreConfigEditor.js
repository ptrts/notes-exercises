import React, {Component} from "react";
import * as ScoreConfigService from "./ScoreConfigService";
import NumberInput from '../number/NumberInput'
import {Button, Col, Label, Row,} from "reactstrap";

import {withRouter} from 'react-router-dom'

class ScoreConfigEditor extends Component {

    constructor(props) {
        super(props);
        this.state = ScoreConfigService.load();
    }

    handleChangeMin(value) {
        this.setState({
            min: value
        });
    }

    handleChangeMax(value) {
        this.setState({
            max: value
        });
    }

    handleOnClickApply(history) {
        ScoreConfigService.store(this.state);
        history.push('/score/Exercise');
    }

    render() {
        
        const ApplyButton = withRouter(({history}) => (
            <Button
                className="float-right"
                onClick={this.handleOnClickApply.bind(this, history)}
            >
                Применить
            </Button>            
        ));

        return (
            <div>

                <Row className="mb-2">
                    <Col>
                        <Label>Интервал</Label>
                    </Col>
                    <Col>
                        <NumberInput value={this.state.min} onChange={this.handleChangeMin.bind(this)} />
                    </Col>
                    <Col>
                        <NumberInput value={this.state.max} onChange={this.handleChangeMax.bind(this)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ApplyButton />
                    </Col>
                </Row>

            </div>
        );
    }
}

export default ScoreConfigEditor;
