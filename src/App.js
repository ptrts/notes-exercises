import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Button,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Row
} from 'reactstrap';

import {LinkContainer} from 'react-router-bootstrap';

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

    handleChangeMin1(event) {
        this.setState({
            min1: event.target.value
        });
    }

    handleChangeMax1(event) {
        this.setState({
            max1: event.target.value
        });
    }

    handleChangeMin2(event) {
        this.setState({
            min2: event.target.value
        });
    }

    handleChangeMax2(event) {
        this.setState({
            max2: event.target.value
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
                        <Input type="number"
                               min="1"
                               max="12"
                               required
                               value={this.state.min1}
                               placeholder="Мин."
                               onChange={this.handleChangeMin1.bind(this)}
                        />
                    </Col>
                    <Col>
                        <Input type="number"
                               min="1"
                               max="12"
                               required
                               value={this.state.max1}
                               placeholder="Макс."
                               onChange={this.handleChangeMax1.bind(this)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Label>Интервал 2</Label>
                    </Col>
                    <Col>
                        <Input type="number"
                               min="1"
                               max="12"
                               required
                               value={this.state.min2}
                               placeholder="Мин."
                               onChange={this.handleChangeMin2.bind(this)}
                        />
                    </Col>
                    <Col>
                        <Input type="number"
                               min="1"
                               max="12"
                               required
                               value={this.state.max2}
                               placeholder="Макс."
                               onChange={this.handleChangeMax2.bind(this)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={this.handleOnClickApply.bind(this)}>Применить</Button>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default App;
