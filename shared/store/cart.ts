import {create} from "zustand/index";
import { getCartDetails } from "../lib";
import {Api} from "@/shared/services/api-client";
import {CartStateItem} from "@/shared/lib/get-cart-details";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // get products from a cart
  fetchCartItems: () => Promise<void>;

  // update product quantity
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // add a product to a cart
  // TODO: add type for values
  addCartItem: (values: any) => Promise<void>;

  // remove a product from a cart
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},

  removeCartItem: async (id: number) => {},

  addCartItem: async (values: any) => {},
}));