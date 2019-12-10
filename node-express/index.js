const express = require("express");
const http = require("http");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log("====================================");
  console.log(res.header);
  console.log("====================================");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <html>
      <body>
        <h1>Ini Express server</h1>
      </body>
    </html>
  `);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`server berjalan di http://${hostname}:${port}`);
});
