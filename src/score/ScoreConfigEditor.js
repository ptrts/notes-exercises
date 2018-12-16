import React, {Component} from "react";
import * as ScoreConfigService from "./ScoreConfigService";
import {Button, Col, Label, Row, CustomInput} from "reactstrap";
import NoteInput from '../notes/NoteInput'

import {withRouter} from 'react-router-dom'

class ScoreConfigEditor extends Component {

    constructor(props) {
        super(props);
        this.state = ScoreConfigService.load();
    }

    trebleMinNoteHandleChange(value) {
        this.setState({
            trebleMinNote: value
        });
    }

    trebleMaxNoteHandleChange(value) {
        this.setState({
            trebleMaxNote: value
        });
    }

    bassMinNoteHandleChange(value) {
        this.setState({
            bassMinNote: value
        });
    }

    bassMaxNoteHandleChange(value) {
        this.setState({
            bassMaxNote: value
        });
    }

    handleChangeAllowTreble(event) {
        const value = event.currentTarget.checked;
        this.setState({
            allowTreble: value
        });
    }

    handleChangeAllowBass(event) {
        const value = event.currentTarget.checked;
        this.setState({
            allowBass: value
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
                        <NoteInput clef="treble" value={this.state.trebleMinNote} onChange={this.trebleMinNoteHandleChange.bind(this)}/>
                    </Col>
                    <Col>
                        <NoteInput clef="treble" value={this.state.trebleMaxNote} onChange={this.trebleMaxNoteHandleChange.bind(this)}/>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col>
                        <NoteInput clef="bass" value={this.state.bassMinNote} onChange={this.bassMinNoteHandleChange.bind(this)}/>
                    </Col>
                    <Col>
                        <NoteInput clef="bass" value={this.state.bassMaxNote} onChange={this.bassMaxNoteHandleChange.bind(this)}/>
                    </Col>
                </Row>

                <div className="d-flex">

                    <CustomInput
                        type="checkbox"
                        id="allowTreble"
                        label="Высокие"
                        checked={this.state.allowTreble}
                        onChange={this.handleChangeAllowTreble.bind(this)}
                    />

                    <CustomInput
                        className="ml-4"
                        type="checkbox"
                        id="allowBass"
                        label="Низкие"
                        checked={this.state.allowBass}
                        onChange={this.handleChangeAllowBass.bind(this)}
                    />
                    
                </div>
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
