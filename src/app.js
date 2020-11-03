const express = require("express");
const MongoClient = require('mongodb').MongoClient;

const app = express();

const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url).then(function (client) {
    return client.db().collection("books");
});

// application scope, request scope

app.use(express.json());
app.get("/", function (req, res, next) {
    res.send("Hello World!");
});
app.post("/book", function (req, res, next) {
    const {title, authors, isbn, description} = req.body;
    booksPromise
        .then(function (books) {
            return books.updateOne(
                {isbn: isbn},
                {$set: {title, authors, isbn, description}},
                {upsert: true}
            );
        })
        .then(function () {
            res.json({title, authors, isbn, description});
        })
        .catch(next);


});
app.get("/book/:isbn", function (req, res, next) {
    const isbn = req.params.isbn;
    booksPromise
        .then(function (books) {
            return books.findOne(
                {isbn},
                {projection: {_id: 0}}
            );
        })
        .then(function (book) {
            res.json(book);
        })
        .catch(next);
});

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;
