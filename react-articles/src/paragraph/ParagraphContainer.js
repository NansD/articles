import React, { Component } from 'react';
import ParagraphList from './ParagraphList';
import axios from "axios";
import {arrayMove} from 'react-sortable-hoc';


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

    componentWillReceiveProps(nextProps) {
        if(nextProps.newArticle) {
            this.setState({
                editionMode: true
            })
        };
        this.updateFrontParagraph();
    }

    componentDidMount() {
        if(this.props.newArticle) {
            this.setState({
                editionMode: true
            })
        };
        this.updateFrontParagraph();
    }

    updateFrontParagraph = () => {
        console.log("ceci est un test")
        axios.get('http://localhost:3000/article/' + this.props.articleid).then(res => {
            let paragraphs = res.data.article.paragraphs;

            paragraphs.sort(function (a, b) {
                return a.order - b.order;
            });

            paragraphs.map((paragraph,index) => {
                paragraphs[index].toEdit = false;
                paragraphs[index].previousContent = paragraph.content;
            });

            this.setState({
                name: res.data.article.title,
                paragraphs: paragraphs,
            });
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

    toggleEditionMode = () => {
        const newEditionMode = !this.state.editionMode;
        this.setState({
            editionMode : newEditionMode,
        })
    };

    editParagraph = (e) => {
        if (this.state.editionMode) {
            let paragraphs = [...this.state.paragraphs];
            paragraphs[e.target.dataset.id].toEdit = true;
            this.setState({paragraphs});
        }
    };

    handleChangeParagraph = (e) => {
        let paragraphs = [...this.state.paragraphs];
        paragraphs[e.target.name].content = e.target.value;
        this.setState({paragraphs});
    };

    delParagraph = (e) => {
        const id = e.target.dataset.id;
        axios.delete("http://localhost:3000/paragraph/" + id).then(
            this.updateFrontParagraph()
        )
    };

    handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            let paragraphs = [...this.state.paragraphs];
            paragraphs[e.target.name].toEdit = false;
            paragraphs[e.target.name].content = paragraphs[e.target.name].previousContent;
            this.setState({paragraphs});
        }
        if (e.keyCode === 13) {
            const id = e.target.dataset.id;
            let paragraphs = [...this.state.paragraphs];
            axios.patch("http://localhost:3000/paragraph/" + id,"_id=" + id + "&content=" + paragraphs[e.target.name].content).then(
                paragraphs[e.target.name].toEdit = false
            );
            paragraphs[e.target.name].previousContent = paragraphs[e.target.name].content;
            this.setState({paragraphs});
            e.target.blur();
        }
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
                <button className="btn is-warning" onClick={this.toggleEditionMode}>{this.state.editionMode ? "Consulter les paragraphes" : "Editer les paragraphes"}</button>
                {this.state.editionMode && <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph}>Ajouter un paragraphe</button>
                        <input type="text" className="input" name="paragraphContent" value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>}
                <section className="container with-title">
                    <h2 className="title">{this.state.name} <i className="snes-logo"/></h2>
                    <ParagraphList distance={2}
                                   items={this.state.paragraphs}
                                   onSortEnd={this.onSortEnd}
                                   handleChange={this.handleChangeParagraph}
                                   editParagraph={this.editParagraph}
                                   delParagraph={this.delParagraph}
                                   handleKeyDown={this.handleKeyDown}/>
                </section>
            </div>
        )
    }
}

export default ParagraphContainer;