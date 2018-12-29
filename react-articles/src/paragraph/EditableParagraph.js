import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const EditableParagraph = SortableElement((props) => {
    {/*giving id in data-id permits the different methods using events to know the id of their paragraph during the call of the function*/}
    return(<textarea className="container with-title handle"
                     name={props.name}
                     data-id={props.para}
                     value={props.content}
                     onChange={props.handleChange}
                     onKeyDown={props.handleKeyDown} >
                <i className="icon close"/>
            </textarea>
    )
});

export default EditableParagraph;