import type { ServerWebSocket } from "bun";

let connections: ServerWebSocket<unknown>[] = [];

const server = Bun.serve({
  hostname: "localhost",
  port: 8080,
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      return;
    }

    return new Response("Hello world!");
  },
  websocket: {
    async message(ws, message) {
      console.log(`Received ${message}`);
      ws.send(`You said: ${message}`);
      connections
        .filter((connection) => connection !== ws)
        .forEach((connection) => {
          connection.send(`Some one said: ${message}`);
        });
    },
    open(ws) {
      console.log("unapend произошел");
      connections.push(ws);
    },
    close(ws) {
      connections = connections.filter((connection) => connection !== ws);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
