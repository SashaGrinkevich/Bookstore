import { Book } from "./getBook";
import { client } from "..";
import axios from "axios";



type GetBooksSuccessResponse = Book[];


export const getBooks = (
): Promise<GetBooksSuccessResponse> => {
  return client
    .get(`/new`)
    .then((res) => res.data.books);
};
