const assert = require("assert");

//menambah 1 dokumen baru
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

//mencari seluruh document
exports.findAllDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

//menghapus document sekaligus dengan kondisi
exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteMany(document);
};

//mengupdate 1 document
exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
