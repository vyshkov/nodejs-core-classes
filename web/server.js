const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

const CONTENT_TYPES = {
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
}

function processStaticFile(req, res) {
    fsPromises.stat(path.join(__dirname, req.url))
        .then(data => {
            if (data.isFile()) {
              const extention = path.extname(req.url);
              res.writeHead(200, { 'Content-Type': CONTENT_TYPES[extention] });
              fs.createReadStream(path.join(__dirname, req.url))
              .pipe(res);  
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 200,
                    data: 'Directory',
                }));
            }
            
        })
        .catch((err) => {
            console.error(err);
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 404,
                error: err.code,
            }));
        })
}


function processRestApi(req, res) {
    const router = {
        '/api/result': (req, res) => {
            setTimeout(() => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    id: Math.random(),
                    name: 'Hello',
                    groups: ['asd', 'sfsdf']
                }));
            }, 4000);
        },
        '/api/42': (req, res) => {
            res.end('42');
        },
    }

    router[req.url](req, res);
}

http
  .createServer((req, res) => {
      if(req.url.startsWith('/static/')) {
          processStaticFile(req, res);
      } else if (req.url.startsWith('/api')) {
          processRestApi(req, res);
      } else if (req.url === '/') {
          res.writeHead(302, { 'Location': '/static/index.html' });
          res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 404,
            error: 'Not found',
        }));
      }
  })
  .listen(3030, () => console.log("Started on", 3030));
