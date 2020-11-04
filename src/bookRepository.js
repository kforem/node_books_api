const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/booksapi";
const booksPromise = MongoClient.connect(url, {
    bufferMaxEntries: 0
}).then(function (client) {
    return client.db().collection("books");
});

// DDD - aggregate
module.exports = {
    async createOrUpdate(book) {
        const books = await booksPromise;
        return books.updateOne(
            {isbn: book.isbn},
            {$set : book },
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
