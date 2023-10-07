import { Book } from "./getBook";
import { client } from "..";

type GetBooksSuccessResponse = {
  results: Book[];
}

export const getBooks = (): Promise<GetBooksSuccessResponse> => {
  return client
    .get(`/new`)
    .then((res) => res.data.books);
};
