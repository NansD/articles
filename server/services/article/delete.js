const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
const Article = require('../../models/article');
require('../db');

module.exports.delete = async (event, context) => {
  console.log(event);
  const _id = (event.pathParameters && event.pathParameters.hasOwnProperty('_id'))
    ? sanitize(event.pathParameters._id)
    : false;
  let statusCode = 200;
  let message = 'article delete endpoint called';
  let article;
  if (!_id) {
    statusCode = 400;
    message = 'article delete endpoint called, please specify an id';
  } else {
    await Paragraph.deleteMany({ articleId: _id });
    article = await Article.findOneAndDelete({ _id });
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      article,
    }),
  };
};
