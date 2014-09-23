var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   name: { type: String, default: '' },
   email: { type: String, default: '' },
   username: { type: String, default: '' },
   provider: { type: String, default: '' },
   hashed_password: { type: String, default: '' },
   salt: { type: String, default: '' },
   authToken: { type: String, default: '' },
   facebook: {},
   twitter: {},
   github: {},
   google: {},
   linkedin: {}
});

UserSchema.virtual('password').set(function(password) {
   this._password = password;
   this.salt = this.makeSalt();
   this.hashed_password = this.encryptPassword(password);
    }).get(function() { return this._password });

var validatePresenceOf = function (value) {
   return value && value.length;
};


/* Pre save hook */ /*
UserSchema.pre('save', function(next) {
   if(!this.isNew)
      return next();
   
   if (!validatePresenceOf(this.password) && !this.skipValidation()) {
      next(new Error('Invalid password'));
   }else{
      next();
   }
})
*/
/* methods */
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    var encrypred;
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      return encrypred;
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */
/*
  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }*/
};

/* statics */
UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('User', UserSchema);
