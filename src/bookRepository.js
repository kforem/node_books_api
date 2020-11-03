const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/booksapi";
const booksPromise = MongoClient.connect(url, {
    bufferMaxEntries: 0
}).then(function (client) {
    return client.db().collection("books");
});

// DDD - aggregate
module.exports = {
    async createOrUpdate({title, authors, isbn, description}) {
        const books = await booksPromise;
        return books.updateOne(
            {isbn: isbn},
            {$set : {title, authors, isbn, description} },
            {upsert: true}
        );
    },
    async findOne(isbn) {
        const books = await booksPromise;
        return books.findOne(
            {isbn},
            { projection: {_id: 0} }
        );
    }
};
