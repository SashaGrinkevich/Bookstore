import { Book } from "./getBook";
import { client } from "..";
import axios from "axios";

type GetBooksParams = {
  limit: number;
  offset: number;
  search?: string;
  page: string;
};

type GetBooksSuccessResponse = {
  count: number;
  page?: string;
  books: Book[];
};

export const getBooks = (
  params: GetBooksParams
): Promise<GetBooksSuccessResponse> => {
  const { limit, offset, search, page } = params;

  return client
    .get("/new", {
      params: { limit, offset, search, page },
    })
    .then((res) => {
      return res.data;
    });
};
