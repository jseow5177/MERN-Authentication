// For user registration and login

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // passowrd hashing function
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User model
const User = require("../../models/User");

// User registration
router.post("/register", (req, res) => {
  // Form validation
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    // Bad request
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    if (user) { // If user exists
      return res.status(400).json({email: "Email already exists"});
    } else { // Create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password with bcrypt
      bcrypt.genSalt(10, (error, salt) => { // 10 salt rounds
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser.save()
                 .then(user => res.json(user))
                 .catch(error => res.json(error));
        });
      });
    }
  });
});

// User login
router.post("/login", (req, res) => {
  //Form validation
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({email: email}).then(user => {
    if (!user) { // If user doesn't exist
      return res.status(400).json({emailNotFound: "Email not found"});
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) { // Password matches, create JWT payload
        const payLoad = {
          id: user.id,
          name: user.name
        };
        // Create and sign token
        // Expires in 1 year
        jwt.sign(payLoad, keys.secretOrKey, {expiresIn: 31556926}, (error, token) => {
            res.json({success: true, token: "Bearer " + token});
          });
      } else {
        return res.status(400).json({passwordIncorrect: "Password incorrect"});
      }
    });
  });
});

module.exports = router;
