const mongoclient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

mongoclient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("====================================");
  console.log("connected correctly to database");
  console.log("====================================");

  const db = client.db(dbname);
  const collection = db.collection("dishes");

  collection.insertOne(
    {
      name: "Giorno Giovanno",
      description: "dishes from italia"
    },
    (err, result) => {
      assert.equal(err, null);
      console.log(`After insert
        ${JSON.stringify(result.ops)}`);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Found:
        ${JSON.stringify(docs, null, 2)}`);

        client.close();

        // db.dropCollection("dishes", (err, result) => {
        //   assert.equal(err, null);

        //   client.close();
        // });
      });
    }
  );
});
