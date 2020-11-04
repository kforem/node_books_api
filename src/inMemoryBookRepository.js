// duck typing

const books = {};

const bookRepository = {
    async createOrUpdate(book) {
        books[book.isbn] = book;
    },
    async findOne(isbn) {
        return books[isbn];
    }
};

module.exports = bookRepository;
