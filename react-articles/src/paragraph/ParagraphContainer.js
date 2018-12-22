import React, { Component } from 'react';
import ParagraphList from './ParagraphList';
import axios from "axios";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


class ParagraphContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paragraphs: [],
            id: 0,
            name: '',
            orderMax:0,
            change: {
                paragraphContent: '',
            },
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/article/' + this.props.articleid).then(res => {
            let paragraphs = res.data.article.paragraphs;
            let paragraphToCards = [];
            let counter = 0;

            paragraphs.sort(function (a, b) {
                return a.order - b.order;
            });

            console.log(paragraphs);

            this.setState({
                name: res.data.article.title,
                paragraphs: paragraphs,
            });
        });
    }

    maxParagraph = () => {
        this.state.paragraphs.forEach((paragraph) => {
            if(this.state.orderMax <= paragraph.order) {
                this.setState({
                    orderMax: paragraph.order
                })
            }
        })
    };

    addParagraph = () => {
        this.maxParagraph();
        const order = this.state.orderMax + 1;
        axios.post('http://localhost:3000/paragraph',"articleId=" + this.props.articleid + "&order=" + order + "&content=" + this.state.change.paragraphContent)
        /*this.setState(state => {
            let id = this.state.id + 1;
            const paragraphs = [...state.paragraphs, {id:id, text: this.state.change.paragraphContent}];

            return {
                paragraphs,
                id: id,
                change: {
                    paragraphContent: '',
                },
            };
        });*/
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

    onSortEnd = ({oldIndex, newIndex, collection}, e) => {
        const id = this.state.paragraphs[oldIndex]._id;
        axios.patch("http://localhost:3000/paragraph/" + id,"_id=" + id + "&order=" + newIndex).then(
            this.setState({
                paragraphs: arrayMove(this.state.paragraphs, oldIndex, newIndex),
            })
        );
    };



    render() {
        return(
            <div className="">
                <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph}>Ajouter un paragraphe</button>
                        <input type="text" className="input" name="paragraphContent" value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <section className="container with-title">
                    <h2 className="title">{this.state.name} <i className="snes-logo"/></h2>
                    <ParagraphList items={this.state.paragraphs} onSortEnd={this.onSortEnd}/>
                </section>
            </div>
        )
    }
}

export default ParagraphContainer;