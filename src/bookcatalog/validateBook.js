const Joi = require("joi");

const authorSchema = Joi.string().required().min(1).max(50);

const schema = Joi.object({
  title: Joi.string().trim().required().min(1).max(100),
  authors: Joi.array().items(authorSchema).required().min(1).max(10),
  description: Joi.string().allow("").max(5000),
  isbn: Joi.string().required().uppercase().length(10),
});

function validateBook(book) {
  const result = schema.validate(book, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });
  return result.error ? result.error.details : null;
  // return result.error ? Maybe.Just(result.error.details) : Maybe.None();
}

module.exports = validateBook;