const { db } = require("../../../lib/firebase.js");

const addNew = async (req, res) => {
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

  // if (err) {
  //   console.error(err);
  //   return res.status(400).send({
  //     msg: "An error occured",
  //   });
  // }

  console.info(
    `Added event: [${newEvent.event_title}] at [${new Date().toLocaleString(
      "ru-RU",
      {
        timeZone: "Asia/Almaty",
      }
    )}]`
  );

  res.status(201).send({
    msg: "Successfully added event",
    status: 201,
  });
};

module.exports = addNew;
