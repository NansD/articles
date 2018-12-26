import React from 'react';
import Paragraph from './Paragraph';
import EditableParagraph from './EditableParagraph'
import {SortableContainer} from 'react-sortable-hoc';

const ParagraphList = SortableContainer((props) => {
    return (
        <div className="container">
            {
                props.items.map((paragraph,index) => (paragraph.toEdit ? <EditableParagraph key={paragraph._id}
                                                                                            name={index}
                                                                                            index={index}
                                                                                            content={paragraph.content}
                                                                                            handleChange={props.handleChange}
                                                                                            para={paragraph._id}
                                                                                            handleKeyDown={props.handleKeyDown}/> :
                                                                         <Paragraph key={paragraph._id}
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