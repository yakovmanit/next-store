import {CoffeeSize, CoffeeType, mapCoffeeType} from "@/shared/constants/coffee";
import {Ingredient} from "@prisma/client";

export const getCartItemDetails = (
  coffeeType: CoffeeType,
  coffeeSize: CoffeeSize,
  ingredients: Ingredient[],
): string => {
  const details = [];

  if (coffeeSize && coffeeType) {
    const typeName = mapCoffeeType[coffeeType];
    details.push(`${typeName} ${coffeeSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}