//clarifying template of what the call is going to look like that you'll make

import { book } from "../types/book";

interface fetchBooksResponse {
  books: book[];
  totalNumBooks: number;
}

const API_URL = `https://tessammission13-dggxfectdwc4btax.westcentralus-01.azurewebsites.net`;

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]

  //this is what is eventually going to resolve to
): Promise<fetchBooksResponse> => {
  //error handling
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategory=${encodeURIComponent(cat)}`)
      .join(`&`);

    const response = await fetch(
      `${API_URL}/Bookstore?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (newBook: book): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/Bookstore/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to edit book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: book
): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/Bookstore/UpdateBook/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error("Failed to edit book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Bookstore/DeleteBook/${bookID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
