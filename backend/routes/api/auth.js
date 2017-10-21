const express = require('express');
const { sign } = require('jsonwebtoken');

const config = require('../../config.json');
const { Unauthorized } = require('../../error/httpStatusCodeErrors');
const { User } = require('../../models');

const router = new express.Router();

/**
 * Generates a new jwt
 * @param {User} user
 * @return {Promise}
 */
const generateToken = user => new Promise((res, rej) => {
  sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    },
    config.authentication.jwtSecret,
    {
      expiresIn: config.authentication.jwtExpiration,
    },
    (err, token) => {
      if (err) {
        rej();
      }

      res(token);
    }
  );
});

/**
 * Route: /api/auth/token
 * Method: POST
 *
 * Authenticates an user and returns a jwt if successful
 */
router.post('/token', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Unauthorized();
      }

      return user.comparePassword(req.body.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized();
          }

          return generateToken(user)
            .then(token => res.send({ token }));
        });
    })
    .catch(res.errorHandler);
});

module.exports = router;
