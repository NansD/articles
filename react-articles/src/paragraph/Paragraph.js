import React, { Component } from 'react';
import {SortableElement} from 'react-sortable-hoc';

const Paragraph = SortableElement((props) => {

    /*
    handleChange(e) {
        this.setState({
            change : {
                ...this.state.change,
                [e.target.name] : e.target.value,
            },
        });
    };

    handleKeyDown(e) {
        if (e.keyCode === 27) {
            e.target.blur();
            this.setState({
                change: {
                    content: this.state.beforeOnClick
                },
                isModified: !this.state.isModified
            })
        }
        if (e.keyCode === 13) {
            e.target.blur();
            this.setState({
                isModified: !this.state.isModified
            })
        }
    }

    handleBlur() {
        this.setState({
            isModified: !this.state.isModified
        });
    }

    takeOnClickValue() {
        const content = this.state.change.content;
        this.setState({
            beforeOnClick: content,
            isModified: !this.state.isModified,
        })
    }

    delParagraph = () => {
        this.setState({
            isToDisplay: !this.state.isToDisplay,
        })
    };*/

            return(<div className="container handle"><i className="icon close" onClick={props.delParagraph} data-id={props.para}/><div onClick={props.editParagraph} data-id={props.name}>{props.content}</div></div>)
});

export default Paragraph;