const express = require("express");
const http = require("http");
const morgan = require(`morgan`);
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const dishesRouter = require(`./routes/dishesRouter`);

const app = express();
app.use(morgan(`dev`)); //memberikan feedback pada CLI jika ada request dari browser
app.use(bodyParser.json());

//ketika mengakses /dishes, akan merouting ke dishes router.
app.use("/dishes", dishesRouter);

//mereturn file html sesuai url
app.use(express.static(__dirname + `/public`));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <html>
      <body>
        <h1>Ini servernya Express</h1>
      </body>
    </html>
  `);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`server berjalan di http://${hostname}:${port}`);
});
