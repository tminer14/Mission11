import { useEffect, useState } from "react";
import { book } from "../types/book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

// create varables to use later
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading books...</p>
  if (error) return <p>Error: {error}</p>

  const handleBuyBook = (book: book) => {
    // Navigate to the BuyBookPage and pass the book data through state
    navigate(`/buybook/${book.title}/${book.bookID}`, {
      state: { book }, // Pass the entire book object, including price
    });
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4 p-3">
        {/* create a list of books */}
        <br />
        {books.map((b) => (
          <div
            id="bookCard"
            className="card mb-4"
            key={b.bookID}
            style={{ maxWidth: "300px", minWidth: "250px" }}
          >
            <h3 className="card-title">
              <strong>{b.title}</strong>
            </h3>
            <div className="card-body">
              <ul className="list-unstyled">
                <strong>Author: </strong>
                {b.author}
              </ul>
              <ul className="list-unstyled">
                <strong>Publisher: </strong>
                {b.publisher}
              </ul>
              <ul className="list-unstyled">
                <strong>ISBN: </strong>
                {b.isbn}
              </ul>
              <ul className="list-unstyled">
                <strong>Classification: </strong>
                {b.classification}
              </ul>
              <ul className="list-unstyled">
                <strong>Category: </strong>
                {b.category}
              </ul>
              <ul className="list-unstyled">
                <strong>Page Count: </strong>
                {b.pageCount}
              </ul>
              <ul className="list-unstyled">
                <strong>Price: </strong>
                {b.price}
              </ul>
              <button
                className="btn btn-success"
                onClick={() => handleBuyBook(b)}
              >
                Buy Book
              </button>
            </div>
          </div>
        ))}
      </div>

    <Pagination
      currentPage={pageNum}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageChange={setPageNum}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPageNum(1);
      }}/>   

    </>
  );
}

export default BookList;
