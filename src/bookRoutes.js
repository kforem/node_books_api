module.exports = (db) => {
    const router = require('express').Router();
    const bookRepositoryFactory = require("./bookRepository");
    const bookRepository = bookRepositoryFactory(db);
    const bookServiceFactory = require("./bookService");
    const bookService = bookServiceFactory(bookRepository);
    const bookControllerFactory = require("./bookController");
    const {createOrUpdate, details, getList} = bookControllerFactory({bookService, bookRepository});
    const validateBook = require("./validateBookMiddleware");

    router.post("/book", validateBook, createOrUpdate);
    router.get("/book", getList);
    router.get("/book/:isbn", details);

    return router;
};
