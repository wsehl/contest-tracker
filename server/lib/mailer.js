const nodemailer = require("nodemailer");

const mail_user = process.env.MAIL_USER || "contest-tracker@mail.ru";
const mail_pass = process.env.MAIL_PASS || "SR1eOP2tcya";

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

mailer.verify((error, success) => {
  if (error) return console.log(error);
  if (success) console.log("[module] Mailer is ready");
});
