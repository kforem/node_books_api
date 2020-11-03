const express = require("express");
const app = express();
const bookRoutes = require("./bookRoutes");

app.use(express.json());
app.get("/", function (req, res, next) {
    res.send("Hello World!");
});
app.use("/", bookRoutes);

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
