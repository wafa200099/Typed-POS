import axiosInstance from "../httpClient";
import {editedcategoryTypes} from "./Types"

export const deleteCategoryApi = (categoryId: number) => {
  axiosInstance.delete(`category/${categoryId}`);
};



export const editCatagorieApi = (editCatagorieId: number,editedcategory:editedcategoryTypes) => {
    axiosInstance.put(`category/${editCatagorieId}`, {
        ...editedcategory,
      });
  };
  

  export const getCategoryApi = async() => {
    const result =  await axiosInstance.get("category");
    return  result.data

  };
  

