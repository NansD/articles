import React, { Component } from 'react';
import ParagraphList from './ParagraphList';
import axios from "axios";
import {arrayMove} from 'react-sortable-hoc';


class ParagraphContainer extends Component {
    //initialization of component's state
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

    //display the article on the first click using props
    componentDidMount() {
        if(this.props.newArticle) {
            this.setState({
                editionMode: true
            })
        };
        this.updateFrontParagraph();
    }

    // update the displayed paragraphs according to the
    // article that will be displayed
    componentWillReceiveProps(nextProps) {
        if(nextProps.newArticle) {
            this.setState({
                editionMode: true
            })
        };
        this.updateFrontParagraph(nextProps.articleid);
    }

    //Method displaying the paragraphs of an article
    updateFrontParagraph = (articleId) => {
        const articleIdToQuery = articleId || this.props.articleid
        axios.get('http://localhost:3000/article/' + articleIdToQuery).then(res => {
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

    //Add a paragraph to the article
    //Add the paragraph to the dtabase using Post request
    //Using paragraphs.length as the order to boost performance
    addParagraph = () => {
        const order = this.state.paragraphs.length + 1;
        const content = this.state.change.paragraphContent ? this.state.change.paragraphContent : "Nouveau Paragraphe";
        axios.post('http://localhost:3000/paragraph',"articleId=" + this.props.articleid + "&order=" + order + "&content=" + content).then(
            this.updateFrontParagraph()
        )
    };


    //Handle inputs change for every inputs in the page
    handleChange(e) {
        this.setState({
            change : {
                ...this.state.change,
                [e.target.name] : e.target.value,
            },
        });
    };

    //Toggle if the user can edit the paragraphs or not
    toggleEditionMode = () => {
        const newEditionMode = !this.state.editionMode;
        this.setState({
            editionMode : newEditionMode,
        })
    };

    //Passing toEdit value to true will display a textarea instead of div (permitting edition)
    editParagraph = (e) => {
        if (this.state.editionMode) {
            let paragraphs = [...this.state.paragraphs];
            paragraphs[e.target.dataset.id].toEdit = true;
            this.setState({paragraphs});
        }
    };

    //Handle the edition of a paragraph during tapping
    handleChangeParagraph = (e) => {
        let paragraphs = [...this.state.paragraphs];
        paragraphs[e.target.name].content = e.target.value;
        this.setState({paragraphs});
    };

    //Deletes a pargraph in the database and in the state
    delParagraph = (e) => {
        const id = e.target.dataset.id;
        axios.delete("http://localhost:3000/paragraph/" + id).then(
            this.updateFrontParagraph()
        )
    };

    //Handle key down in the textarea durinf edition of a paragraph
    //27 = ESC key -- 13 = Ebter key
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

    //Handle end of sorting (given by the react-sortable-hoc library)
    //Editing the paragraphs' orders in the database
    onSortEnd = ({oldIndex, newIndex, collection}, e) => {
        this.setState({
            paragraphs: arrayMove(this.state.paragraphs, oldIndex, newIndex)
        }, () => {
            // If we keep the RESTful approach for the backend, we have to do this :
            // let id;
            // this.state.paragraphs.forEach(function (paragraph, index) {
            //     id = paragraph._id;
            //     axios.patch("http://localhost:3000/paragraph/" + id,"_id=" + id + "&order=" + index);
            // })
            //
            // but instead we have decided to create a route to allow to update
            // several paragraphs at a time :
            axios.patch('http://localhost:3000/paragraphs', "paragraphs="+JSON.stringify(this.state.paragraphs));
        });        
        
        
    };


    //Rendering the paragraph container component
    render() {
        return(
            <div>
                <button className="btn is-warning" onClick={this.toggleEditionMode}>{this.state.editionMode ? "Désactiver l'édition des paragraphes" : "Activer l'édition des paragraphes"}</button>
                {this.state.editionMode && <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph}>Ajouter un paragraphe</button>
                        <input type="text" className="input" name="paragraphContent" value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>}
                <section className="container with-title">
                    <h2 className="title">{this.state.name} <i className="snes-logo"/></h2>
                    {/*distance is used for avoiding the mixing of onClick to start edition and the click for sorting elements*/}
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