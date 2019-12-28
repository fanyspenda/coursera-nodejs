const mongoclient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";
const dboper = require("./operations");

mongoclient
  .connect(url)
  //then merupakan fungsi yang dijalankan ketika promise terpenuhi/selesai
  .then(client => {
    console.log("connected correctly to database");
    const db = client.db(dbname);

    dboper
      .insertDocument(
        db,
        { name: "Dishtiny hero", description: "yugioh's archetype" },
        `dishes`
      )

      .then(res => {
        console.log(`menambahkan document ${JSON.stringify(res.ops, null, 2)}`);
        return dboper.findAllDocuments(db, "dishes");
      })

      .then(docs => {
        console.log(`mencari document${JSON.stringify(docs, null, 2)}`);
        return dboper.updateDocument(
          db,
          { name: "piring 1" },
          { description: "updated description dengan promise" },
          `dishes`
        );
      })

      .then(result => {
        console.log(
          `updated documents ${JSON.stringify(result.result, null, 2)}`
        );
        return dboper.removeDocument(db, { name: "Dishtiny hero" }, `dishes`);
      })

      .then(result => {
        console.log(
          `menghapus document ${JSON.stringify(result.result, null, 2)}`
        );
        return dboper.findAllDocuments(db, `dishes`);
      })

      .then(docs2 => {
        console.log(`mencari document ${JSON.stringify(docs2, null, 2)}`);
        client.close();
      })

      .catch(e => {
        console.log(`error on operating query: ${e}`);
      });
  })
  //catch menangani error yang terjadi ketika menjalankan promise
  .catch(err => {
    console.log(`Error on Connecting to database: ${err}`);
  });
