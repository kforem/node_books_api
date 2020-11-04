const router = require('express').Router();
const bookRepository = require("./bookRepository");
const bookServiceFactory = require("./bookService");
const bookService = bookServiceFactory(bookRepository);
const bookControllerFactory = require("./bookController");
const {createOrUpdate, details} = bookControllerFactory({bookService, bookRepository});
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.get("/book/:isbn", details);

module.exports = router;
