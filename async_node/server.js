class Server {
  constructor() {
    this.lsteners = new Map();

    setImmediate(() => {
      this.send("message", "Init");
    });
  }

  listen() {
    setInterval(() => {
      this.send("message", Math.random());
    }, 1000);
  }

  send(type, data) {
    const listeners = this.lsteners.get(type);

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(data);
    }
  }

  on(type, fn) {
    if (!this.lsteners.has(type)) {
      this.lsteners.set(type, []);
    }
    this.lsteners.get(type).push(fn);
  }
}

const server = new Server();

server.listen();

server.on("message", (data) => {
  console.log(data);
});
