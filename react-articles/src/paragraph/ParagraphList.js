import React from 'react';
import Paragraph from './Paragraph';
import EditableParagraph from './EditableParagraph'
import {SortableContainer} from 'react-sortable-hoc';

const ParagraphList = SortableContainer((props) => {
    return (
        <div className="container">
            {
                props.items.map((paragraph,index) => (paragraph.toEdit ? <EditableParagraph key={paragraph.id}
                                                                                            name={index}
                                                                                            index={index}
                                                                                            content={paragraph.content}
                                                                                            handleChange={props.handleChange}
                                                                                            editParagraph={props.editParagraph}
                                                                                            idParagraph={paragraph._id}
                                                                                            delParagraph={props.delParagraph} /> :
                                                                        <Paragraph key={paragraph.id}
                                                                                   name={index}
                                                                                   index={index}
                                                                                   content={paragraph.content}
                                                                                   handleChange={props.handleChange}
                                                                                   editParagraph={props.editParagraph}
                                                                                   para={paragraph._id}
                                                                                   delParagraph={props.delParagraph} />))
            }
        </div>
    )
});

export default ParagraphList;