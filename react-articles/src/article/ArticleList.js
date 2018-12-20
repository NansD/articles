import React, { Component } from 'react';

const ArticleList = (props) => {
    var options = [];

    if (props.results) {
        options = props.results.map(article => (
            <div key={article.id}><button className="btn" id={article.id} onClick={props.showParagraph}>{article.name}</button><i className="icon close"/></div>
        ))
    }
    return <div>{options}</div>
};

export default ArticleList;