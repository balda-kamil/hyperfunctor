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
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
