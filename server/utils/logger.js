const date = new Date().toLocaleString("ru-RU", {
  timeZone: "Asia/Almaty",
});

const createMessage = (msg) => `${msg} | date: [${date}]`;

const logger = {
  info: (msg) => {
    return console.info(`${createMessage(msg)}`);
  },
  error: (msg) => {
    return console.info(`${createMessage(msg)}`);
  },
};

module.exports = logger;
