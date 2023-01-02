import axiosInstance from "../httpClient";
import { ProductTypes } from "./Types";

export const deleteProductApi = (productId: number) => {
  axiosInstance.delete(`products/${productId}`);
};

export const editProductApi = (
  editProductId: number,
  editedProduct: ProductTypes
) => {
  axiosInstance.put(`products/${editProductId}`, { ...editedProduct });
};

export const getProductApi = async () => {
  const responce = await axiosInstance.get("products");
  const products=responce.data
  return  products
};

export const addProductApi = async (values: ProductTypes) => {
  await axiosInstance.post("products", { ...values });
};
