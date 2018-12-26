import React, { Component } from 'react';
import {SortableElement} from 'react-sortable-hoc';

const EditableParagraph = SortableElement((props) => {
    return(<textarea className="container with-title handle" id={props.index} name={props.name} value={props.content} onChange={props.handleChange}><i className="icon close"/></textarea>)
});

export default EditableParagraph;