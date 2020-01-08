const express = require("express");
const bodyParser = require("body-parser");
const dishesRouter = express.Router();

dishesRouter.use(bodyParser.json());

const mongoose = require(`mongoose`);
const Dishes = require(`../models/dishes`);

//menggunakan / biasa karena /dishes sudah secara otomatis didefine dan dikirim dari index
dishesRouter
  .route("/")
  //operasi non-parameter
  .get((req, res, next) => {
    Dishes.find({})
      .then(
        docs => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(docs);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    Dishes.create(req.body)
      .then(
        doc => {
          console.log(`dishes created!`);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(doc);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    //tidak memungkinkan karena tidak mungkin mengedit data seluruh piring dalam 1 kali edit
    res.end("operasi PUT tidak memungkinkan pada endpoint /dishes");
  })

  //operasi berbahaya karena menghapus semua data `dishes`. Akan dipelajari pada bagian auth
  .delete((req, res, next) => {
    Dishes.remove({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

//operasi berparameter
dishesRouter
  .route("/:dishId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        doc => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(doc);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    //tidak memungkinkan karena tidak mungkin menambah data piring baru dengan memberi parameter ID
    res.end("operasi POST tidak memungkinkan pada endpoint /dishes/dishId");
  })

  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      { $set: req.body },
      { new: true }
    )
      .then(
        doc => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(doc);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = dishesRouter;
