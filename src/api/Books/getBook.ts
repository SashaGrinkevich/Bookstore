import { client } from "..";

export interface Book {
  bookId: any;
  error: boolean;
  title: string;
  subtitle: string;
  isbn13: number | string;
  price: string;
  image: string;
  url: string;
  authors: string;
  publisher: string;
  isbn10: number | string;
  pages: number;
  year: number;
  rating: boolean;
  desc: string;
  pdf?: {};
  isFavorite: boolean;
  isCart:boolean;
  count: number;
}

type GetBookParams = { id: Book["isbn13"] };

type GetBookSuccessResponse = Book;

export const getBook = ({
  id,
}: GetBookParams): Promise<GetBookSuccessResponse> => {
  return client
  .get(`/books/${id}`)
  .then((res) => res.data);
};
