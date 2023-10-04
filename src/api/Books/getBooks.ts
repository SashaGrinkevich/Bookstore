import { Book } from "./getBook";

export const getBooks = (): Promise<Book[]> => {
  return fetch(`https://api.itbook.store/1.0/new`)
    .then((res) => res.json())
    .then((res) => res.books);
};
