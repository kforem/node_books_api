export type BookInput = {
  isbn: string;
  title: string;
  authors: string[];
  description: string;
};

export type Book = BookInput & { slug: string };

// interface BookInput {
//     isbn: string;
//     title: string;
//     authors: string[];
//     description: string;
// }
//
// interface Book extends  BookInput {
//     slug: string;
// }
