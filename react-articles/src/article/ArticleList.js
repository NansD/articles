import React from 'react';
import Article from "./Article";

const ArticleList = (props) => {
    var options = [];
    if (props.results) {
        //mapping the article list to display them
        options = props.results.map(article => (
            <Article key={article._id}
                     id={article._id}
                     title={article.title}
                     showParagraph={props.showParagraph}
                     delArticle={props.delArticle}/>
        ))
    }
    return <div>{options}</div>
};

export default ArticleList;