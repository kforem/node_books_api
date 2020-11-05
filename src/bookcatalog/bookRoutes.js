module.exports = (db) => {
  const { resources } = require("./links");
  const { BOOK, BOOK_COLLECTION } = resources;
  const router = require("express").Router();
  const bookRepositoryFactory = require("./bookRepository");
  const bookRepository = bookRepositoryFactory(db);
  const bookServiceFactory = require("./bookService");
  const bookService = bookServiceFactory(bookRepository);
  const bookControllerFactory = require("./bookController");
  const { createOrUpdate, details, getList } = bookControllerFactory({
    bookService,
    bookRepository,
  });
  const validateBook = require("./validateBookMiddleware");

  router.post(BOOK_COLLECTION, validateBook, createOrUpdate);
  router.get(BOOK_COLLECTION, getList);
  router.get(BOOK, details);

  return router;
};
