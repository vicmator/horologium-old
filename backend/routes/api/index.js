const express = require('express');
const fs = require('fs');
const path = require('path');

const router = new express.Router();

fs.readdirSync(__dirname).forEach((file) => {
  const fileName = path.basename(file, path.extname(file));
  const filePath = path.join(__dirname, file);

  if (__filename !== filePath) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    router.use(`/${fileName}`, require(`./${fileName}`));
  }
});

// Return 404 for the rest of the routes
router.use('*', (req, res) => {
  res.status(404).end();
});

module.exports = router;
