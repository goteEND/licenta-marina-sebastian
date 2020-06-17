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

// GENERATE EXCEL

// Name
router.get("/generateExcelName", async (req, res) => {
  const src = req.query.src.replace("_", " ");
  await User.find(
    { role: "student", name: { $regex: src, $options: "i" } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("name title profesor year email");
});
// Title
router.get("/generateExcelTitle", async (req, res) => {
  const src = req.query.src.replace("_", " ");
  await User.find(
    { role: "student", title: { $regex: src, $options: "i" } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("name title profesor year email");
});
// Profesor
router.get("/generateExcelProfesor", async (req, res) => {
  const src = req.query.src.replace("_", " ");
  await User.find(
    { role: "student", profesor: { $regex: src, $options: "i" } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("name title profesor year email");
});
// Year
router.get("/generateExcelYear", async (req, res) => {
  const src = req.query.src.replace("_", " ");
  await User.find(
    { role: "student", year: { $regex: src, $options: "i" } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("name title profesor year email");
});
// Email
router.get("/generateExcelEmail", async (req, res) => {
  const src = req.query.src.replace("_", " ");
  await User.find(
    { role: "student", email: { $regex: src, $options: "i" } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  ).select("name title profesor year email");
});
// router.get("/generateExcelAdmin", async (req, res) => {
//   console.log(req.query.src);
//   const src = req.query.src.replace("_", " ");
//   console.log(src);
//   await User.find(
//     {
//       role: "student",
//       name: src,
//       title: src,
//       profesor: src,
//       year: src,
//       email: src
//     },
//     (err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     }
//   ).select("name title profesor year email");
// });

module.exports = router;
