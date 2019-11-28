const http = require("http");
const fs = require("fs");
const path = require("path");

const localhost = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.end(`<html><body><h1>Hello, World!</h1></body></html>`);

  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method == "GET") {
    let file;
    if (req.url == "/") {
      file = "/index.html";
    } else {
      file = req.url;
    }

    let filePath = path.resolve(`./public${file}`);
    const fileExtension = path.extname(filePath);
    if (fileExtension == ".html") {
      fs.exists(filePath, exists => {
        if (!exists) {
          res.statusCode == 404;
          res.setHeader(`Content-Type`, "text/html");
          res.end(
            `<html><body><h1>Error 404: ${file} not found</h1></body></html>`
          );

          return;
        }
        res.statusCode = 200;
        res.setHeader(`Content-Type`, `text/html`);
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode == 404;
      res.setHeader(`Content-Type`, "text/html");
      res.end(
        `<html><body><h1>Error 404: ${req.url} is not an html</h1></body></html>`
      );

      return;
    }
  } else {
    res.statusCode == 404;
    res.setHeader(`Content-Type`, "text/html");
    res.end(
      `<html><body><h1>Error 404: method ${req.method} is not supported</h1></body></html>`
    );

    return;
  }
});

server.listen(port, localhost, () => {
  console.log(`server running at ${localhost}: ${port}`);
});
