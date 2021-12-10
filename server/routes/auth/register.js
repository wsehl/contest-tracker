const bcrypt = require("bcryptjs");
const firebase = require("../../lib/firebase.js");
const logger = require("../../utils/logger");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const userRef = firebase.db.collection("users");

  const doc = await Promise.all([
    userRef.where("username", "==", username).get(),
    userRef.where("email", "==", email).get(),
  ]);

  if (!doc[0].empty || !doc[1].empty) {
    return res.status(409).send({
      msg: "This username or email is already in use!",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: hash,
    registered: new Date(),
    last_login: new Date(),
    role: "User",
    email,
  };

  await userRef.doc(username).set(newUser);

  logger.info(
    `Registered user: [${newUser.username}] with role: [${newUser.role}] `
  );

  res.status(201).send({
    msg: "Successfully registered",
    status: 201,
  });
};

module.exports = register;
