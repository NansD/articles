import React, { Component } from 'react';

const Article = (props) => {
  return (<div>
            <button className="btn"
                    name={props.id}
                    onClick={props.showParagraph}>
                        {props.title}
            </button>
            <i onClick={props.delParagraph}
               id={props.id}
               className="icon close"/>
           </div>)
};

export default Article;