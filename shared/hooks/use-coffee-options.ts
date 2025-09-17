import {useEffect, useState} from "react";
import {CoffeeSize, CoffeeType} from "@/shared/constants/coffee";
import {Variant} from "@/shared/components/shared/group-variants";
import {useSet} from "react-use";
import {getAvailableCoffeeSizes} from "@/shared/lib";
import {ProductItem} from "@prisma/client";

interface ReturnProps {
  size: CoffeeSize;
  type: CoffeeType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  setSize: (size: CoffeeSize) => void;
  setType: (size: CoffeeType) => void;
  addIngredient: (id: number) => void;
}

export const useCoffeeOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<CoffeeSize>(20);
  const [type, setType] = useState<CoffeeType>(1);
  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

  const availableSizes = getAvailableCoffeeSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(item => Number(item.value) === size && !item.disabled);
    const firstAvailableSize = availableSizes?.find(item => !item.disabled);

    if (!isAvailableSize && firstAvailableSize) {
      setSize(Number(firstAvailableSize.value) as CoffeeSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  };
}