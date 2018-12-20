const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
const Article = require('../../models/article');
require('../db');

module.exports.create = async (event, context) => {
  const statusCode = 200;
  const message = 'article create endpoint called, article successfully created';
  const formData = sanitize(queryString.parse(event.body));

  const article = await Article.create(formData);

  return {
    statusCode,
    body: JSON.stringify({
      message,
      article,
    }),
  };
};
