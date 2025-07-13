import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import {useState} from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps{
  productTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  productTypes: Set<string>;
  sizes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setProductTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Ingredients filter
  const [selectedIngredients, { toggle: toggleIngredients } ] = useSet(new Set<string>(
    searchParams.get('ingredients')?.split(',')
  ));

  // Sizes filter
  const [sizes, { toggle: toggleSizes } ] = useSet(new Set<string>(
    searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
  ));

  // Product types filter
  const [productTypes, { toggle: toggleProductTypes } ] = useSet(new Set<string>(
    searchParams.has('productTypes') ? searchParams.get('productTypes')?.split(',') : []
  ));

  // Prices filter
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  return {
    selectedIngredients,
    sizes,
    productTypes,
    prices,
    setSelectedIngredients: toggleIngredients,
    setSizes: toggleSizes,
    setProductTypes: toggleProductTypes,
    setPrices: updatePrice,
  }
}