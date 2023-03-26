import pino from "pino";

// create pino logger
const logger = pino({
  browser: {
    transmit: {
      level: "info",
      send: (level, logEvent) => {
        const msg = logEvent.messages[0];

        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          type: "application/json",
        };
        let blob = new Blob([JSON.stringify({ msg, level })], headers);
        navigator.sendBeacon(`/log`, blob);
      },
    },
  },
  level: "debug",
  base: {
    env: process.env.NODE_ENV,
  },
});

export default logger;
