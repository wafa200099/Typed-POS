export interface AddProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    categories:categoriesProps[]
  }
  
  export interface categoriesProps {
    id: number | null;
    name: string;
  }