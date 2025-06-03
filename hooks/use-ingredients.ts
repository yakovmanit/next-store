import {useEffect, useState} from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-client";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { ingredients, loading };
}