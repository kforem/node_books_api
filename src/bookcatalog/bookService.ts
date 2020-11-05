import { makeSlug } from "./makeSlug";
import { BookInput } from "./book";
import { BookRepository } from "./bookRepository";

// type BookService = ReturnType<typeof bookServiceFactory>;
export type BookService = {
  createOrUpdate(book: BookInput): Promise<any>;
};

export const bookServiceFactory = (
  bookRepository: BookRepository
): BookService => ({
  async createOrUpdate(book: BookInput) {
    const slug = makeSlug(book.title);
    await bookRepository.createOrUpdate({ ...book, slug });
  },
});
