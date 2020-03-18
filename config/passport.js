const JwtStrategy = require("passport-jwt").Strategy; // Create JWT Strategy for passport authentication
const ExtractJwt = require("passport-jwt").ExtractJwt; // Create Extractor functions that look for JWT token in Auth Header
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
// Two require parameters for JWT JWTStrategy
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Look for JWT as bearer token (cryptic string) from the Auth Header
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jtw_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(error => console.log(error));
  }));
}
