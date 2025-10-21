import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import qs from "qs"
import {Filters} from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
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
    }

    isMounted.current = true;

  }, [filters.sizes, filters.prices, filters.selectedIngredients, filters.productTypes, router]);
}