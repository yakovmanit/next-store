import {CoffeeSize, CoffeeType, mapCoffeeType} from "@/shared/constants/coffee";
import {CartStateItem} from "@/shared/lib/get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  coffeeType?: CoffeeType,
  coffeeSize?: CoffeeSize,
): string => {
  const details = [];

  if (coffeeSize && coffeeType) {
    const typeName = mapCoffeeType[coffeeType];
    details.push(`${typeName} ${coffeeSize} items`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}