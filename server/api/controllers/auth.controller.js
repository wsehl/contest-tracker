const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const firebase = require("~config/firebase.js");
const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("~config/tokens.js");
const logger = require("~services/logger");
const { verifyRefresh } = require("~services/jwt");

exports.login = async (req, res) => {
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

  const userId = doc.id;

  const jwtData = {
    username: user.username,
    userId,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtData, ACCESS_TOKEN_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(jwtData, REFRESH_TOKEN_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  userRef.doc(doc.id).update({ last_login: new Date() });

  user.last_login = user.last_login.toDate();
  user.registered = user.registered.toDate();

  logger.info(`Logged in user: [${user.username}] with role: [${user.role}]`);

  const userData = {
    role: user.role,
    username: user.username,
    userId,
  };

  return res.status(200).send({
    msg: "Logged in successfully",
    user: userData,
    accessToken,
    refreshToken,
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken, user } = req.body;

  const isValid = verifyRefresh(user, refreshToken);

  const jwtData = {
    username: user.username,
    userId: user.userId,
    role: user.role,
  };

  if (!isValid) {
    return res.status(401).send({ msg: "Invalid token, try login again" });
  }

  const newAccessToken = jwt.sign(jwtData, ACCESS_TOKEN_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const newRefreshToken = jwt.sign(jwtData, REFRESH_TOKEN_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return res
    .status(201)
    .send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

exports.register = async (req, res) => {
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
  });
};
