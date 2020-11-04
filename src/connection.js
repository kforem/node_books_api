const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/booksapi";
const dbPromise = MongoClient.connect(url, {
    bufferMaxEntries: 0
}).then(function (client) {
    return client.db();
});
module.exports = dbPromise;