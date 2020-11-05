// duck typing

const bookRepositoryFactory = () => {
  const books = {};
  return {
    // local reasoning
    async createOrUpdate(book) {
      books[book.isbn] = book;
    },
    async findOne(isbn) {
      return books[isbn];
    },
  };
};

module.exports = bookRepositoryFactory;
