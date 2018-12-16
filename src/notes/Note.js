import React from 'react';
import * as NotesService from './NotesService'

class Note extends React.Component {

    render() {
        const {clef, value, ...otherProps} = this.props;
        const svgInnerHtml = NotesService.getSvgInnerHtml(clef, value, 'q');
        return <div {...otherProps} dangerouslySetInnerHTML={{__html: svgInnerHtml}} />;
    }
}

export default Note;
