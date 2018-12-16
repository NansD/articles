const mongoose = require('mongoose');

const mongodbUri = 'mongodb://admin:foo1bar@ds129386.mlab.com:29386/articles'; // very secure credentials
mongoose.connect(mongodbUri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { });
