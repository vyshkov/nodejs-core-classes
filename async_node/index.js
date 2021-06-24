setInterval(() => console.log("Working..."), 1000);

// 0, 1, 1, 2, 3, 5,
function fib(n, cb) {
  if (n <= 1) {
    return cb(n);
  }

  Promise.all([
    new Promise((res) => {
      setImmediate(() => {
        fib(n - 1, res);
      });
    }),

    new Promise((res) => {
      setImmediate(() => {
        fib(n - 2, res);
      });
    }),
  ]).then((results) => cb(results[0] + results[1]));
}

fib(31, console.log);
