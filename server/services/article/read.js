const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
const Article = require('../../models/article');
require('../db');

/**
 * @param event
 * @param context
 * @returns {Promise<{statusCode: number, body: string}>}
 *  si pas de filtre, je renvoie tous les articles et leurs paragraphes
    si filtre, je renvoie juste les articles avec leur titre
    si _id, je renvoie un article et ses paragraphes
 */

module.exports.read = async (event, context) => {
  let statusCode = 200;
  const message = 'article read endpoint called';
  const _id = (event.pathParameters && event.pathParameters.hasOwnProperty('_id'))
    ? sanitize(event.pathParameters._id)
    : false;

  const queryStringParameters = sanitize(event.queryStringParameters);
  let article;
  let articles;
  if (_id) {
    console.log('find only one article');
    article = await Article.findOne({ _id });
    if (article) {
      const paragraphs = await Paragraph.find({ articleId: article._id });
      console.log(article);
      article = {
        _id: article._id,
        title: article.title,
        paragraphs,
      };
    } else {
      statusCode = 404;
    }
  } else {
    articles = await Article.find();
    const articlesWithParagraphs = [];
    if (!queryStringParameters || !queryStringParameters.filter) {
      for (let i = 0; i < articles.length; i++) {
        articlesWithParagraphs.push({
          _id: articles[i]._id,
          title: articles[i].title,
          paragraphs: await Paragraph.find({ articleId: articles[i]._id }),
        });
        console.log(articles[i]);
      }
      articles = articlesWithParagraphs;
    }
  }


  return {
    statusCode,
    body: JSON.stringify({
      message,
      article,
      articles,
    }),
  };
};
