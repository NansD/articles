const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
require('../db');

module.exports.delete = async (event, context) => {
  let statusCode = 200;
  let message = 'paragraph delete endpoint called';
  let paragraph;
  const _id = (event.pathParameters && event.pathParameters.hasOwnProperty('_id'))
    ? sanitize(event.pathParameters._id)
    : false;
  if (_id) {
    paragraph = await Paragraph.findOneAndDelete({ _id });
    message += ' paragraph successfully deleted';
  } else {
    statusCode = 400;
    message = 'paragraph delete endpoint called, please specify an id';
  }


  return {
    statusCode,
    body: JSON.stringify({
      message,
      paragraph,
    }),
  };
};
