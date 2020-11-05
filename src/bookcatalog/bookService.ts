import { makeSlug } from "./makeSlug";
import { BookInput } from "./book";
import { BookRepository } from "./bookRepository";

export const bookServiceFactory = (bookRepository: BookRepository) => ({
  async createOrUpdate(book: BookInput) {
    const slug = makeSlug(book.title);
    await bookRepository.createOrUpdate({ ...book, slug });
  },
});
