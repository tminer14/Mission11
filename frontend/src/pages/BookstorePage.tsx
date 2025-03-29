import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";
import Footer from "../components/Footer";

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container md-4">
        <CartSummary/>
      <div className="row">
        <WelcomeBand />
      </div>
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default BookstorePage;
