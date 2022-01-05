const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const eventId = req.params.id;
  const doc = await db.collection("events").doc(eventId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const event = doc.data();
  event.start_date = event.start_date.toDate();
  event.end_date = event.end_date.toDate();

  const org = await db
    .collection("organizations")
    .doc(event.organization_id)
    .get();

  const file = await db.collection("files").doc(org.data().file_id).get();

  return res.send({
    data: [{ ...event, ...org.data(), organization_image: file.data().name }],
  });
};

module.exports = getOne;
