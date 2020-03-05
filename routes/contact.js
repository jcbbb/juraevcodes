const express = require('express');
const nodemailer = require('nodemailer');
const { USER, PASS } = require('../config/index');

const router = express.Router();
/* GET users listing. */
router.get('/', (req, res) => {
  res.render('contact');
});
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: USER,
    pass: PASS,
  },
});
router.post('/', (req, res) => {
  const { fname, lname, email, subject, details } = req.body;
  const mailOptions = {
    sender: email,
    replyTo: email,
    to: USER,
    subject,
    html: `<h3><strong>Client name: </strong>${fname} ${lname}</h3><h3><strong>Message: </strong><p>${details}</p></h3>`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      throw Error;
    }
  });
  res.json({
    status: true,
    msg: 'Message received. We will contact you shortly.',
  });
});
module.exports = router;
