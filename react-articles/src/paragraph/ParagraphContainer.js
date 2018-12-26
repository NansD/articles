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
            editionMode: false,
            change: {
                paragraphContent: '',
            },
        }
    }

    componentDidMount() {
        this.updateFrontParagraph();
    }

    updateFrontParagraph = () => {
        axios.get('http://localhost:3000/article/' + this.props.articleid).then(res => {
            let paragraphs = res.data.article.paragraphs;

            paragraphs.sort(function (a, b) {
                return a.order - b.order;
            });

            paragraphs.map((paragraph,index) => {
                paragraphs[index].toEdit = false
            });

            this.setState({
                name: res.data.article.title,
                paragraphs: paragraphs,
            });

            console.log(this.state.paragraphs);
        });
    };

    addParagraph = () => {
        const order = this.state.paragraphs.length + 1;
        const content = this.state.change.paragraphContent ? this.state.change.paragraphContent : "Nouveau Paragraphe";
        axios.post('http://localhost:3000/paragraph',"articleId=" + this.props.articleid + "&order=" + order + "&content=" + content).then(
            this.updateFrontParagraph()
        )
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

    handleChangeParagraph = (e) => {
        let paragraphs = [...this.state.paragraphs];
        paragraphs[e.target.name] = e.target.value;
        this.setState({paragraphs});
    };

    editParagraph = (e) => {
        if (this.state.editionMode) {
            let paragraphs = [...this.state.paragraphs];
            paragraphs[e.target.dataset.id].toEdit = true;
            this.setState({paragraphs});
        }
    };

    delParagraph = (e) => {
        console.log(e.target);
        const id = e.target.dataset.id;
        axios.delete("http://localhost:3000/paragraph/" + id).then(
            this.updateFrontParagraph()
        )
    };

    onSortEnd = ({oldIndex, newIndex, collection}, e) => {
        const id = this.state.paragraphs[oldIndex]._id;
        axios.patch("http://localhost:3000/paragraph/" + id,"_id=" + id + "&order=" + newIndex).then(
            this.setState({
                paragraphs: arrayMove(this.state.paragraphs, oldIndex, newIndex),
            })
        );
    };

    toggleEditionMode = () => {
        const newEditionMode = !this.state.editionMode;
        this.setState({
            editionMode : newEditionMode,
        })
    };


    render() {
        return(
            <div className="">
                <button className="btn is-warning" onClick={this.toggleEditionMode}>{this.state.editionMode ? "Consulter les paragraphes" : "Editer les paragraphes"}</button>
                {this.state.editionMode && <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph}>Ajouter un paragraphe</button>
                        <input type="text" className="input" name="paragraphContent" value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>}
                <section className="container with-title">
                    <h2 className="title">{this.state.name} <i className="snes-logo"/></h2>
                    <ParagraphList distance={2} items={this.state.paragraphs} onSortEnd={this.onSortEnd} handleChange={this.handleChangeParagraph} editParagraph={this.editParagraph} delParagraph={this.delParagraph}/>
                </section>
            </div>
        )
    }
}

export default ParagraphContainer;