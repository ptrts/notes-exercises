import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from 'reactstrap';

import {LinkContainer} from 'react-router-bootstrap';

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

                                    <DropdownToggle color="outline-secondary">
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
                    <Route exact path="/intervalOperations/config" component={IntervalOperationsConfiguration}/>
                    <Redirect from="/intervalOperations/" to="/intervalOperations/exercise" />
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

class IntervalOperationsConfiguration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foo: 0,
        };
    }

    render() {
        return (
            <div>
                Настройка
            </div>
        );
    }
}

export default App;
