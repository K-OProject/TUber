const express = require("express");
const router = express.Router();
const Users = require("../Models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verify = require("./VerificationToken.js");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

dotenv.config();

router.get("/", async (req, res) => {
  await Users.findAll().then((users) => res.json(users));
});

router.get("/:id", async (req, res) => {
  await Users.findByPk(req.params.id).then((users) => res.json(users));
});

router.post("/register", async (req, res) => {
  const emailExist = await Users.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send("Email already exist");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashPassword,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    imgUrl: req.body.imgUrl,
  }).then((user) => res.json(user));
});
router.post("/login", async (req, res) => {
  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user) return res.send({"status" : 404})
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({"status" : 500})
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
  res.header('auth_token',token).send({'token':token , 'id':user.id})
});

router.post("/send", async (req, res) => {
  await Users.findAll({ where: { email: req.body.email } }).then((obj) => {
    nodemailer.createTestAccount((err, email) => {
      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          port: 465,
          secure: false,
          host: "smtp.gmail.com",
          auth: {
            user: "",
            pass: "",
          },
          tls: {
            rejectUnauthorized: false,
          },
        })
      );

      let mailOptions = {
        from: "",
        to: `${req.body.email}`,
        subject: "tuber",
        text: `thanks u for sign in .`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        res.send(info);
      });
    });
  });
});

router.put("/:id", async (req, res) => {
  Users.findByPk(req.params.id).then((users) => {
    users
      .update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        imgUrl: req.body.imgUrl,
      })
      .then((users) => {
        res.json(users);
      });
  });
});

router.delete("/:id", async (req, res) => {
  await Users.findByPk(req.params.id)
    .then((users) => {
      users.destroy();
    })
    .then(() => {
      res.json("deleted");
    });
});

router.delete("/", async (req, res) => {
  await Users.destroy({ where: {}, truncate: true }).then(() =>
    res.json("cleared")
  );
});

module.exports = router;
