const mongoose = require('mongoose');

const password = require('../plugins/mongoose/password');
const timestamps = require('../plugins/mongoose/timestamps');

const ROLES = {
  user: 'user',
  admin: 'admin',
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: ROLES.user,
  },
}, { collection: 'users' })
  .plugin(password)
  .plugin(timestamps);

// TODO Probably for production autoIndex should be disabled as suggested by mongoose documentation

module.exports = mongoose.model('User', UserSchema);
