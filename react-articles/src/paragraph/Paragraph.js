import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const Paragraph = SortableElement((props) => {
    return(<div className="container handle">
            {/*giving id in data-id permits the onSortEnd to know the id of its paragraph*/}
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