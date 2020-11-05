module.exports = (db) => {
  const { BOOK, BOOK_COLLECTION } = require("./links").resources;
  const router = require("express").Router();
  const { bookRepositoryFactory } = require("./bookRepository");
  const bookRepository = bookRepositoryFactory(db);
  const { bookServiceFactory } = require("./bookService");
  const bookService = bookServiceFactory(bookRepository);
  const { bookControllerFactory } = require("./bookController");
  const { createOrUpdate, details, getList } = bookControllerFactory({
    bookService,
    bookRepository,
  });
  const { validate } = require("./validateBookMiddleware");

  router.post(BOOK_COLLECTION, validate, createOrUpdate);
  router.get(BOOK_COLLECTION, getList);
  router.get(BOOK, details);

  return router;
};
