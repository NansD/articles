import React from 'react';
import Paragraph from './Paragraph';
import {SortableContainer} from 'react-sortable-hoc';


const ParagraphList = SortableContainer(({items}) => {
    return (
        <div className="container">
            {
                items.map((paragraph,index) => (<Paragraph key={paragraph.id} name={paragraph.id} index={index} content={paragraph.content}/>))
            }
        </div>
    )
})

export default ParagraphList;