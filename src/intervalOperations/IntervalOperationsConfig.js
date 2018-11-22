import store from "store2";
import React, {Component} from "react";
import IntervalInput from "../IntervalInput";
import {Button, Col, CustomInput, Label, Row,} from "reactstrap";

const STORE = store.local.namespace('intervalOperations');

class IntervalOperationsConfig extends Component {

    constructor(props) {
        super(props);

        this.state = STORE.getAll({
            min1: 1,
            max1: 12,
            min2: 1,
            max2: 12,
            allowPlus: true,
            allowMinus: true,
        });
    }

    handleChangeMin1(value) {
        this.setState({
            min1: value
        });
    }

    handleChangeMax1(value) {
        this.setState({
            max1: value
        });
    }

    handleChangeMin2(value) {
        this.setState({
            min2: value
        });
    }

    handleChangeMax2(value) {
        this.setState({
            max2: value
        });
    }

    handleChangeAllowPlus(event) {
        const value = event.currentTarget.checked;
        console.log(value);
        this.setState({
            allowPlus: value
        });
    }

    handleChangeAllowMinus(event) {
        const value = event.currentTarget.checked;
        console.log(value);
        this.setState({
            allowMinus: value
        });
    }

    handleOnClickApply() {
        STORE.setAll(this.state);
    }

    render() {
        return (
            <div>

                <Row className="mb-2">
                    <Col>
                        <Label>Интервал 1</Label>
                    </Col>
                    <Col>
                        <IntervalInput value={this.state.min1} onChange={this.handleChangeMin1.bind(this)} />
                    </Col>
                    <Col>
                        <IntervalInput value={this.state.max1} onChange={this.handleChangeMax1.bind(this)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Label>Интервал 2</Label>
                    </Col>
                    <Col>
                        <IntervalInput value={this.state.min2} onChange={this.handleChangeMin2.bind(this)} />
                    </Col>
                    <Col>
                        <IntervalInput value={this.state.max2} onChange={this.handleChangeMax2.bind(this)} />
                    </Col>
                </Row>

                <div className="d-flex">

                    <CustomInput
                        type="checkbox"
                        id="allowPlus"
                        label="Сложение"
                        checked={this.state.allowPlus}
                        onChange={this.handleChangeAllowPlus.bind(this)}
                    />

                    <CustomInput
                        className="ml-4"
                        type="checkbox"
                        id="allowMinus"
                        label="Вычитание"
                        checked={this.state.allowMinus}
                        onChange={this.handleChangeAllowMinus.bind(this)}
                    />
                </div>

                <Row>
                    <Col>
                        <Button
                            className="float-right"
                            onClick={this.handleOnClickApply.bind(this)}
                        >
                            Применить
                        </Button>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default IntervalOperationsConfig;
