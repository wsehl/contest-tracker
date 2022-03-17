const logger = require("~services/logger");
const { db } = require("~config/firebase.js");

exports.addNew = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    teacher_id,
    students_ids,
    subject_id,
  } = req.body;

  const newProject = {
    name,
    description,
    start_date,
    end_date,
    teacher_id,
    students_ids,
    subject_id,
  };

  await db.collection("projects").add(newProject);

  logger.info(`Added project: [${newProject.name}]`);

  res.status(201).send({
    msg: "Successfully added project",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
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

exports.getOne = async (req, res) => {
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

  const [teacher, subject, ...students] = await Promise.all([
    db.collection("teachers").doc(project.teacher_id).get(),
    db.collection("subjects").doc(project.subject_id).get(),
    ...project.students_ids.map((id) =>
      db.collection("students").doc(id).get()
    ),
  ]);
  project.teacher = teacher.data();
  project.subject = subject.data();
  project.students = students.map((student) => student.data());

  return res.status(200).send({ data: project });
};
