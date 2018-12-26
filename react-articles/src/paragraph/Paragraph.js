import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const Paragraph = SortableElement((props) => {
    return(<div className="container handle">
                <i className="icon close"
                   onClick={props.delParagraph}
                   data-id={props.para}/>
                <div onClick={props.editParagraph}
                     data-id={props.name}>
                    {props.content}
                </div>
            </div>
    )
});

export default Paragraph;