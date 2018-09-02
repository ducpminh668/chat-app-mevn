const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = mongoose.connect(
  'mongodb://localhost:27017/mevn-chat',
  { promiseLibrary: require('bluebird'), useNewUrlParser: true },
);
