import React, { Component } from 'react';
import ArticleList from './ArticleList';
import ParagraphContainer from "../paragraph/ParagraphContainer";

class ArticleManager extends Component {
    constructor() {
        super();
        this.state = {
            results: [
                {id: 3, name:"NansLUnique"},
                {id:4, name:"ValentinLExpert"}
            ],
            articleToDisplay: '',
        }
    }

    showParagraph(e) {
        this.setState({
            articleToDisplay: e.target.id,
        })
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