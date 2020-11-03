const express = require("express");
const MongoClient = require('mongodb').MongoClient;

const app = express();

const url = 'mongodb://localhost:27017/booksapi';

MongoClient.connect(url, function(err, client) {
    if(err) console.log(err);
    else console.log("Connected successfully to server");
});


app.use(express.json());
app.get("/", function (req, res, next) {
    res.send("Hello World!");
});
app.post("/book", function(req, res) {
    const {title, authors, isbn, description} = req.body;
    MongoClient.connect(url, function(err, client) {
        client.db().collection("books").updateOne(
            {isbn: isbn},
            { $set: {title, authors, isbn, description} },
            {upsert: true}
        );

        client.close();
    });

    res.json({title, authors, isbn, description});
});
app.get("/book/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    MongoClient.connect(url, function(err, client) {
        client.db().collection("books").findOne({isbn}, {projection: {_id: false}}, function(err, book) {
            res.json(book);
        });

        client.close();
    });
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