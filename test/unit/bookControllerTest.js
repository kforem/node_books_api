const assert = require("assert");
const {
  bookControllerFactory,
} = require("../../src/bookcatalog/bookController");

describe("Book controller", function () {
  it("create or update happy path", async function () {
    // given
    const bookService = {
      async createOrUpdate() {},
    };
    const req = {
      body: {
        isbn: "ISBN",
      },
    };
    const res = {
      redirect(path) {
        res.redirect.invokedWith = path;
      },
    };
    const bookController = bookControllerFactory({ bookService });

    // when
    await bookController.createOrUpdate(req, res);

    // then
    assert.deepStrictEqual(res.redirect.invokedWith, "/book/ISBN");
  });

  it("create or update error", async function () {
    // given
    const req = { body: {} };
    const bookService = {
      async createOrUpdate() {
        throw new Error("sth bad happened");
      },
    };
    function next(error) {
      next.invokedWith = error;
    }
    const bookController = bookControllerFactory({ bookService });

    // when
    await bookController.createOrUpdate(req, null, next);

    // then
    assert.deepStrictEqual(next.invokedWith, new Error("sth bad happened"));
  });
});
