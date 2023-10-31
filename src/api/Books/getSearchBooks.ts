import axios from "axios";
import { Book } from "./getBook";
import { client } from "..";

export type GetBooksParams = { page?: number; search?: string };

export type GetBooksSuccessResponse = {
  total: string;
  page: number;
  books: Book[];
};

export const getBooksSearch = (
  params: GetBooksParams
): Promise<GetBooksSuccessResponse> => {
  const { search, page } = params;

  return client.get(`/search/${search}/${page}`).then((res) => res.data);
};
