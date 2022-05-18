const logger = require("~services/logger");
const firebase = require("~config/firebase.js");

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
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    teacher_id,
    students_ids,
    subject_id,
  };

  await firebase.db.collection("projects").add(newProject);

  logger.info(`Added project: [${newProject.name}]`);

  res.status(201).send({
    msg: "Successfully added project",
    status: 201,
  });
};

exports.getAll = async (req, res) => {
  const projects = [];
  const snapshot = await firebase.db.collection("projects").get();

  snapshot.forEach(async (doc) => {
    const project = doc.data();
    project.start_date = project.start_date.toDate();
    project.end_date = project.end_date.toDate();
    project.id = doc.id;

    projects.push(project);
  });

  await Promise.all(
    projects.map((item) =>
      firebase.db
        .collection("teachers")
        .doc(item.teacher_id)
        .get()
        .then((teacher) => {
          item.teacher = teacher.data();
        })
    )
  );

  res.status(200).send({ data: projects });
};

exports.getOne = async (req, res) => {
  const projectId = req.params.id;
  const doc = await firebase.db.collection("projects").doc(projectId).get();

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
    firebase.db.collection("teachers").doc(project.teacher_id).get(),
    firebase.db.collection("subjects").doc(project.subject_id).get(),
    ...project.students_ids.map((id) =>
      firebase.db.collection("students").doc(id).get()
    ),
  ]);
  project.teacher = teacher.data();
  project.subject = subject.data();
  project.students = students.map((student) => student.data());

  project.students_ids.forEach((id, index) => {
    project.students[index].id = id;
  });

  return res.status(200).send({ data: project });
};

exports.removeOne = async (req, res) => {
  const id = req.params.id;
  await firebase.db.collection("projects").doc(id).delete();
  res.status(200).send({ msg: "Проект удалён" });
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { name, description, teacher_id, start_date, end_date } = req.body;

  const doc = await firebase.db.collection("projects").doc(id).get();

  const newData = {
    ...doc.data(),
    name,
    description,
    teacher_id,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
  };

  await firebase.db.collection("projects").doc(id).set(newData);

  res.status(200).send({ msg: "Проект обновлён" });
};
