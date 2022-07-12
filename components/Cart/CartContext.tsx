import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCardItemsFromStorage, setCartItemsInStorage } from "./CartModel";

export interface CartItem {
  id: number;
  price: number;
  title: string;
  count: number;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCardItemsFromStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }

    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems || [],
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            if (prevState !== undefined) {
              const existingItem = prevState.find(
                (existingItem) => existingItem.id === item.id
              );
              if (!existingItem) {
                return [...prevState, item];
              }

              return prevState.map((existingItem) => {
                if (existingItem.id === item.id) {
                  return {
                    ...existingItem,
                    count: existingItem.count + 1,
                  };
                }

                return existingItem;
              });
            }
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState = []) => {
            const existingItem = prevState.find((eItem) => eItem.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((eItem) => eItem.id !== id);
            }
            return prevState.map((eItem) => {
              if (eItem.id === id) {
                return {
                  ...eItem,
                  count: eItem.count - 1,
                };
              }
              return eItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error(
      `You forgot to add CartStateContextProvider in this application`
    );
  }
  return cartState;
};
