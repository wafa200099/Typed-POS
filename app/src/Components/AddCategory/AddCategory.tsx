import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../API/httpClient";
import { categoriesProps } from "../../Interfaces";

interface Props {
  categories: categoriesProps[];
  setCategories: React.Dispatch<React.SetStateAction<categoriesProps[]>>;
  toggleShowModal: () => void;
}

const AddCategory: FC<Props> = ({
  categories,
  setCategories,
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
      }}
      onSubmit={async (values, { resetForm }) => {
        if (!values.name) {
          toast.error("Please Fill The Name Input Feild");
        } else {
          await axiosInstance.post("category", { ...values });
          categories.push(values);
          setCategories([...categories]);
          toast.success(`${values.name} added successfully`, toastOptions);
          resetForm({ values: { id: 0, name: "" } });
        }
      }}
    >
      <Form>
        <div>
          <label htmlFor="name" className="text-white mb-2">
            Name
          </label>
        </div>
        <div>
          <Field
            className=" form-control bg-light rounded-3 border-1  border-primary"
            id="name"
            name="name"
            type="text"
          />
        </div>
        <input type="submit" className=" btn btn-primary mt-3 m-2" />
        <button className="btn btn-danger mt-3 m-2" onClick={toggleShowModal}>
          Cancle
        </button>
      </Form>
    </Formik>
  );
};

export default AddCategory;
