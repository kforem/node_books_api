const express = require("express");
const app = express();

function log(req, res, next) {
    console.log("new request at ", new Date());
    next();
}
function auth(req, res, next) {
    console.log("doing auth");
    next();
}

app.use(log);
app.use(auth);
app.get("/", function (req, res, next) {
    res.send("Hello World!");
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

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});