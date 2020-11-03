const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/booksapi2';

let booksPromise = MongoClient.connect(url).then(function (client) {
    return client.db().collection("books");
});

async function createOrUpdate(req, res, next) {
    try {
        const {title, authors, isbn, description} = req.body;
        const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        );
        res.json({title, authors, isbn, description});
    } catch (e) {
        next(e);
    }
}
async function details(req, res, next) {
    try {
        const isbn = req.params.isbn;
        const books = await booksPromise;
        const book = await books.findOne(
            {isbn},
            {projection: {_id: 0}}
        );
        res.json(book);
    } catch(e) {
        next(e);
    }
}

module.exports = {createOrUpdate, details};