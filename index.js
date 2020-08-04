const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const query = url.parse(req.url, true);
    const filename =
      query.pathname === "/" ? "./index.html" : "." + query.pathname + ".html";
    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile("404.html", (err, data) => {
          res.writeHead(404, { "content-type": "text/html" });
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);
