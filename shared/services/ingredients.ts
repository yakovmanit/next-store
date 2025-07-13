import {axiosInstance} from "@/shared/services/instance";
import {ApiRoutes} from "@/shared/services/constants";
import {Ingredient} from "@prisma/client";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}