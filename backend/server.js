const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const connectMongoose = require('./helpers/mongoose');
const { errorHandler, responseErrorHandler } = require('./plugins/express/errorHandler');
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

  // Add error handler to responses
  app.use(responseErrorHandler);

  // Register API routes
  app.use('/api', api);

  // Serve public/index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Register custom error handler (should registered last be last)
  app.use(errorHandler);

  connectMongoose()
    .then(() => {
      app.listen(PORT);
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
};

createServer();
