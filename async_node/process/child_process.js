process.on("message", (message) => {
  //child process is listening for messages by the parent process
  const result = fib(message.number);
  process.send(result);
  process.exit(); // make sure to use exit() to prevent orphaned processes
});

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
