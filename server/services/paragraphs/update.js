const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
require('../db');

/**
 * Allows the update of multiple paragraphs at once
 */
module.exports.update = async (event, context) => {
  let statusCode = 200;
  let message = 'paragraphs endpoint called. Paragraphs successfully updated';
  const formData = sanitize(queryString.parse(event.body));
  const paragraphs = JSON.parse(queryString.parse(event.body).paragraphs);
  if (!formData.paragraphs) {
    statusCode = 400;
    message = 'Wrong parameters';
  } else {
    // the frontend sends us an array of paragraphs which are
    // ordered accordingly to the interface
    // so we update each paragraph with its correct order
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
