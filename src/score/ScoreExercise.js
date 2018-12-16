import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as ScoreConfigService from './ScoreConfigService';
import * as NotesService from '../notes/NotesService';
import Note from '../notes/Note'

class ScoreExercise extends Component {

    constructor(props) {
        super(props);
        this.config = ScoreConfigService.load();
        this.state = this._getNewState();
    }
    
    _integerRandomBetween(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
    
    _getGetRandomClef() {
        if (this.config.allowTreble && this.config.allowBass) {
            const zeroOrOne = Math.round(Math.random());
            return zeroOrOne ? 'treble' : 'bass';
        } else if (this.config.allowTreble) {
            return 'treble';
        } else if (this.config.allowBass) {
            return 'bass';
        } else {
            return undefined;
        }
    }
    
    _getNewState() {
        
        const clef = this._getGetRandomClef();
        
        if (!clef) {
            return undefined;
        }
        
        let minNoteStr, maxNoteStr;
        if (clef === 'treble') {
            minNoteStr = this.config.trebleMinNote;
            maxNoteStr = this.config.trebleMaxNote;
        } else {
            minNoteStr = this.config.bassMinNote;
            maxNoteStr = this.config.bassMaxNote;
        }
        
        const minNote = NotesService.parseNote(minNoteStr);
        const maxNote = NotesService.parseNote(maxNoteStr);

        const bigIndex = this._integerRandomBetween(minNote.bigIndex, maxNote.bigIndex);
        const note = NotesService.noteFromBigIndex(bigIndex);

        return {
            clef,
            note,
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

                        <Note className="mt-5" clef={this.state.clef} value={this.state.note.str} />

                        <h3>=</h3>

                        <p>
                            <Button
                                onClick={this.handleClickResult.bind(this)}
                                disabled={this.state.showResult}
                            >
                                {this.state.showResult
                                    ?
                                    this.state.note.ru + ' (' + this.state.note.str + ')'
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
