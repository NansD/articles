const Paragraph = require('../../models/paragraph');
const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
require('../db');

module.exports.create = async (event, context) => {
  let statusCode = 200;
  let message = 'paragraph create endpoint called, paragraph successfully created';
  const formData = sanitize(queryString.parse(event.body));

  const paragraph = await Paragraph.create(formData);

  return {
    statusCode,
    body: JSON.stringify({
      message,
      paragraph,
    }),
  };
};
