import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from 'reactstrap';

import {IndexLinkContainer} from 'react-router-bootstrap';

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
                            <Col>

                                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                    <DropdownToggle>Toggle</DropdownToggle>
                                    <DropdownMenu>
                                        
                                        <IndexLinkContainer to="/">
                                            <DropdownItem>
                                                Home
                                            </DropdownItem>
                                        </IndexLinkContainer>
                                        
                                        <IndexLinkContainer to="/about">
                                            <DropdownItem>
                                                About
                                            </DropdownItem>
                                        </IndexLinkContainer>
                                        
                                        <IndexLinkContainer to="/topics">
                                            <DropdownItem>
                                                Topics
                                            </DropdownItem>
                                        </IndexLinkContainer>
                                        
                                    </DropdownMenu>
                                </Dropdown>

                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <Route exact path="/" component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/topics" component={Topics} />
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
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Topics({ match }) {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

function Topic({ match }) {
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}

export default App;
