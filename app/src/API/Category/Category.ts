import axiosInstance from "../httpClient";


export const deleteCategoryApi = (categoryId: number) => {
  axiosInstance.delete(`category/${categoryId}`);
};
