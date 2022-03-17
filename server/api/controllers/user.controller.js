const bcrypt = require("bcryptjs");
const logger = require("~services/logger");
const firebase = require("~config/firebase.js");
const { mailer, mail_user } = require("~config/mailer.js");

exports.addNew = async (req, res) => {
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
    return res
      .status(409)
      .send({ msg: "Аккаунт с таким логином уже существует" });
  }

  if (!doc[1].empty) {
    return res
      .status(409)
      .send({ msg: "Аккаунт с такой почтой уже существует" });
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

exports.getAll = async (req, res) => {
  const users = [];
  const snapshot = await firebase.db.collection("users").get();

  snapshot.forEach((doc) => {
    const user = doc.data();
    user.id = doc.id;

    users.push(user);
  });

  return res.status(200).send({ data: users });
};

exports.getOne = async (req, res) => {
  const userId = req.params.id;
  const doc = await firebase.db.collection("users").doc(userId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }

  const user = doc.data();
  user.registered = user.registered.toDate();
  user.last_login = user.last_login.toDate();

  let info = {};
  if (user.teacher_id)
    info = await firebase.db.collection("teachers").doc(user.teacher_id).get();
  if (user.student_id)
    info = await firebase.db.collection("students").doc(user.student_id).get();
  if (user.curator_id)
    info = await firebase.db.collection("curators").doc(user.curator_id).get();

  user.info = info.data();

  return res.status(200).send({ data: user });
};

exports.removeOne = async (req, res) => {
  const userId = req.params.id;
  await firebase.db.collection("users").doc(userId).delete();
  res.status(200).send({ msg: "Succefully Removed" });
};

exports.removeSeveralRows = async (req, res) => {
  await Promise.all(
    req.body.map((id) => firebase.db.collection("users").doc(id).delete())
  );
  res.status(200).send({ msg: "Succefully Removed" });
};

exports.updateOne = async (req, res) => {
  const userId = req.params.id;

  const { username, email, role } = req.body;
  const newUser = { username, role, email };

  await firebase.db.collection("users").doc(userId).set(newUser);

  res.status(200).send({ msg: "Succesfully updated" });
};
