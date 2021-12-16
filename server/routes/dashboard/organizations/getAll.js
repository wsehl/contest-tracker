const { db } = require("~libs/firebase.js");

const getAll = async (req, res) => {
  const orgs = [];
  const snapshot = await db.collection("organizations").get();

  snapshot.forEach(async (doc) => {
    const org = doc.data();
    org.id = doc.id;

    orgs.push(org);
  });

  await Promise.all(
    orgs.map((org) =>
      db
        .collection("files")
        .doc(org.file_id)
        .get()
        .then((file_doc) => {
          const file = file_doc.data();
          org.organization_image = file.name;
        })
    )
  );

  return res.status(200).send({ data: orgs });
};

module.exports = getAll;
