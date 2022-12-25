import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import FormikControl from "./FormikControl";

function LoginForm() {
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validattionSchema = yup.object({
    email: yup.string().email("Invalid email ").required("required"),
    password: yup.string().required("required"),
  });
  const onSubmit = (values: any) => {
    console.log("form data", values);
    navigate("/home");
    toast.success(`logedin successfully `, toastOptions);
  };
  return (
    <Formik
      initialValues={initialValues}
      validattionSchema={validattionSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="forms">
              <FormikControl
                control="input"
                type="email"
                label="email"
                name="email"
              />
              <FormikControl
                control="input"
                type="password"
                label="password"
                name="password"
              />
              <button
                type="submit"
                className="btn btn-primary px-5 my-2 mx-4"
                disabled={!formik.isValid}
              >
                LogIn{" "}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
export default LoginForm;
