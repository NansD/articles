const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
require('../db');

module.exports.read = async (event, context) => {
  const statusCode = 200;
  const message = 'paragraph read endpoint called';
  let paragraph;
  let paragraphs;
  const _id = (event.pathParameters && event.pathParameters.hasOwnProperty('_id'))
    ? sanitize(event.pathParameters._id)
    : false;
  if (!_id) {
    paragraphs = await Paragraph.find({});
  } else {
    paragraph = await Paragraph.findOne({ _id });
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      paragraph,
      paragraphs,
    }),
  };
};
