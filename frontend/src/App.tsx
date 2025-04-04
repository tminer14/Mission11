import "./App.css";
import BookstorePage from "./pages/BookstorePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyBookPage from "./pages/BuyBookPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminBookPage from "./pages/AdminBookPage";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookstorePage />} />
            <Route
              path="/buybook/:bookTitle/:bookID"
              element={<BuyBookPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBookPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
