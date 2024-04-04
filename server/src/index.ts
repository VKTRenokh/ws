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
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
