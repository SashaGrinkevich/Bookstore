import { Book } from "./getBook";
import { client } from "..";
import axios from "axios";


export type GetBooksSuccessResponse = {
  total: string;
  page: number;
  books: Book[];
  
};

export type GetBooksParams = { 
  page: string; 
  search: string };

export const getBooksSearch = (
  params: GetBooksParams
): Promise<GetBooksSuccessResponse> => {
  const { search, page } = params;
  return client
   .get(`/search/${search}/${page}`)
   .then((res) => res.data);
};
