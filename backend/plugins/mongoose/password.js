const bcrypt = require('bcrypt');

/**
 * @param {Mongoose.Schema} schema
 * @param {string} field
 * @param {boolean} required
 * @param {int} saltingRounds
 */
module.exports = (schema, {
  field = 'password',
  required = true,
  saltingRounds = 10,
} = {}) => {
  schema.add({
    [field]: {
      type: String,
      required,
    },
  });

  schema.pre('save', function schemaWithPasswordPreSave(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      return next();
    }

    // generate a hash
    return bcrypt.hash(this.password, saltingRounds)
      .then((hash) => {
        // override the clear text password with the hashed one
        this.password = hash;
        return next();
      })
      .catch(err => next(err));
  });

  // eslint-disable-next-line no-param-reassign
  schema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
      .catch(() => false);
  };
};
