const bcrypt = require('bcrypt');

/**
 * @param {Mongoose.Schema} schema
 * @param {string} field
 * @param {boolean} required
 * @param {int} saltingRounds
 * @param {string} comparisonFunction
 */
module.exports = (schema, {
  field = 'password',
  required = true,
  saltingRounds = 10,
  comparisonFunction = 'comparePassword',
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
  schema.methods[comparisonFunction] = function (candidate) {
    return bcrypt.compare(candidate, this.password)
      .catch(() => false);
  };
};
