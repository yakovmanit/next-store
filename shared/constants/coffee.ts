export const mapCoffeeSize = {
  20: 'Small',
  30: 'Medium',
  40: 'Big',
} as const;

export const mapCoffeeType = {
  1: 'Filter',
  2: 'Espresso',
} as const;

export const coffeeSizes = Object.entries(mapCoffeeSize).map(([name, value]) => ({
  name,
  value,
}));
