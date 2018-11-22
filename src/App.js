import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Button, Col, Container, CustomInput, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Row} from 'reactstrap';

import {LinkContainer} from 'react-router-bootstrap';

import IntervalInput from './IntervalInput';

import store from 'store2';

class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Container>

                        <Row>

                            <Col xs="10">
                                <h5>Музыкальные упражнения</h5>
                            </Col>

                            <Col xs="2">

                                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>

                                    <DropdownToggle color="outline-secondary" className="float-right">
                                        <FontAwesomeIcon icon="bars"/>
                                    </DropdownToggle>

                                    <DropdownMenu right>

                                        <LinkContainer to="/home">
                                            <DropdownItem>
                                                Главный экран
                                            </DropdownItem>
                                        </LinkContainer>

                                        <LinkContainer to="/intervalOperations">
                                            <DropdownItem>
                                                Операции с интервалами
                                            </DropdownItem>
                                        </LinkContainer>

                                    </DropdownMenu>
                                </Dropdown>

                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Route exact path="/home" component={Home}/>
                                <Route path="/intervalOperations" component={IntervalOperations}/>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </Router>
        );
    }
}

function Home() {
    return (
        <div>
            Это приложение с упражнениями по музыкальной арифметике. Выберите упражнение при помощи меню
        </div>
    );
}

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

const STORE = store.local.namespace('intervalOperations');

class IntervalOperationsConfig extends Component {

    constructor(props) {
        super(props);

        this.state = STORE.getAll({
            min1: '1',
            max1: '12',
            min2: '1',
            max2: '12',
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

export default App;
