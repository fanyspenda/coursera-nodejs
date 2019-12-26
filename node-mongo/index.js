const mongoclient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";
const dboper = require("./operations");

mongoclient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("connected correctly to database");
  console.log("====================================");
  const db = client.db(dbname);

  dboper.insertDocument(
    db,
    {
      name: "Dishtiny hero",
      description: "yugioh's archetype"
    },
    `dishes`,
    res => {
      console.log(`menambahkan document ${JSON.stringify(res.ops, null, 2)}`);

      dboper.findAllDocuments(db, "dishes", docs => {
        console.log(`mencari document
        ${JSON.stringify(docs, null, 2)}`);

        dboper.updateDocument(
          db,
          { name: "piring 1" },
          { description: "updated description lagi" },
          `dishes`,
          result => {
            console.log(
              `updated documents ${JSON.stringify(result.result, null, 2)}`
            );

            dboper.removeDocument(
              db,
              { name: "Dishtiny hero" },
              `dishes`,
              result => {
                console.log(
                  `menghapus document ${JSON.stringify(result.result, null, 2)}`
                );

                dboper.findAllDocuments(db, `dishes`, docs2 => {
                  console.log(`mencari document 
                  ${JSON.stringify(docs2, null, 2)}`);
                });
              }
            );
          }
        );
      });
    }
  );
});
