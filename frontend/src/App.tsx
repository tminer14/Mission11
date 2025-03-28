import "./App.css";
import BookstorePage from "./pages/BookstorePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyBookPage from "./pages/BuyBookPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookstorePage />} />
            <Route path="/buybook/:bookTitle/:bookID" element={<BuyBookPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
