const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');
   
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1)+fib(n - 2);
}

  if (isMainThread) {
    function calc(n) {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
          workerData: n
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });
    };

    setInterval(() => console.log('Working...'), 1000);
    calc(43)
        .then(data => console.log(data))


  } else {
    const n = workerData;
    parentPort.postMessage(fib(n));
  }