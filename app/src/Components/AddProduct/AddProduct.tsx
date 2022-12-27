import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../API/httpClient";
import { categoriesProps, productProps } from "../../Interfaces";

interface Props {
  products: productProps[];
  setProducts: React.Dispatch<React.SetStateAction<productProps[]>>;
  categories: categoriesProps[];
  toggleShowModal: () => void;
}

const AddProduct: FC<Props> = ({
  categories,
  products,
  setProducts,
  toggleShowModal,
}) => {
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  return (
    <Formik
      initialValues={{
        id: Date.now() + Math.random(),
        name: "",
        code: "",
        category: "",
        price: "",
        image: " ",
      }}
      onSubmit={async (values, { resetForm }) => {
        if (
          !values.name ||
          !values.code ||
          !values.price ||
          !values.category ||
          !values.image
        ) {
          toast.error("Please fill all input Feild");
        } else {
          await axiosInstance.post("products", { ...values });
          products.push(values);
          setProducts([...products]);
          toast.success(` ${values.name}  added successfully`, toastOptions);
          resetForm({
            values: {
              id: 0,
              name: "",
              code: "",
              category: "",
              price: "",
              image: " ",
            },
          });
        }
      }}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <Field
            className=" form-control bg-light rounded-3 border-1  border-primary"
            id="name"
            name="name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
        </div>
        <div>
          <Field
            className="form-control bg-light rounded-3 border-1  border-primary"
            id="price"
            name="price"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
        </div>
        <div>
          <Field
            as="select"
            className="form-control bg-light rounded-3 border-1  border-primary"
            id="category"
            name="category"
          >
            <option></option>
            {categories &&
              categories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
          </Field>
        </div>
        <div>
          <label htmlFor="code">Code</label>
        </div>
        <div>
          <Field
            className=" form-control bg-light rounded-3 border-1  border-primary"
            id="code"
            name="code"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
        </div>
        <div>
          <Field
            className="form-control bg-light rounded-3 border-1  border-primary"
            id="image"
            name="image"
            type="text"
          />
        </div>
        <input type="submit" className=" btn btn-primary mt-2" />
        <button className="btn btn-danger mt-3 m-2" onClick={toggleShowModal}>
          Cancle
        </button>
      </Form>
    </Formik>
  );
};
export default AddProduct;
