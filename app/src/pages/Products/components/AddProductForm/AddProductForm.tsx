import { useMutation } from "@tanstack/react-query";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { FC } from "react";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import Modal from "../../../../Components/Modal";
import { AddProductFormProps } from "./types";
import { addProductApi } from "../../../../API/Product";
const toastOptions = {
  autoClose: 400,
  pauseOnHover: true,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const AddProductForm: FC<AddProductFormProps> = ({
  isOpen,
  onClose,
  onAdd,
  categories,
}) => {
  const { mutate } = useMutation(addProductApi,{
    onSuccess:()=>{
      onAdd()
    }
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      code: "",
      category: "",
      price: "",
      image: " ",
    },
    onSubmit: (values, { resetForm }) => {
      if (
        !values.name ||
        !values.code ||
        !values.price ||
        !values.category ||
        !values.image
      ) {
        toast.error("Please fill all input Feild");
      } else {
        mutate(values, {
          onSuccess: async () => {
            await sleep(1000);
            toast.success(`${values.name} added successfully`, toastOptions);
            resetForm();
          },
          onError: (response) => {
            toast.error("An error occured while submiting the form");
            console.log(response);
          },
        });
      }
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal>
      <FormikProvider value={formik}>
        <Form className="p-4">
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
          <div className="pr-1">
          <button
            type="submit"
            className=" btn btn-primary mt-3 m-2"
          >
            {formik.isSubmitting ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span>submit</span>
            )}
          </button>
          <button
            className="btn btn-danger mt-3 m-2"
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            close
          </button>
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddProductForm;
