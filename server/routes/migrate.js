const db = require("../lib/database.js");

const migrate = {
  users: (req, res) => {
    db.query(
      `INSERT INTO users(username, role, email, registered, password) VALUES
      ('admin','Admin', 'widesehl@gmail.com', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('user','User', 'sincere@april.biz', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('teacher', 'Teacher', 'nathan@yesenia.net', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('curator', 'Curator', 'julianne.OConner@kory.org', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi')
      `,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        return res.status(200).send({
          msg: "Migrated Succefully",
        });
      }
    );
  },
};

module.exports = migrate;
