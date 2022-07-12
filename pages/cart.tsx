import { useId } from "react";
import { useCartState } from "../components/Cart/CartContext";

const CartPage = () => {
  const ID = useId();

  const cartState = useCartState();

  return (
    <div>
      <ul>
        {cartState.items.map((item, index) => (
          <li key={`${ID}-${index}`}>
            {item.count} - {item.title} - {item.price} <br/>
            <button onClick={() => cartState.removeItemFromCart(item.id)}>
              usuń z koszyka
            </button>
            <br/><br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
