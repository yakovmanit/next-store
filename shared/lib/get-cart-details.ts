import {CartDTO} from "@/shared/services/dto/cart.dto";
import {calcCartItemPrice} from "@/shared/lib/calc-cart-item-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  coffeeSize?: number | null;
  coffeeType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    disabled: false,
    price: calcCartItemPrice(item),
    coffeeSize: item.productItem.size,
    coffeeType: item.productItem.productType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items: items,
    totalAmount: data.totalAmount,
  }
}