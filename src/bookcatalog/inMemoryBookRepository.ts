import { BookRepository } from "./bookRepository";
import { Book } from "./book";

export const bookRepositoryFactory = (): BookRepository => {
  type Books = {
    [isbn: string]: Book;
  };
  const books: Books = {};
  return {
    async findAll() {
      return Object.values(books);
    },
    async createOrUpdate(book) {
      books[book.isbn] = book;
    },
    async findOne(isbn) {
      return books[isbn];
    },
  };
};
