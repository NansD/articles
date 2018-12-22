import React, { Component } from 'react';
import ArticleList from './ArticleList';
import axios from 'axios';
import ParagraphContainer from "../paragraph/ParagraphContainer";

class ArticleManager extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            articleToDisplay: '',
            inputClasses: 'input',
            inputIsError: false,
            change: {
                articleName : ''
            }
        }
    }

    showParagraph(e) {
        this.setState({
            articleToDisplay: e.target.name,
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3000/article').then(res => {
            console.log(res.data.articles);
            this.setState({
                results:res.data.articles
            })
        });
    }

    addParagraph = () => {
        const title = this.state.change.articleName.trim();
        if(title) {
            axios.post('http://localhost:3000/article',"title="+title).then((res) => {
                this.setState(prevState => ({
                    inputClasses: 'input',
                    inputIsError: false,
                    results: [...prevState.results, {
                        _id: res.data.id,
                        title: title
                    }]
                }))
            })
        } else {this.setState({
            inputClasses: 'input is-error',
            inputIsError: true,
        })}
    };

    delParagraph = (e) => {
        axios.delete('http://localhost:3000/article/' + e.target.id).then(res => {
            axios.get('http://localhost:3000/article').then(res => {
                this.setState({
                    results:res.data.articles
                })
            })
        })
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
        const article = this.state.articleToDisplay ? <ParagraphContainer articleid={this.state.articleToDisplay}/> : null;
        return (
            <div className="">
                <div className="container">
                    <div>
                        <button className="btn is-success" onClick={this.addParagraph}>Ajouter un article</button>
                        <input type="text" className={this.state.inputClasses} name="articleName" value={this.state.change.articleName} onChange={this.handleChange.bind(this)}/>
                        {this.state.inputIsError && <div>Veuillez donner un nom à votre article.</div>}
                    </div>
                </div>
                <section className="container with-title">
                    <h2 className="title">Liste des Articles <i className="nes-logo"/></h2>
                    <ArticleList results={this.state.results} showParagraph={this.showParagraph.bind(this)} delParagraph={this.delParagraph}/>
                </section>
                {article}
            </div>
        );
    }
}

export default ArticleManager;