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
        }
    }

    showParagraph(e) {
        this.setState({
            articleToDisplay: e.target.id,
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

    render() {
        const article = this.state.articleToDisplay ? <ParagraphContainer articleid={this.state.articleToDisplay}/> : null;
        return (
            <div className="">
                <div className="container">
                    <div>
                        <button className="btn is-success" /*onClick={this.addParagraph.bind(this)}*/>Ajouter un article</button>
                        <input type="text" className="input" name="paragraphContent" /*value={this.state.change.paragraphContent} onChange={this.handleChange.bind(this)}*//>
                    </div>
                </div>
                <section className="container with-title">
                    <h2 className="title">Liste des Articles <i className="nes-logo"/></h2>
                    <ArticleList results={this.state.results} showParagraph={this.showParagraph.bind(this)}/>
                </section>
                {article}
            </div>
        );
    }
}

export default ArticleManager;