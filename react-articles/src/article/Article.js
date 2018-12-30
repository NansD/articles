import React from 'react';

const Article = (props) => {
    //Onclick of an article component = display its paragraphs
  return (<div>
            <button className="btn"
                    name={props.id}
                    onClick={props.showParagraph}>
                        {props.title}
            </button>
      {/*i used to delete article on click*/}
            <i onClick={props.delArticle}
               id={props.id}
               className="icon close"/>
           </div>)
};

export default Article;