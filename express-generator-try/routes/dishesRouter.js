const express = require("express");
const bodyParser = require("body-parser");

const dishesRouter = express.Router();

dishesRouter.use(bodyParser.json());

//menggunakan / biasa karena /dishes sudah secara otomatis didefine dan dikirim dari index
dishesRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  //operasi non-parameter
  .get((req, res, next) => {
    res.end("memberikan semua piring ke anda!");
  })

  .post((req, res, next) => {
    res.end(
      `menambah piring dengan nama ${req.body.name} dan detail ${req.body.description}`
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    //tidak memungkinkan karena tidak mungkin mengedit data seluruh piring dalam 1 kali edit
    res.end("operasi PUT tidak memungkinkan pada endpoint /dishes");
  })

  //operasi berbahaya karena menghapus semua data `dishes`. Akan dipelajari pada bagian auth
  .delete((req, res, next) => {
    res.end(`menghapus semua piring`);
  });

//operasi berparameter
dishesRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(`menampilkan detail piring dengan id ${req.params.dishId}`);
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    //tidak memungkinkan karena tidak mungkin menambah data piring baru dengan memberi parameter ID
    res.end("operasi POST tidak memungkinkan pada endpoint /dishes/dishId");
  })

  .put((req, res, next) => {
    res.write(`mengupdate data piring dengan id ${req.params.dishId} \n`);
    res.end(
      `berhasil mengupdate data piring menjadi nama ${req.body.name} dan deskripsi ${req.body.description}`
    );
  })

  .delete((req, res, next) => {
    res.end(`menghapus data piring dengan id ${req.params.dishId}`);
  });

module.exports = dishesRouter;
