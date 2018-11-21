import React from 'react';
import Input from 'reactstrap/src/Input';
import {sequence} from './IntervalService';

class IntervalInput extends React.Component {

    handleOnChange(event) {
        console.error(1);
    }

    render() {

        const options = sequence.map(interval => (
            <option value={interval.halfTones}>{interval.shortName}</option>
        ));

        return (
            <Input type="select" onChange={this.handleOnChange.bind(this)}>
                {options}
            </Input>
        );
    }
}

export default IntervalInput;
