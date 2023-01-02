import { useMutation } from "@tanstack/react-query";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { FC } from "react";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategoryApi } from "../../../../API/Category";
import Modal from "../../../../Components/Modal";
import { AddCategoryFormProps } from "./types";

const toastOptions = {
  autoClose: 400,
  pauseOnHover: true,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const AddCategoryForm: FC<AddCategoryFormProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const { mutate } = useMutation(addCategoryApi);

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!values.name) {
        toast.error("Please Fill The Name Input Feild");
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
        <Form>
          <div className="px-3">
            <label htmlFor="name" className="text-white mb-2">
              Category Name
            </label>
          </div>
          <div className="px-3">
            <Field
              className=" form-control bg-light rounded-3 border-1  border-primary"
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div className="px-2">
            <button
              type="submit"
              className=" btn btn-primary mt-3 m-2"
              onClick={onAdd}
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

export default AddCategoryForm;
