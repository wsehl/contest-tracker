const nodemailer = require("nodemailer");

const mail_user = process.env.MAIL_USER;
const mail_pass = process.env.MAIL_PASS;

const mailer = nodemailer.createTransport({
  service: "Mail.ru",
  auth: {
    user: mail_user,
    pass: mail_pass,
  },
});

module.exports = {
  mailer: mailer,
  mail_user: mail_user,
};
