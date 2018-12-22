import React, { Component } from 'react';
import Article from "./Article";

const ArticleList = (props) => {
    var options = [];

    if (props.results) {
        options = props.results.map(article => (
            <Article key={article._id} id={article._id} title={article.title} showParagraph={props.showParagraph} delParagraph={props.delParagraph}/>
        ))
    }
    return <div>{options}</div>
};

export default ArticleList;