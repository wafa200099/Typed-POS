import { useQuery } from "@tanstack/react-query";
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteCategoryApi,
  editCatagorieApi,
  getCategoryApi,
} from "../../API/Category";
import EditableRowCategory from "../../Components/EditableRowCategory/EditableRowCategory";
import Pagination from "../../Components/Pagination/Pagination";
import ReadOnlyRowCategory from "../../Components/ReadOnlyRowCategory/ReadOnlyRowCategory";
import { categoriesProps, editCategoryFormDataProps } from "../../Interfaces";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SideNavBarLayout from "../../layouts/SideNavBarLayout/SideNavBarLayout";
import AddCategoryForm from "./components/AddCategoryForm";

const CatagoriesPage: FC = () => {
  const [categories, setCategories] = useState<categoriesProps[]>([]);
  const [editCatagorieId, setEditCatagorieId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<
    categoriesProps[]
  >([]);
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<editCategoryFormDataProps>({
    name: "",
  });

  const toggleAddCategoryForm = () => {
    setIsAddCategoryFormOpen(!isAddCategoryFormOpen);
  };

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const { data, isLoading, isError, error } = useQuery(
    ["category"],
    getCategoryApi
  );

  const catagories:categoriesProps[]=data
  // const sleep = (ms: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  // const fetchCategories = () => {
  // return
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, [data]);

  // const deleteCategory = async (categoryId: number) => {
  //   const newCatagories = [...categories];
  //   const delelm = categories.findIndex(
  //     (category) => category.id === categoryId
  //   );
  //   newCatagories.splice(delelm, 1);
  //   deleteCategoryApi(categoryId);
  //   setCategories(newCatagories);
  //   toast.error(`category Removed Successfully`, toastOptions);
  // };

  const handleEditClick = (e: MouseEvent, category: categoriesProps) => {
    e.preventDefault();
    setEditCatagorieId(category.id);
    const formValues = {
      name: category.name,
    };
    setEditFormData(formValues);
  };

  const handleEditFormChange = (event: ChangeEvent) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute(
      "name"
    ) as keyof typeof editFormData;
    const element = event.target as HTMLInputElement;
    const fieldValue = element.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditCatagorieId(null);
  };

  const handleEditFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const editedcategory = {
      id: editCatagorieId,
      name: editFormData.name,
    };
    const newCatagories = [...categories];
    // index of row we are editing now
    const index = categories.findIndex(
      (category) => category.id === editCatagorieId
    );
    newCatagories[index] = editedcategory;
    editCatagorieApi(editCatagorieId!, editedcategory);
    setCategories(newCatagories);
    // fetchCategories();
    setEditCatagorieId(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(5);
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredCategories(categories);
    if (search) {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, categories]);

  return (
    <MainLayout>
      <SideNavBarLayout />
      <div className="input-group mb-4 mt-3">
        <div className="form-outline">
          <input
            className="form-control"
            id="form1"
            type="search"
            placeholder="Search Category Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary btn-sm h-70">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <Button
        variant="primary"
        onClick={toggleAddCategoryForm}
        className="mb-4"
      >
        ADD CATEGORY
      </Button>
      <AddCategoryForm
        isOpen={isAddCategoryFormOpen}
        onClose={() => {
          setIsAddCategoryFormOpen(false);
        }}
        onAdd={() => {
          // fetchCategories();
        }}
      />

      {isLoading ? (
        <div>looooooooooooding</div>
      ) : (
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-responsive table-sm border w-50 shadow bg-light">
            <thead>
              <tr>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Name
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category, key) => (
                <>
                  {editCatagorieId === category.id ? (
                    <EditableRowCategory
                      key={key}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRowCategory
                      category={category}
                      key={key}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div className="container">
            <Pagination
              setCategoryPerPage={setCategoryPerPage}
              categoryPerPage={categoryPerPage}
              totalCategories={categories.length}
              paginate={paginate}
            />
          </div>
        </form>
      )}
    </MainLayout>
  );
};

export default CatagoriesPage;
