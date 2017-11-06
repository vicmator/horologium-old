const express = require('express');

const jwt = require('../../plugins/express/jwt-auth');
const { Record } = require('../../models');

const router = new express.Router();

// Register jwt middleware in all routes (authentication is needed)
router.use(jwt);

/**
 * Route: /api/records
 * Method: GET
 *
 * Retrieves the list of all records (for an user)
 */
router.get('/', (req, res) => {
  Record
    .find({
      user: req.user.id,
    })
    .exec()
    .then(records => res.send(records));
});

/**
 * Route: /api/records
 * Method: POST
 *
 * Creates a new record entry (for an user)
 */
router.post('/', (req, res) => {
  Record.create({
    user: req.user.id,
  })
    .then((record) => {
      res.send(record);
    })
    .catch(res.errorHandler);
});

module.exports = router;
