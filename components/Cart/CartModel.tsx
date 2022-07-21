import { CartItem } from "./CartContext";

export const getCardItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem(
    "HYPERFUNCTOR_SHOPPING_CART"
  );
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("HYPERFUNCTOR_SHOPPING_CART", JSON.stringify(cartItems));
};
