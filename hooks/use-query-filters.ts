import {useRouter} from "next/navigation";
import {useEffect} from "react";
import qs from "qs"
import {Filters} from "@/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      productTypes: Array.from(filters.productTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });

  }, [filters.sizes, filters.prices, filters.selectedIngredients, filters.productTypes, router]);
}