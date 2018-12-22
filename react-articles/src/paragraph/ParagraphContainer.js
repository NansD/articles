import React, { Component } from 'react';
import Paragraph from "./Paragraph";
import axios from "axios";

class ParagraphContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paragraphs: [],
            id: 0,
            name: '',
            change: {
                paragraphContent: '',
            },
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/article/' + this.props.articleid).then(res => {
            this.setState({
                name: res.data.article.title,
                paragraphs: res.data.article.paragraphs
            });
        });
    }

    addParagraph = () => {
        this.setState(state => {
            let id = this.state.id + 1;
            const paragraphs = [...state.paragraphs, {id:id, text: this.state.change.paragraphContent}];

            return {
                paragraphs,
                id: id,
                change: {
                    paragraphContent: '',
                },
            };
        });
    };



    //Gérer les les changements d'input
    handleChange(e) {
        this.setState({
            change : {
                ...this.state.change,
                [e.target.name] : e.target.value,
            },
        });
    };


    render() {
        return(
            <div className="">
                <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph.bind(this)}>Ajouter un paragraphe</button>
                        <input type="text" className="input" name="paragraphContent" value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <section className="container with-title">
                    <h2 className="title">{this.state.name} <i className="snes-logo"/></h2>
                    <div className="containers">
                        {
                            this.state.paragraphs.map((paragraph) => (<Paragraph key={paragraph.id} content={paragraph.content}/>))
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default ParagraphContainer;