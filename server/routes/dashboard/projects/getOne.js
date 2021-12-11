const { db } = require("~libs/firebase.js");

const getOne = async (req, res) => {
  const projectId = req.params.id;
  const doc = await db.collection("projects").doc(projectId).get();

  if (!doc.exists) {
    return res.status(404).send({
      msg: "Not Found",
      status: 404,
    });
  }
  const project = doc.data();
  project.start_date = project.start_date.toDate();
  project.end_date = project.end_date.toDate();

  const [teacher, ...students] = await Promise.all([
    db.collection("teachers").doc(project.teacher_id).get(),
    ...project.students_ids.map((id) =>
      db.collection("students").doc(id).get()
    ),
  ]);
  project.teacher = teacher.data();
  project.students = students.map((student) => student.data());

  return res.status(200).send({ data: project });
};

module.exports = getOne;
