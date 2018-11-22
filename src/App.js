import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from 'reactstrap';

import {LinkContainer} from 'react-router-bootstrap';

import IntervalOperations from './intervalOperations/IntervalOperations';
import Home from './home/Home';

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

export default App;
