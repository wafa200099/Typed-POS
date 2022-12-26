import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategory from "../component/AddCategory";
import EditableRowCat from "../component/EditableRowCat";
import Modal from "../component/Modal";
import Pagination from "../component/Pagination";
import ReadOnlyRowCat from "../component/ReadOnlyRowCat";
import SideNavBarLayout from "../layouts/SideNavBarLayout";
import { categoriesProps, editCategoryFormDataProps } from "../Interfaces";

function ProductCatagories() {
  const [categories, setCategories] = useState<categoriesProps[]>([]);
  const [editCatagorieId, setEditCatagorieId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<
    categoriesProps[]
  >([]);
  const [editFormData, setEditFormData] = useState<editCategoryFormDataProps>({
    name: "",
  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const baseUrl: string = process.env.REACT_APP_BACKEND_PATH!;
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const fetchCategories = async () => {
    const result = await axiosInstance.get("category");
    setCategories(await result.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId: number) => {
    const newCatagories = [...categories];
    const delelm = categories.findIndex(
      (category) => category.id === categoryId
    );
    newCatagories.splice(delelm, 1);
    await axiosInstance.delete(`category/${categoryId}`);
    setCategories(newCatagories);
    toast.error(`category Removed Successfully`, toastOptions);
  };
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
    await axiosInstance.put(`category/${editCatagorieId}`, {
      ...editedcategory,
    });
    setCategories(newCatagories);
    fetchCategories();
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

  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

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
      <Button variant="primary" onClick={toggleShowModal} className="mb-4">
        ADD CATEGORY
      </Button>
      {showModal ? (
        <Modal>
          <div className="Add-modal-container">
            <AddCategory
              categories={categories}
              setCategories={setCategories}
              toggleShowModal={toggleShowModal}
            />
          </div>
        </Modal>
      ) : null}

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
              <Fragment>
                {editCatagorieId === category.id ? (
                  <EditableRowCat
                    key={key}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRowCat
                    category={category}
                    key={key}
                    deleteCategory={deleteCategory}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
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
    </MainLayout>
  );
}

export default ProductCatagories;
