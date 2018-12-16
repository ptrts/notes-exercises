import React from 'react';
import {Input} from 'reactstrap';

class NumberInput extends React.Component {

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
        return (
            <Input 
                type="number"
                value={this.state.value}
                onChange={this.handleOnChange.bind(this)}
            />
        );
    }
}

export default NumberInput;
