const queryString = require('querystring');
const sanitize = require('mongo-sanitize');
const Paragraph = require('../../models/paragraph');
require('../db');

module.exports.update = async (event, context) => {
  let statusCode = 200;
  let paragraph;
  let message = 'paragraph update endpoint called, paragraph successfully updated';
  const formData = sanitize(queryString.parse(event.body));
  const _id = (event.pathParameters && event.pathParameters.hasOwnProperty('_id'))
    ? sanitize(event.pathParameters._id)
    : false;
  if (_id && _id === formData._id) {
    // Lorsqu'on update le paragraphe, il a un nouvel ordre
    // Il peut s'agir d'un numéro d'ordre qui est déjà utilisé
    // On va décaler les ordres des paragraphes existants après
    const articleParagraphs = await Paragraph.find({ articleId: formData.articleId });
    for (let i = 0; i < articleParagraphs.length; i++) {
      const p = articleParagraphs[i];
      if (p._id != _id && formData.order && p.order >= formData.order) {
        p.order += 1;
        await Paragraph.findOneAndUpdate({ _id: p._id }, p);
      }
    }
    paragraph = await Paragraph.findOneAndUpdate({ _id }, formData, { new: true });
  } else {
    statusCode = 400;
    message = 'Bad request';
  }

  if (paragraph == null) {
    statusCode = 404;
    message = 'Paragraph not found';
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      paragraph,
    }),
  };
};
