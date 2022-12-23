export interface categoriesProps {
  id: number | null;
  name: string;
}

export interface productProps {
  id: number | null;
  name: string;
  code: string;
  price: string;
  category: string;
  image: string;
}

export interface editProductFormDataProps {
  name: string;
  code: string;
  price: string;
  category: string;
  image: string;
}

export interface editCategoryFormDataProps {
  name: string;
}

export interface cartProps {
  quantity: number;
  total: number;
  id: number | null;
  name: string;
  code: string;
  price: string;
  category: string;
  image: string;
}
