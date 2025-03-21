import { useEffect, useState } from "react";
import { book } from "./types/book";

function BookList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://localhost:7000/Bookstore?pageHowMany=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data);
    };
    fetchBook();
  }, [pageSize, pageNum]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
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
          </div>
        </div>
      ))}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => setPageSize(Number(p.target.value))}
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
