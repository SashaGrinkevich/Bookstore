export interface Book {
  title: string;
  subtitle: string;
  isbn13: number | string;
  price: string;
  image: string;
  url: string;
  authors:string;
  publisher:string;
  isbn10: number|string;
  pages: number ;
  year: number ;
  rating: string;
  desc:string;
  pdf:string
}

type GetBooksParams = { isbn13: Book["isbn13"] };

type GetBooksSuccessResponse = Book;

export const getBook = ({
  isbn13,
}: GetBooksParams): Promise<GetBooksSuccessResponse> => {
  return fetch(`https://api.itbook.store/1.0/${isbn13}`).then((res) =>
    res.json()
  );
};
