const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/user");

// Local Strategy
const localOptions = {
  usernameField: "email"
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

// Tell passport to use this strategy
passport.use(localLogin);
