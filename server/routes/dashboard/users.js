const db = require("../../lib/db.js");

const users = {
  getUsers: (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
      return res.status(200).send({
        data: result,
      });
    });
  },
};
module.exports = users;
