import React, { Component } from 'react';
import ArticleList from './ArticleList';
import axios from 'axios';
import ParagraphContainer from "../paragraph/ParagraphContainer";

class ArticleManager extends Component {
    //initalization of state's component
    constructor() {
        super();
        this.state = {
            results: [],
            articleToDisplay: '',
            inputClasses: 'input',
            inputIsError: false,
            newArticle: false,
            change: {
                articleName : ''
            }
        }
    }

    //Change articleToDisplay value which leads to display the paragraph clicked
    showParagraph(e) {
        this.setState({
            articleToDisplay: e.target.name,
        })
    }

    //On mounting: get all the articles
    componentDidMount() {
        axios.get('http://localhost:3000/article').then(res => {
            this.setState({
                results:res.data.articles
            })
        });
    }

    //Adds an article in the db and in the front app
    addArticle = () => {
        const title = this.state.change.articleName.trim();
        if(title) {
            axios.post('http://localhost:3000/article',"title="+title).then((res) => {
                this.setState(prevState => ({
                    inputClasses: 'input',
                    inputIsError: false,
                    results: [...prevState.results, {
                        _id: res.data.article._id,
                        title: title
                    }],
                    newArticle: true,
                    articleToDisplay: res.data.article._id
                }));
            });
        } else {this.setState({
            inputClasses: 'input is-error',
            inputIsError: true,
        })}
    };

    //Deletes an article in the db and in the front app
    delArticle = (e) => {
        const id = e.target.id;
        axios.delete('http://localhost:3000/article/' + id).then(res => {
            axios.get('http://localhost:3000/article').then(res => {
                this.setState({
                    results:res.data.articles
                })
            })
        });
        //Supress the paragraphs of the page if the articled deleted is the one being displayed
        if(id === this.state.articleToDisplay) {
            this.setState({
                articleToDisplay: null
            })
        }
    };

    //Handle input changes (for new article name)
    handleChange(e) {
        this.setState({
            change : {
                ...this.state.change,
                [e.target.name] : e.target.value,
            },
        });
    };

    render() {
        //Show the paragraphs of an article if one of them is clicked
        //Otherwise: nothing
        const article = this.state.articleToDisplay ? <ParagraphContainer articleid={this.state.articleToDisplay}
                                                                          newArticle={this.state.newArticle}/> : null;
        return (
            <div className="">
                <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addArticle}>Ajouter un article</button>
                        <input type="text" className={this.state.inputClasses} name="articleName" value={this.state.change.articleName} onChange={this.handleChange.bind(this)}/>
                        {this.state.inputIsError && <div>Veuillez donner un nom à votre article.</div>}
                    </div>
                </div>
                <section className="container with-title">
                    <h2 className="title">Liste des Articles <i className="nes-logo"/></h2>
                    <ArticleList results={this.state.results} showParagraph={this.showParagraph.bind(this)} delArticle={this.delArticle}/>
                </section>
                {article}
            </div>
        );
    }
}

export default ArticleManager;