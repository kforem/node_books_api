import assert from "assert";
import { bookControllerFactory } from "../../src/bookcatalog/bookController";
import { Request, Response, NextFunction } from "express";
import { BookRepository } from "../../src/bookcatalog/bookRepository";

type MockFn<T> = ((arg: T) => any) & { invokedWith?: T };

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
    type MockResponse = {
      redirect: MockFn<string>;
    };
    const res: MockResponse = {
      redirect(path) {
        res.redirect.invokedWith = path;
      },
    };
    const bookController = bookControllerFactory({
      bookService,
      bookRepository: {} as BookRepository,
    });

    // when
    await bookController.createOrUpdate(
      req as Request,
      res as Response,
      {} as NextFunction
    );

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
    const next: MockFn<Error> = (error) => {
      next.invokedWith = error;
    };
    const bookController = bookControllerFactory({
      bookService,
      bookRepository: {} as BookRepository,
    });

    // when
    await bookController.createOrUpdate(
      req as Request,
      {} as Response,
      next as NextFunction
    );

    // then
    assert.deepStrictEqual(next.invokedWith, new Error("sth bad happened"));
  });
});
