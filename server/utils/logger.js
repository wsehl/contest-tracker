const date = new Date().toLocaleString("ru-RU", {
  timeZone: "Asia/Almaty",
});

const createMessage = (msg) => `${msg} [${date}]`;

const logger = {
  module: (msg, up, error) => {
    if (error) logger.error(error);
    return console.info(
      `[module] ${createMessage(`${msg} is ${up ? "up" : "down"}`)}`
    );
  },
  info: (msg) => {
    return console.info(`[info] ${createMessage(msg)}`);
  },
  error: (msg) => {
    return console.info(`[error] ${createMessage(msg)}`);
  },
};

module.exports = logger;
