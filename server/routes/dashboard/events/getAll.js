const { db } = require("../../../lib/firebase.js");

const getAll = async (req, res) => {
  const events = [];
  const snapshot = await db.collection("events").get();

  snapshot.forEach(async (doc) => {
    const event = doc.data();
    event.start_date = event.start_date.toDate();
    event.end_date = event.end_date.toDate();
    event.id = doc.id;

    events.push(event);
  });

  await Promise.all(
    events.map((event) =>
      db
        .collection("organizations")
        .doc(event.organization_id)
        .get()
        .then((org_doc) => {
          const org = org_doc.data();
          event.organization_image = org.organization_image;
          event.organization_name = org.organization_name;
        })
    )
  );

  res.status(200).send({ data: events });
};

module.exports = getAll;
