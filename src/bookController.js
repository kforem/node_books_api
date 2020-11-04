// class BookController {
//     BookController() {
//         this.bookRepository = new BookRepository();
//         this.bookService = new BookService();
//     }
// }
const mapValues = require("lodash.mapvalues");

// const mapValues = (api, f) => Object.fromEntries(Object.entries(api).map(([key, value]) => [key, f(value)]));

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

function wrapWithTryCatch(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ({bookService, bookRepository}) => withErrorHandling({
    async createOrUpdate(req, res, next) {
        // HTTP
        const {title, authors, isbn, description} = req.body;
        // JS
        await bookService.createOrUpdate({title, authors, isbn, description});
        // HTTP
        res.redirect(`/book/${isbn}`);
    },
    async details(req, res, next) {
        const isbn = req.params.isbn;
        const book = await bookRepository.findOne(isbn);
        res.format({
            'text/html'() {
                res.send("HTML");
            },
            'application/json'() {
                res.json(book);
            },
            'default'() {
                res.json(book)
            }
        });
    }
});