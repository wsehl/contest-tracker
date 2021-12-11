const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const firebase = require("~libs/firebase.js");
const logger = require("~utils/logger");

const login = async (req, res) => {
  const { username, password } = req.body;

  const userRef = firebase.db.collection("users");

  const doc = await userRef.doc(username).get();

  if (!doc.exists) {
    return res.status(401).send({
      msg: "Неверное имя пользователя или пароль!", // Account not found
    });
  }

  const user = doc.data();

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).send({
      msg: "Неверное имя пользователя или пароль!", // Bcrypt error
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
      userId: doc.id,
      role: user.role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "365d",
    }
  );

  userRef.doc(doc.id).update({ last_login: new Date() });

  user.last_login = user.last_login.toDate();
  user.registered = user.registered.toDate();

  logger.info(`Logged in user: [${user.username}] with role: [${user.role}]`);

  return res.status(200).send({
    msg: "Logged in successfully",
    token,
    user,
  });
};

module.exports = login;
