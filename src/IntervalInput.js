import React from 'react';
import {Input} from 'reactstrap';
import {basicSequence} from './IntervalService';

class IntervalInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    handleOnChange(event) {
        const valueStr = event.target.value;
        const value = Number(valueStr);
        this.setState({
            value: value
        });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {

        const options = basicSequence.map(interval => (
            <option 
                value={interval.halfTones}
                key={interval.halfTones}
            >
                {interval.shortName}
            </option>
        ));

        return (
            <Input 
                type="select"
                value={this.state.value}
                onChange={this.handleOnChange.bind(this)}
            >
                {options}
            </Input>
        );
    }
}

export default IntervalInput;
