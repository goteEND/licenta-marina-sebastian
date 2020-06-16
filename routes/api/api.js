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

// ADMIN EDIT

// Admin get
router.get("/adminEdit", async (req, res) => {
  await User.find({}, (err, result) => {
    // console.log(err, result);
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  }).select("_id title year name profesor role");
});

// Admin post
router.post("/adminEdit", async (req, res) => {
  const { _id, name, profesor, title, year, role } = req.body;
  await User.findByIdAndUpdate(
    { _id: _id },
    {
      $set: { name, profesor, title, year, role }
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

// Admin delete
router.delete("/adminEdit/:id", async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
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

module.exports = router;
