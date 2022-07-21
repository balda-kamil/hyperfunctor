import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCardItemsFromStorage, setCartItemsInStorage } from "./CartModel";

export interface CartItem {
  // id: number;
  slug: string;
  price: number;
  title: string;
  count: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (slug: CartItem["slug"]) => void;
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
                (existingItem) => existingItem.slug === item.slug
              );
              if (!existingItem) {
                return [...prevState, item];
              }

              return prevState.map((existingItem) => {
                if (existingItem.slug === item.slug) {
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
        removeItemFromCart: (slug) => {
          setCartItems((prevState = []) => {
            const existingItem = prevState.find((eItem) => eItem.slug === slug);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((eItem) => eItem.slug !== slug);
            }
            return prevState.map((eItem) => {
              if (eItem.slug === slug) {
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
