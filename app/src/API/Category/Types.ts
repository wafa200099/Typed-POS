export interface categoriesProps {
  id: number | null;
  name: string;
}

export interface editedcategoryTypes {
  editCatagorieId: number | null;
  editedcategory: categoriesProps;
}
export interface addedcategoryTypes {
  id: number;
  name: string;
}
