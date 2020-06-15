const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../../model/User");
const Post = require("../../model/Post");

// Api Get Users
router.get("/users", async (req, res) => {
  await User.find({ role: "student" }, (err, result) => {
    // console.log(err, result);
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Stundent Table
router.get("/studentTable", async (req, res) => {
  await User.find(
    { role: "student", profesor: { $ne: " " } },
    (err, result) => {
      // console.log(err, result);
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("title year profesor");
});

// Admin Table
router.get("/adminTable", async (req, res) => {
  await User.find({ role: "student" }, (err, result) => {
    // console.log(err, result);
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  }).select("title year name email profesor");
});

// Profesor Table
router.get("/profesorTable", async (req, res) => {
  await User.find(
    { role: "student", profesor: req.query.prof.replace("_", " ") },
    (err, result) => {
      // console.log(err, result);
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("title year name email");
});

// Api Select Profesor Year and Title

router.post("/users", async (req, res) => {
  const { _id, profesor, anPrezentare, titluPrezentare } = req.body;

  await User.findByIdAndUpdate(
    { _id: _id },
    {
      $set: { profesor: profesor, year: anPrezentare, title: titluPrezentare }
    },
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
  const { _id, nume, profesor, anPrezentare, titluPrezentare } = req.body;
  await Post.create(
    {
      idOfStudent: _id,
      name: nume,
      title: titluPrezentare,
      year: anPrezentare,
      profesor: profesor
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
