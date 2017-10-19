const mongoose = require('mongoose');

mongoose.Promise = Promise;

let connectionPromise = null;

const MONGODB_URI = 'mongodb://database/horologium';

module.exports = () => {
  if (connectionPromise === null) {
    connectionPromise = mongoose.connect(MONGODB_URI, {
      useMongoClient: true,
    });
  }

  return connectionPromise;
};
