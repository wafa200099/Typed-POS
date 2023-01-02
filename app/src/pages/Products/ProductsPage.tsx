import {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCategoryApi } from "../../API/Category";
import {
  deleteProductApi,
  editProductApi,
  getProductApi,
} from "../../API/Product";
import EditableRow from "../../Components/Editable Row Product/EditableRowProduct";
import Pagination from "../../Components/Pagination/Pagination";
import ReadOnlyRow from "../../Components/ReadOnlyRowProduct/ReadOnlyRowProduct";
import {
  categoriesProps,
  editProductFormDataProps,
  productProps,
} from "../../Interfaces";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SideNavBarLayout from "../../layouts/SideNavBarLayout/SideNavBarLayout";
import AddProductForm from "./components/AddProductForm";

const ProductsPage = () => {
  const [products, setProducts] = useState<productProps[]>([]);
  const [categories, setCategories] = useState<categoriesProps[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<productProps[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<editProductFormDataProps>({
    name: "",
    code: "",
    price: "",
    category: "",
    image: "",
  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setProducts(await getProductApi());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    setCategories(await getCategoryApi());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteProduct = async (productId: number) => {
    const newProducts = [...products];
    const deletedElementIndex = products.findIndex(
      (product) => product.id === productId
    );
    newProducts.splice(deletedElementIndex, 1);
    deleteProductApi(productId);
    setProducts(newProducts);
    toast.error(`Product Removed Successfully`, toastOptions);
  };

  const handleEditClick = (e: MouseEvent, product: productProps) => {
    e.preventDefault();
    setEditProductId(product.id);
    const formValues = {
      name: product.name,
      code: product.code,
      price: product.price,
      category: product.category,
      image: product.image,
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
    setEditProductId(null);
  };

  const handleEditFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const editedProduct = {
      id: editProductId,
      name: editFormData.name,
      code: editFormData.code,
      price: editFormData.price,
      category: editFormData.category,
      image: editFormData.image,
    };

    const newProducts = [...products];
    // index of row we are editing now
    const index = products.findIndex((product) => product.id === editProductId);
    newProducts[index] = editedProduct;
    editProductApi(editProductId!, editedProduct);
    setProducts(newProducts);
    setEditProductId(null);
  };

  useEffect(() => {
    setProducts(products);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleAddProductForm = () => {
    setIsAddProductFormOpen(!isAddProductFormOpen);
  };
  return (
    <MainLayout>
      <SideNavBarLayout />
      <div className="w-80">
        <div className="input-group mb-4 mt-3">
          <div className="form-outline">
            <input
              className="form-control"
              id="form1"
              type="search"
              placeholder="Search Product Name"
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
          onClick={toggleAddProductForm}
          className="mb-4"
        >
          ADD PRODUCT
        </Button>
        <AddProductForm
          isOpen={isAddProductFormOpen}
          onClose={() => {
            setIsAddProductFormOpen(false);
          }}
          onAdd={() => {
            fetchCategories();
          }}
          categories={categories}
        />

        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-responsive table-sm border shadow bg-light">
            <thead>
              <tr>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Name
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Code
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Price
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Category
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Image
                </th>
                <th scope="col" className="p-3 bg-secondary text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((currentProduct, key) => (
                <Fragment>
                  {editProductId === currentProduct.id ? (
                    <EditableRow
                      categories={categories}
                      key={key}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      product={currentProduct}
                      key={key}
                      deleteProduct={deleteProduct}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          <div className="container">
            <Pagination
              setProductsPerPage={setProductsPerPage}
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
