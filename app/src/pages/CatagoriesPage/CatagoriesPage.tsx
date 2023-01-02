import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useMemo,
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
  // const [categories, setCategories] = useState<categoriesProps[]>([]);
  const [editCatagorieId, setEditCatagorieId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<
    categoriesProps[]
  >([]);
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<editCategoryFormDataProps>({
    name: "",
  });

  const queryClient = useQueryClient();

  const toggleAddCategoryForm = () => {
    setIsAddCategoryFormOpen(!isAddCategoryFormOpen);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["category"],
    getCategoryApi
  );

  const catagories = data;

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

    editCatagorieApi(editCatagorieId!, editedcategory);
    queryClient.setQueriesData<categoriesProps[]>(["category"], (oldCat) => {
      return oldCat?.map((cat) => {
        if (cat.id === editCatagorieId) {
          return editedcategory;
        }
        return cat;
      });
    });
    setEditCatagorieId(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 5;
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const cat = useMemo(
    () =>
      search
        ? data?.filter((category) =>
            category.name.toLowerCase().includes(search.toLowerCase())
          )
        : data ?? [],
    [catagories, search]
  );

  const currentcategories = useMemo(
    () => cat?.slice(indexOfFirstCategory, indexOfLastCategory),
    [cat, indexOfFirstCategory, indexOfLastCategory]
  );

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
        onAdd={() => queryClient.invalidateQueries(["category"])}
      />

      {isLoading ? (
        <div>....loading</div>
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
              {currentcategories?.map((category, key) => (
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
              categoryPerPage={categoryPerPage}
              totalCategories={catagories?.length}
              paginate={paginate}
            />
          </div>
        </form>
      )}
    </MainLayout>
  );
};

export default CatagoriesPage;
