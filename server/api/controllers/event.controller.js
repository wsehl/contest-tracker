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
    start_date: new Date(event_start_date),
    end_date: new Date(event_end_date),
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

  const [org, winners_docs] = await Promise.all([
    db.collection("organizations").doc(event.organization_id).get(),
    db.collection("winners").where("event_id", "==", eventId).get(),
  ]);

  const winners = [];
  await Promise.all(
    winners_docs.docs.map(async (winner_doc) => {
      const winner = winner_doc.data();
      const project_doc = await db
        .collection("projects")
        .doc(winner.project_id)
        .get();

      const project = project_doc.data();
      project.start_date = project.start_date.toDate();
      project.end_date = project.end_date.toDate();

      const students = await Promise.all(
        project.students_ids.map((id) =>
          db.collection("students").doc(id).get()
        )
      );

      project.students = students
        .map((student) => student.data())
        .filter((el) => el);

      winner.project = project;
      winners.push(winner);
    })
  );

  event.winners = winners;

  const file = await db.collection("files").doc(org.data().file_id).get();

  return res.send({
    data: [{ ...event, ...org.data(), organization_image: file.data().name }],
  });
};

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await db.collection("events").doc(id).delete();
  res.status(200).send({ msg: "Конкурс удален" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { event_title, organization_id, event_description } = req.body;

  const doc = await db.collection("events").doc(id).get();

  const newData = {
    ...doc.data(),
    event_title,
    organization_id,
    event_description,
  };

  await db.collection("events").doc(id).set(newData);

  res.status(200).send({ msg: "Конкурс обновлён" });
};
