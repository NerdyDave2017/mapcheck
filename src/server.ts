import http from "http";
import app from "./app";
import config from "./config";

const PORT = config.port || 9999;

const server = http.createServer(app);

process.env.NODE_ENV !== "production" &&
  server.on("listening", () =>
    console.log(`Listening on port http://localhost:${PORT}`)
  );

server.listen(PORT);
