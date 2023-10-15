import { Book } from "./getBook";
import { client } from "..";

type GetPostsParams = { limit: number; offset: number; search?: string };

type GetBooksSuccessResponse = Book []


export const getBooks = (
  params: GetPostsParams
): Promise<GetBooksSuccessResponse> => {
  const { limit, offset, search } = params;
  return client
    .get(`/new`,{params:{limit,offset,search}})
    .then((res) => res.data.books);
};
