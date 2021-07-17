const db = require("~lib/database.js");

const database = {
  migrateUsers: (req, res) => {
    db.query(
      `CREATE TABLE users (
        id int(10) NOT NULL AUTO_INCREMENT,
        username varchar(100) NOT NULL,
        password varchar(100) NOT NULL,
        role enum('User', 'Admin', 'Teacher', 'Curator') NOT NULL,
        email varchar(100) NOT NULL,
        registered datetime NOT NULL,
        last_login datetime NOT NULL,
        PRIMARY KEY (id)
      );`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        res.status(200).send({
          msg: "Users table created succefully",
        });
      }
    );
  },
  seedUsers: (req, res) => {
    db.query(
      `
      INSERT INTO users(username, role, email, registered, password) VALUES
      ('admin','Admin', 'widesehl@gmail.com', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('user','User', 'sincere@april.biz', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('teacher', 'Teacher', 'nathan@yesenia.net', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi'),
      ('curator', 'Curator', 'julianne.OConner@kory.org', now(), '$2a$10$TJiShJAChMFybhLwDlycaulfs.Xn3eQbpZnZSrvpXMPnAWFb25FBi');
      `,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        res.status(200).send({
          msg: "Users table migrated succefully",
        });
      }
    );
  },

  migrateEvents: (req, res) => {
    db.query(
      `CREATE TABLE events (
        id int(10) NOT NULL AUTO_INCREMENT,
        organization_id int(10) NOT NULL,
        event_title varchar(255) NOT NULL,
        event_description text NOT NULL,
        start_date date NOT NULL,
        end_date date NOT NULL,
        PRIMARY KEY (id)
      );`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        res.status(200).send({
          msg: "Events table created succefully",
        });
      }
    );
  },
  seedEvents: (req, res) => {
    db.query(
      `
      INSERT INTO events(id, organization_id, event_title, event_description, start_date, end_date) VALUES
      (1, 1, 'Всероссийский конкурс исследовательских работ Свет познания-осень 2020', 'Цель Конкурса - интеллектуальное и личностное развитие юношества из России и других стран, участвующих в исследовательской деятельности; развитие системы организации и инфраструктуры исследовательской деятельности учащихся в образовательных учреждениях. Конкурс направлен на приобщение юношества к традициям российской научной школы, явившей миру великие открытия и достойные образцы гражданственности. В. И. Вернадский занимает особое место в русской и мировой культуре, как создатель научно- философского обобщения - учения о ноосфере - сфере человеческого разума и ее великой созидательной силе. В этом учении логично объединились природа и люди, населяющие Землю, их взаимосвязи. Основные положения учения В. И. Вернадского легли в основу международной концепции устойчивого развития.', '2021-03-01', '2021-03-16'),
      (2, 2, 'Augmented Reality', 'Europe-wide free competition must be counterbalanced by Europe-wide solidarity. ... The global financial crisis in 2008 triggered the sharpest economic downturn in ... and religious diversity and a harmonious blend of tradition and progress. ... the official price of gold, which had ensured global monetary stability after the', '2021-04-01', '2021-04-26'),
      (3, 3, 'Всероссийский конкурс исследовательских работ Свет познания-осень 2020', 'Каждый ребенок уже рождается с тягой к познанию этого мира. «Почему светит солнце?» «Почему снег белый?» «Почему плачет крокодил?» «Почему стрелки часов идут слева направо?» Кого в детстве родители не называли «почемучкой»? Очень важно суметь сохранить эту жажду знания на всю жизнь.', '2021-05-05', '2021-05-19'),
      (4, 1, 'XXVIII Конкурс им. В.И.Вернадского 2020-2021', 'Авторы, которые были допущены до 2 тура, но по любым причинам не смогли участвовать в основном конкурсе, могут участвовать в дополнительном конкурсе. Регистрация в форме до 10 мая включительно. Слушания работ будут назначены на период с 17 по 23 мая.', '2021-05-06', '2021-05-29'),
      (5, 4, 'Международный конкурс  Молодой ученый', '30 мая 2020 года в дистанционном режиме проводился международный научный конкурс «Молодой ученый» по общеобразовательным предметам. Целью конкурса является интеллектуальное и личностное развитие школьников, участвующих в исследовательской деятельности. Ежегодный Конкурс впервые проводился в онлайн режиме образовательным Центром «GlobalСапа» и Международной Школой Бизнеса «SOLBRIDGE» в г. Тэджон (Южная Корея).', '2021-05-04', '2021-05-17');
      `,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        res.status(200).send({
          msg: "Events table migrated succefully",
        });
      }
    );
  },

  migrateOrganizations: (req, res) => {
    db.query(
      `CREATE TABLE organizations (
        id int(10) NOT NULL AUTO_INCREMENT,
        organization_name varchar(100) NOT NULL,
        organization_image varchar(255) NOT NULL,
        PRIMARY KEY (id)
      );`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        return res.status(200).send({
          msg: "Organizations table created succefully",
        });
      }
    );
  },
  seedOrganizations: (req, res) => {
    db.query(
      `
      INSERT INTO organizations(id, organization_name, organization_image) VALUES
      (1, 'В. И. Вернадского', 'file_1621091974358'),
      (2, 'The Big Progress', 'file_1621093621685'),
      (3, '«Открытые ладони»', 'file_1621093790641'),
      (4, 'Daryn.Asia', 'file_1621094872516');
      `,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400);
        }
        return res.status(200).send({
          msg: "Organizations table migrated succefully",
        });
      }
    );
  },
};

module.exports = database;
