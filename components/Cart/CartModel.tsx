import { CartItem } from "./CartContext";

export const getCardItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem(
    "HYPERFUNCTOR_SHOPPING_CART"
  );
  console.log("TEST", itemsFromLocalStorage);
  if (!itemsFromLocalStorage) {
    console.log(1);
    return [];
  }
  try {
    console.log(2);
    const items = JSON.parse(itemsFromLocalStorage);
    console.log("ITEMS", items)
    return items;
  } catch (err) {
    console.log(3);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("HYPERFUNCTOR_SHOPPING_CART", JSON.stringify(cartItems));
};
