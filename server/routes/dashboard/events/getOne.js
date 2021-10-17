const { db } = require("../../../lib/firebase.js");

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

  return res.status(200).send({ data: [{ ...event, ...org.data() }] });
};

module.exports = getOne;