import { ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  supplierId: number;
  wholesalePrice: number;
  price: number;
  categories: Category | Category[];
};

export type Category = "accessory" | "electronic" | "audio";

export enum DiscountCodes {
  APPL10 = "APPL10",
  AUDIO15 = "AUDIO15",
  ELEC25 = "ELEC25",
  FreeShipping = "freeShipping!",
}

export enum SortEnums {
  NAME_ASC = "name asc",
  NAME_DESC = "name desc",
  PRICE_ASC = "price asc",
  PRICE_DESC = "price desc",
}

export type ResponseData = {
  itemsCost: number;
  shippingCost: number;
  discount: number;
  finalCost: number;
};

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItemProps = {
  id: number;
  quantity: number;
};

export type ShoppingCartContextProps = {
  cartQuantity: number;
  cartItems: CartItemProps[];
  loading: boolean;
  products: Product[];
  isOpen: boolean;
  sortString: string;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleDrawer: (open: boolean) => () => void;
  handleChangeSort: (event: SelectChangeEvent) => void;
};
