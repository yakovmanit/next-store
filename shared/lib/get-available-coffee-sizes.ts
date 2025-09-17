import {ProductItem} from "@prisma/client";
import {coffeeSizes, CoffeeType} from "@/shared/constants/coffee";
import {Variant} from "@/shared/components/shared/group-variants";

export const getAvailableCoffeeSizes = (type: CoffeeType, items: ProductItem[]): Variant[] => {
  const filteredProductsByType = items.filter(item => item.productType === type);

  return coffeeSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredProductsByType.some(product => Number(product.size) === Number(item.value)),
  }));
}