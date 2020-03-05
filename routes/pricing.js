const express = require('express');
const nodemailer = require('nodemailer');
const plans = require('../public/data/plans.json');
const testimonials = require('../public/data/testimonials.json');
const faqs = require('../public/data/faq.json');
const { USER, PASS } = require('../config/index');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('pricing', { plans, testimonials, faqs });
});
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: USER,
    pass: PASS,
  },
});
router.post('/plan', (req, res) => {
  const { name, email, phone, plan } = req.body;
  const mailOptions = {
    sender: email,
    replyTo: email,
    to: USER,
    subject: plan,
    html: `<h3><strong>Client name: </strong>${name}</h3><h3><strong>Client phone: </strong><a href=tel:${phone}>${phone}</a></h3>`,
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
router.post('/question', (req, res) => {
  const { email, message } = req.body;
  const mailOptions = {
    sender: email,
    replyTo: email,
    to: USER,
    subject: 'QUESTION',
    html: `<h3>${message}</h3>`,
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
