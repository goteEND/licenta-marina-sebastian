const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const User = require("../../model/User");

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post("/register", (req, res) => {
  let { name, email, password, confirm_password } = req.body;
  // Min Password
  if (password.length < 8) {
    return res.status(400).json({
      msg: "Password too short",
    });
  }
  // Match Passwords
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Passwords do not match",
    });
  }
  // Check for the Unique Email
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Email is already registred",
      });
    } else {
      // The data is valid and new we can register the user
      let newUser = new User({
        name,
        password,
        email,
        profesor: " ",
        title: " ",
        year: " ",
      });
      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            return res.status(201).json({
              success: true,
              msg: "User is now registered",
            });
          });
        });
      });
    }
  });
  // // The data is valid and new we can register the user
  // let newUser = new User({
  //   name,
  //   password,
  //   email,
  //   profesor: " ",
  //   title: " ",
  //   year: " "
  // });
  // // Hash the password
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) throw err;
  //     newUser.password = hash;
  //     newUser.save().then(user => {
  //       return res.status(201).json({
  //         success: true,
  //         msg: "Hurry! User is now registered."
  //       });
  //     });
  //   });
  // });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "Email is not found.",
        success: false,
      });
    }
    // If there is user we are now going to compare the password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // User's password is correct and we need to send the JSON Token for that user

        const payload = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          profesor: user.profesor,
          title: user.title,
          year: user.year,
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 60 * 60 * 12,
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user: user,
              msg: "You are now logged in.",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password.",
          success: false,
        });
      }
    });
  });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);
module.exports = router;
