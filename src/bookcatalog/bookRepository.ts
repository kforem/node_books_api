import { Db } from "mongodb";
import { Book } from "./book";

// interface BookRepository {}
export type BookRepository = {
  createOrUpdate(book: Book): Promise<any>;
  findOne(isbn: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
};

export const bookRepositoryFactory = (db: Db): BookRepository => {
  const books = db.collection("books");
  return {
    async createOrUpdate(book) {
      // const books = await booksPromise;
      return books.updateOne(
        { isbn: book.isbn },
        { $set: book },
        { upsert: true }
      );
    },
    async findOne(isbn) {
      // const books = await booksPromise;
      return books.findOne({ isbn }, { projection: { _id: 0 } });
    },
    async findAll() {
      // const books = await booksPromise;
      return books.find({}, { projection: { _id: false } }).toArray();
    },
  };
};
