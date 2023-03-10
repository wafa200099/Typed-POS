import { categoriesProps } from "../../Interfaces";
import axiosInstance from "../httpClient";
import { editedcategoryTypes, addedcategoryTypes } from "./Types";

export const deleteCategoryApi = async (categoryId: number) => {
  await axiosInstance.delete(`category/${categoryId}`);
};


export const editCatagorieApi = async ({
  editCatagorieId,
  editedcategory,
}: editedcategoryTypes) => {
  await axiosInstance.put(`category/${editCatagorieId}`, {
    ...editedcategory,
  });
};

export const getCategoryApi = async () => {
  const responce = await axiosInstance.get<categoriesProps[]>("category");
  const category = responce.data;
  return category;
};

export const addCategoryApi = async (values: addedcategoryTypes) => {
  await axiosInstance.post("category", { ...values });
};
