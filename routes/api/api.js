const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

// Api Get Users
router.get("/users", async (req, res) => {
  await User.find({}, (err, result) => {
    // console.log(err, result);
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Api Select Profesor and Year

router.post("/users", async (req, res) => {
  const update = { profesor: req.body.profesor, an: req.body.year };
  // console.log(req.body);

  await User.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { profesor: update.profesor, an: update.year } },
    { new: true },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Title Post

router.get("/userChoice", async (req, res) => {
  res.render("userChoice");
  // await Post.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
});

router.post("/userChoice", async (req, res) => {
  const { title } = req.body;
  await Post.create(
    {
      name: req.user.name,
      title: title,
      year: req.user.year,
      profesor: req.user.profesor
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
