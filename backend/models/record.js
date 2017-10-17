const mongoose = require('mongoose');

const owner = require('../plugins/mongoose/owner');
const tags = require('../plugins/mongoose/tags');
const comments = require('../plugins/mongoose/comments');
const timestamps = require('../plugins/mongoose/timestamps');

const RecordSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end: {
    type: Date,
  },
}, { collection: 'records' })
  .plugin(owner)
  .plugin(tags)
  .plugin(comments)
  .plugin(timestamps);

// TODO Probably for production autoIndex should be disabled as suggested by mongoose documentation
RecordSchema.index({ start: 1 });
RecordSchema.index({ end: 1 });

module.exports = mongoose.model('Record', RecordSchema);
