import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/booksapi";
export const connection = MongoClient.connect(url, {
  bufferMaxEntries: 0,
}).then(function (client) {
  return client.db();
});
