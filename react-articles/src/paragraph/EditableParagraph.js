import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const EditableParagraph = SortableElement((props) => {
    return(<textarea className="container with-title handle" id={props.name} name={props.name} data-id={props.para} value={props.content} onChange={props.handleChange} onKeyDown={props.handleKeyDown} ><i className="icon close"/></textarea>)
});

export default EditableParagraph;