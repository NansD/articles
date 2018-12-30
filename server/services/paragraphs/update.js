const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
require('../db');

module.exports.update = async (event, context) => {
  let statusCode = 200;
  let message = 'paragraphs endpoint called. Paragraphs successfully updated';
  const formData = sanitize(queryString.parse(event.body));
  const paragraphs = JSON.parse(queryString.parse(event.body).paragraphs);
  if (!formData.paragraphs) {
    statusCode = 400;
    message = 'Wrong parameters';
  } else {
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      paragraph = {
        ...paragraph,
        order: i,
      };
      await Paragraph.findOneAndUpdate({ _id: paragraph._id }, paragraph);
    }
  }


  return {
    statusCode,
    body: JSON.stringify({
      message,
      paragraphs: formData.paragraphs,
    }),
  };
};
