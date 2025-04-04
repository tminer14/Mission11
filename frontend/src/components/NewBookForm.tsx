import { useState } from "react";
import { book } from "../types/book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<book>({
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  //updates the form state as the user types the field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //processes the form submission and prevents default refreshing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Page Count{" "}
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Price{" "}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Project</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
