import { useEffect, useState } from "react";
import { book } from "../types/book";
import { useNavigate } from "react-router-dom";

// create varables to use later
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategory=${encodeURIComponent(cat)}`)
        .join(`&`);

      const response = await fetch(
        `https://localhost:7000/Bookstore?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
      );
      const data = await response.json();
      //get data from the json
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBook();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  const handleBuyBook = (book: book) => {
    // Navigate to the BuyBookPage and pass the book data through state
    navigate(`/buybook/${book.title}/${book.bookID}`, {
      state: { book }, // Pass the entire book object, including price
    });
  };


  return (
    <>
      {/* create a list of books */}
      <br />
      <div className="row row-cols-1 row-cols-md-3 g-4">
      {books.map((b) => (
        <div id="bookCard" className="card mb-4" key={b.bookID} style={{maxWidth:}}>
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
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {/* builds array out of size of total pages */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <br />
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
