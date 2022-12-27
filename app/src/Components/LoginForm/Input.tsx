import { Field } from "formik";

function Input(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-controls">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <Field id={name} name={name} {...rest} />
      </div>
    </div>
  );
}

export default Input;
