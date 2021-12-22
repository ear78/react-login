const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const User = mongoose.model('User', userModel.UserSchema);

const loginRequired = (req, res, next) => {
  jwt.verify(req.cookies.authcookie, 'SECURED', (err, decode) => {
    if (err) {
      req.user = undefined;
      res.status(401).send('Not Authorized.');
    }
    console.log(decode);
    req.user = decode;
    next();
  });
};

const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    // eslint-disable-next-line no-param-reassign
    user.hashPassword = undefined;
    return res.json(user);
  });
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  // eslint-disable-next-line consistent-return
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. No user found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        const webToken = jwt.sign({ email: user.email, username: user.username, _id: user.id }, 'SECURED');

        // Set cookie 'Expires 60 minutes'
        res.cookie('authcookie', webToken, { maxAge: 600000, httpOnly: true });
        return res.json(webToken);
      }
    }
  });
};

module.exports = {
  loginRequired,
  login,
  register,
};
