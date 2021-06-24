const { fork } = require("child_process");

function calc(n) {
  const childProcess = fork("./child_process.js");
  childProcess.send({ number: n });

  childProcess.on("message", console.log);
}

setInterval(() => console.log("Working..."), 1000);

calc(43);
calc(43);
