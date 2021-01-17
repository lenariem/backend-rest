const nodemailer = require('nodemailer');
const { engine } = require('../app');
const env = require('../config/config');
const {
  verificationEmailTemplate,
} = require('./templates/verificationEmail');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.email,
    pass: env.email_pass, // naturally, replace both with your real credentials or an application-specific password
  },
});

exports.sendVerificationEmail = (user) => {
  const mailOptions = {
    from: env.email,
    to: user.email,
    subject: 'Verification Email - WHATEVER STORE',
    html: verificationEmailTemplate(user),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
