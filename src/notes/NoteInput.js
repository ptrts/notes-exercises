import React from 'react';
import Note from '../notes/Note'
import {Button, ButtonGroup} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as NotesService from './NotesService';

class NoteInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    _add(n) {
        this.setState(prevState => ({
            value: NotesService.addToNoteStr(prevState.value, n)
        }), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    handleUp() {
        this._add(1);
    }

    handleDown() {
        this._add(-1);
    }

    render() {

        // onChange={this.handleOnChange.bind(this)}

        return (
            <div className="d-inline-flex">

                <Note clef={this.props.clef} value={this.state.value}/>

                <ButtonGroup vertical>

                    <Button
                        style={{flexBasis: '50%'}}
                        onClick={this.handleUp.bind(this)}
                    >
                        <FontAwesomeIcon icon="arrow-up"/>
                    </Button>

                    <Button
                        style={{flexBasis: '50%'}}
                        onClick={this.handleDown.bind(this)}
                    >
                        <FontAwesomeIcon icon="arrow-down"/>
                    </Button>

                </ButtonGroup>

            </div>
        );
    }
}

export default NoteInput;
