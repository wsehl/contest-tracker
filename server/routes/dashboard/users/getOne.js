const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const userId = req.params.id;
  const doc = await db.collection("users").doc(userId).get();

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
    info = await db.collection("teachers").doc(user.teacher_id).get();
  if (user.student_id)
    info = await db.collection("students").doc(user.student_id).get();
  if (user.curator_id)
    info = await db.collection("curators").doc(user.curator_id).get();

  user.info = info.data();

  return res.status(200).send({ data: user });
};

module.exports = getOne;
