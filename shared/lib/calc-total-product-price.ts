import {Ingredient, ProductItem} from "@prisma/client";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";

/**
 * Calculates the total price of a product based on its type, size, and selected ingredients.
 *
 * @param {CoffeeType} type - The type of coffee product (e.g., espresso, filter).
 * @param {CoffeeSize} size - The size of the coffee product (e.g., small, medium, large).
 * @param {ProductItem[]} items - An array of product items, each containing information about different types, sizes, and their corresponding prices.
 * @param {Ingredient[]} ingredients - An array of ingredients, each containing details such as id and price.
 * @param {Set<number>} selectedIngredients - A set of ingredient IDs chosen by the user to be included in the product.
 * @returns {number} The total calculated price of the product, including the base product price and the prices of selected ingredients.
 */
export const calcTotalProductPrice = (
  type: CoffeeType,
  size: CoffeeSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
): number => {
  const productPrice = items.find((item) => item.productType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => {
      return selectedIngredients.has(ingredient.id);
    })
    .reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);

  return productPrice + totalIngredientsPrice;
}