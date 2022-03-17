const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const {
    event_organization,
    event_title,
    event_description,
    event_start_date,
    event_end_date,
  } = req.body;

  const newEvent = {
    organization_id: event_organization,
    event_title,
    event_description,
    start_date: event_start_date,
    end_date: event_end_date,
  };

  await db.collection("events").add(newEvent);

  logger.info(`Added event: [${newEvent.event_title}]`);

  res.status(201).send({
    msg: "Successfully added event",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
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
          event.organization_name = org.organization_name;
          return db.collection("files").doc(org.file_id).get();
        })
        .then((file) => {
          const image = file.data().name;
          event.organization_image = image;
        })
    )
  );

  res.status(200).send({ data: events });
};

exports.getOne = async (req, res) => {
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
