const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const firebase = require("../../lib/firebase.js");

const login = async (req, res) => {
  const { username, password } = req.body;

  const userRef = firebase.db.collection("users");

  const doc = await userRef.doc(username).get();

  if (!doc.exists) {
    return res.status(401).send({
      msg: "Username or password is incorrect!", // Account not found
    });
  }

  const user = doc.data();

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).send({
      msg: "Username or password is incorrect!", // Bcrypt error
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

  console.info(
    `Logged in user: [${user.username}] with role: [${
      user.role
    }] at [${new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Almaty",
    })}]`
  );

  return res.status(200).send({
    msg: "Logged in successfully",
    token,
    user,
  });
};

module.exports = login;
