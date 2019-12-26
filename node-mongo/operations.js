const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insertOne(document, (err, result) => {
    assert.equal(err, null);
    console.log(
      `menambah data: ${JSON.stringify(
        result.result.n,
        null,
        2
      )} ke collection: ${collection}`
    );
    callback(result);
  });
};

exports.findAllDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteMany(document, (err, result) => {
    assert.equal(err, null);
    console.log(`delete document jika ${JSON.stringify(document, null, 2)}`);
    callback(result);
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log(`update document dengan ${JSON.stringify(update, null, 2)}`);
    callback(result);
  });
};
