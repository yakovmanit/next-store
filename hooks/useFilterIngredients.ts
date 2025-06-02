import {Ingredient} from "@prisma/client";
import {useEffect, useState} from "react";
import {Api} from "@/services/api-client";
import {useSet} from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle } ] = useSet(new Set<string>(values));

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);

        const ingredients = await Api.ingredients.getAll();

        setIngredients(ingredients);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds };
}