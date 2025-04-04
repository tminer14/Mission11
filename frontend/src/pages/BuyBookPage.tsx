import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function BuyBookPage() {
  const navigate = useNavigate();
  //const { bookTitle, bookID } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();
  //const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const book = location.state?.book;

  //pass in as an item
  const HandleAddToCart = () => {
    const newItem: CartItem = {
      bookID: book?.bookID,
      title: book?.title || "",
      price: book?.price || 0,
      quantity: 1,
    };
    addToCart(newItem);
    setQuantity(quantity);
    navigate("/cart");
  };

  return (
    <>
      <h2>Buy {book?.title}</h2>

      <div>
        <h3>Price: ${book?.price}</h3>
        <button>Add to cart</button>
        <button onClick={HandleAddToCart}>View Cart</button>
      </div>

      {/* gives option to go back */}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyBookPage;
