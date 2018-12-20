import React, { Component } from 'react';

class Paragraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beforeOnClick: '',
            isModified: true,
            isToDisplay: true,
            change: {
                content: ''
            },
        }
    }

    componentDidMount() {
        let content = this.props.content.length > 0 ? this.props.content : "Nouveau Paragraphe";
        this.setState({
            change: {
                content: content,
            },
        })
    }

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
    };

    render() {
        if (this.state.isToDisplay) {
            if (this.state.isModified)
                return(<textarea autoFocus={true} className="container" name="content" value={this.state.change.content}
                                 onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} onBlur={this.handleBlur.bind(this)}/>);
            else {
                return(<div className="container with-title"><i className="icon close" onClick={this.delParagraph.bind(this)}/><p onClick={this.takeOnClickValue.bind(this)}>{this.state.change.content}</p></div>)
            }
        } else return null;
    }
}

export default Paragraph;