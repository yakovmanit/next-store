export const mapCoffeeSize = {
  20: '20 pcs',
  30: '30 pcs',
  40: '40 pcs',
} as const;

export const mapCoffeeType = {
  1: 'Filter',
  2: 'Espresso',
} as const;

export const coffeeSizes = Object.entries(mapCoffeeSize).map(([value, name]) => ({
  name,
  value,
}));

export const coffeeTypes = Object.entries(mapCoffeeType).map(([value, name]) => ({
  name,
  value,
}));

export type CoffeeSize = keyof typeof mapCoffeeSize;
export type CoffeeType = keyof typeof mapCoffeeType;