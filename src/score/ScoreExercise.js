import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as ScoreConfigService from './ScoreConfigService';
import * as NotesService from '../notes/NotesService';
import Note from '../notes/Note'

import DimensionsProvider from './demo/DimensionsProvider';
import SoundfontProvider from './demo/SoundfontProvider';

import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

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
            right: null,
        };
    }

    _doNext() {
        this.setState(this._getNewState());
    }

    handleClickNext() {
        this._doNext();
    }
    
    handleClickResult() {
        this.setState({
            showResult: true
        });
    }

    onPlayNoteInput(midiNumber) {
        const theirNote = MidiNumbers.getAttributes(midiNumber);
        const ourNote = this.state.note;
        const right = theirNote.pitchName.toLowerCase() === ourNote.en;
        this.setState({right});
    }

    onStopNoteInput(midiNumber, {prevActiveNotes}) {

        // Отпустили последнюю кнопку
        if (prevActiveNotes.length === 1 && midiNumber === prevActiveNotes[0]) {
            this.setState(prevState => {

                // Смотрим, была ли в куче кнопок нажата правильная кнопка
                if (prevState.right) {
                    // Была. Переходим к следующей ноте
                    return this._getNewState();
                } else {
                    // Не была. Рамку убираем. Пусть пользователь попробует еще
                    return {right: null};
                }
            });
        }
    }

    render() {

        let borderColor = 'Transparent';
        if (this.state.right === true) {
            borderColor = 'Green';
        } else if (this.state.right === false) {
            borderColor = 'Red';
        }

        return (
            <div>
                <Row>
                    <Col align="center">

                        <Note
                            className="mt-5"
                            clef={this.state.clef}
                            value={this.state.note.str}
                            style={{
                                borderWidth: '10px',
                                borderStyle: 'solid',
                                borderColor: borderColor
                            }}
                        />

                        {this.config.keyboard
                            ? (
                                <div>
                                    <ResponsivePiano
                                        onPlayNoteInput={this.onPlayNoteInput.bind(this)}
                                        onStopNoteInput={this.onStopNoteInput.bind(this)}
                                        octaveNumber={this.state.note.octaveNumber}
                                    />
                                </div>
                            )
                            : (
                                <>
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
                                </>
                            )
                        }

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

function ResponsivePiano(props) {

    const noteRange = {
        first: MidiNumbers.fromNote('c' + props.octaveNumber),
        last: MidiNumbers.fromNote('b' + props.octaveNumber),
    };

    return (
        <DimensionsProvider>
            {({ containerWidth, containerHeight }) => (
                <SoundfontProvider
                    instrumentName="acoustic_grand_piano"
                    audioContext={audioContext}
                    hostname={soundfontHostname}
                    render={({ isLoading, playNote, stopNote }) => (
                        <Piano
                            noteRange={noteRange}
                            width={containerWidth}
                            playNote={playNote}
                            stopNote={stopNote}
                            disabled={isLoading}
                            {...props}
                        />
                    )}
                />
            )}
        </DimensionsProvider>
    );
}

export default ScoreExercise;
