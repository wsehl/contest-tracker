const bcrypt = require("bcryptjs");
const firebase = require("~libs/firebase.js");
const { mailer, mail_user } = require("~libs/mailer.js");
const logger = require("~utils/logger");

const addNew = async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    student_id,
    teacher_id,
    curator_id,
  } = req.body;

  const userRef = firebase.db.collection("users");

  const doc = await Promise.all([
    userRef.where("username", "==", username).get(),
    userRef.where("email", "==", email).get(),
  ]);

  if (!doc[0].empty) {
    return res.status(409).send({ msg: "This username is already in use!" });
  }

  if (!doc[1].empty) {
    return res.status(409).send({ msg: "This email is already in use!" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: hash,
    registered: new Date(),
    last_login: new Date(),
    role,
    email,
    ...(!!student_id && { student_id }),
    ...(!!teacher_id && { teacher_id }),
    ...(!!curator_id && { curator_id }),
  };

  const mailOptions = {
    from: mail_user,
    to: email,
    subject: "Your new account on Contest Tracker",
    html: `Username: ${username} <br />Password: ${password}<br />Role: ${role}`,
  };

  mailer.sendMail(mailOptions, async function (error) {
    if (error) {
      return res.status(403).send({ msg: "Email not valid!" });
    }

    await userRef.doc(username).set(newUser);

    logger.info(
      `Registered user: [${newUser.username}] with role: [${newUser.role}]`
    );

    res.status(201).send({ msg: "Successfully registered", status: 201 });
  });
};

module.exports = addNew;
