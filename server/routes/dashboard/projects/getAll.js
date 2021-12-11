const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const projects = [];
  const snapshot = await db.collection("projects").get();

  snapshot.forEach(async (doc) => {
    const project = doc.data();
    project.start_date = project.start_date.toDate();
    project.end_date = project.end_date.toDate();
    project.id = doc.id;

    projects.push(project);
  });

  res.status(200).send({ data: projects });
};

module.exports = getAll;
