import {calcTotalProductPrice} from "@/shared/lib/calc-total-product-price";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";
import {Ingredient, ProductItem} from "@prisma/client";

export const getCoffeeDetails = (
  type: CoffeeType,
  size: CoffeeSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalProductPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const textDetails = 'lorem ipsum dolor sit amet consectetur adipisicing elit.';

  return {
    totalPrice,
    textDetails,
  };
}