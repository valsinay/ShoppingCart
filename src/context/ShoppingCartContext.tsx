import { createContext, useState, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import {
  CartItemProps,
  Product,
  ShoppingCartContextProps,
  ShoppingCartProviderProps,
  SortEnums,
} from "../models/App.types";
import { SelectChangeEvent } from "@mui/material";

const API_URL_GET =
  "https://man-shopping-cart-test.azurewebsites.net/api/Products";

export const ShoppingCartContext = createContext(
  {} as ShoppingCartContextProps
);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const { data: products, loading } = useFetch<Product[]>(API_URL_GET);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortString, setSort] = useState<string>(SortEnums.NAME_ASC);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        products,
        loading,
        cartQuantity,
        cartItems,
        sortString,
        toggleDrawer,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        handleChangeSort,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
