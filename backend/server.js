const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const connectMongoose = require('./helpers/mongoose');
const errorHandler = require('./plugins/express/errorHandler');
const api = require('./routes/api');

const PORT = process.env.PORT || 3016;

const createServer = () => {
  const app = express();

  // Initialize passport
  app.use(passport.initialize());

  // Configure body parser to accept json
  app.use(bodyParser.json());

  // Register handler for static assets
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Register HTTP request logger
  app.use(morgan('dev'));

  // Register custom error handler
  app.use(errorHandler);

  // Register API routes
  app.use('/api', api);

  // Serve public/index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  connectMongoose()
    .then(() => {
      app.listen(PORT);
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
};

createServer();
