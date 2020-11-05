// import * as express from 'express';
// const db = require('../database/index.js');
// const pw = require('./salt');

// const router = express.Router();
const express = require("express");
const db = require("../database/index.js");
const pw = require("./salt.js");
const router = express.Router();

// Post request to drivers to put there information
router.post("/signup", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = pw.saltBath(req.body.password);
  const yearOfBirth = req.body.yearOfBirth;
  const idCard = req.body.idCard;
  const driveLicense = req.body.driveLicense;
  const car = req.body.car;
  const location = req.body.location;
  const km = req.body.km;
  const gender = req.body.gender;
  const rate = 10;
  db.getADriver(email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        db.addNewDriver(
          firstName,
          lastName,
          email,
          password,
          yearOfBirth,
          idCard,
          driveLicense,
          car,
          location,
          km,
          gender,
          rate,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json("Done");
            }
          }
        );
      } else {
        res.status(200).json("Email already exists");
      }
    }
  });
});

//Post request signIn to the drivers
router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = pw.saltBath(req.body.password);
  db.getEmailAndPassword(email, password, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (
        result.length !== 0 &&
        password === result[0].password &&
        email === result[0].email
      ) {
        res.status(200).json("OK");
      } else {
        res.status(200).json("NO");
      }
    }
  });
});

//Post request to drivers to know there location
router.post("/history/add", (req, res) => {
  const longtitude = req.body.longtitude;
  const lattitude = req.body.lattitude;
  const idCardDrive = req.body.idCard;
  db.createHistory(longtitude, lattitude, idCardDrive, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done");
    }
  });
});

//Post request to users for there location
router.post("/history", (req, res) => {
  const id = req.body.idCard;
  db.getHistory(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Post request to update status
router.post("/status", (req, res) => {
  let emailDriver = req.body.email;
  let info = req.body.info;
  db.getInfo(emailDriver, info, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Post request to the answer of drivers
router.post("/request", (req, res) => {
  var emailPicker = req.body.email;
  let request = req.body.request;
  let lat = req.body.lat;
  let long = req.body.long;
  console.log(lat, long);
  if (!req.body.answer) {
    db.submitReq(request, lat, long, emailPicker, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("waiting for answer");
      }
    });
  } else {
    console.log(req.body.answer);
    console.log(emailPicker);
    db.getInfo(emailPicker, req.body.answer, (err, result) => {
      console.log(req.body.email);
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        db.getAllInfo(emailPicker, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    });
  }
});

// Post request to answer the users
router.post("/requests/answer", (req, res) => {
  let emailPicker = req.body.email;
  db.getAllReq(emailPicker, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Post request to drivers to response
router.post("/request/response", (req, res) => {
  let emailPicker = req.body.email;
  db.getAllInfo(emailPicker, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Post request to response the users
router.post("/request/response/update", (req, res) => {
  let emailPicker = req.body.email;
  db.updateInfoRes(emailPicker, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

//Post request to update the position of location
router.post("/updatePosition", (req, res) => {
  console.log(req.body.lat);
  let emailPicker = req.body.email;
  let lat = req.body.lat;
  let long = req.body.long;
  db.updatePosition(emailPicker, lat, long, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

module.exports = router;
