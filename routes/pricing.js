const express = require('express');
const nodemailer = require('nodemailer');
const plans = require('../public/data/plans.json');
const testimonials = require('../public/data/testimonials.json');
const faqs = require('../public/data/faq.json');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('pricing', { plans, testimonials, faqs });
});
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c112a7cd916b32',
    pass: 'd18481e9e8c93a',
  },
});
router.post('/', (req, res) => {
  const {
    name, email, phone, plan,
  } = req.body;
  const mailOptions = {
    from: '"Test Server" <test@example.com',
    to: email,
    subject: plan,
    text: `${name}'s phone is ${phone}`,
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
