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
    subject: "Вам создали учётную запись в системе Contest Tracker",
    html: `Username: ${username} <br />Password: ${password}<br />Role: ${role}`,
  };

  mailer.sendMail(mailOptions, async function (error) {
    if (error) {
      console.log(error);
      // return res.status(403).send({ msg: "Проблема с отправкой письма!" });
    }
    await userRef.doc(username).set(newUser);

    logger.info(
      `Registered user: [${newUser.username}] with role: [${newUser.role}]`
    );

    res.status(201).send({ msg: "Пользователь создан", status: 201 });
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

  users.map((user) => {
    user.password = null;
    user.last_login = user.last_login.toDate();
    user.registered = user.registered.toDate();
  });

  return res.status(200).send({ data: users });
};

exports.getOne = async (req, res) => {
  const userId = req.params.id;
  const doc = await firebase.db.collection("users").doc(userId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Не найден пользователь с таким id",
      status: 404,
    });
  }

  const user = doc.data();
  user.registered = user.registered.toDate();
  user.last_login = user.last_login.toDate();
  delete user.password;

  // let info = {};
  // if (user.teacher_id)
  //   info = await firebase.db.collection("teachers").doc(user.teacher_id).get();
  if (user.student_id) {
    const student = user.student_id;

    const [info, projects] = await Promise.all([
      firebase.db.collection("students").doc(student).get(),
      firebase.db
        .collection("projects")
        .where("students_ids", "array-contains", student)
        .get(),
    ]);

    user.info = info.data();

    user.projects = projects.docs.map((doc) => {
      const project = doc.data();
      project.start_date = project.start_date.toDate();
      project.end_date = project.end_date.toDate();
      return project;
    });
  }
  // if (user.curator_id)
  //   info = await firebase.db.collection("curators").doc(user.curator_id).get();

  // user.info = info.data();

  return res.status(200).send({ data: user });
};

exports.removeOne = async (req, res) => {
  const userId = req.params.id;
  await firebase.db.collection("users").doc(userId).delete();
  res.status(200).send({ msg: "Пользователь удалён" });
};

exports.removeSeveralRows = async (req, res) => {
  await Promise.all(
    req.body.map((id) => firebase.db.collection("users").doc(id).delete())
  );
  res.status(200).send({ msg: "Пользователи удалены" });
};

exports.updateOne = async (req, res) => {
  const userId = req.params.id;

  const { username, email, role, password } = req.body;

  const doc = await firebase.db.collection("users").doc(userId).get();

  const newUser = {
    ...doc.data(),
    username,
    email,
    role,
    ...(password && { password: await bcrypt.hash(password, 10) }),
  };

  await firebase.db.collection("users").doc(userId).set(newUser);

  res.status(200).send({ msg: "Пользователь обновлён" });
};

exports.changePassword = async (req, res) => {
  const userId = req.user.userId;

  const { password } = req.body;

  const doc = await firebase.db.collection("users").doc(userId).get();

  const newData = {
    ...doc.data(),
    ...(password && { password: await bcrypt.hash(password, 10) }),
  };

  await firebase.db.collection("users").doc(userId).set(newData);

  res.status(200).send({ msg: "Пароль обновлён" });
};
