const date = new Date().toLocaleString("ru-RU", {
  timeZone: "Asia/Almaty",
});

const logger = {
  module: (module, up, error) => {
    return error
      ? logger.error(`${module} is down, ${error}`)
      : logger.info(`${module} is up`);
  },
  info: (msg) => {
    return console.info(`[${date}] [info] ${msg}`);
  },
  error: (msg) => {
    return console.info(`[${date}] [error] ${msg}`);
  },
};

module.exports = logger;
