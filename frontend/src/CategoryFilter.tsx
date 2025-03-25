import { useEffect, useState } from "react";
import "./categoryFilter.css";

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:7000/Bookstore/GetBookTypes"
        );
        const data = await response.json();
        console.log("Fetched categories", data);

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  function HandleCheckboxChange({ target }: { target: HTMLInputElement }) {}

  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
