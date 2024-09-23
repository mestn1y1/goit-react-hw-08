//   const handleSubmit = (values, actions) => {
//     const newContact = {
//       name: values.username,
//       number: values.usernumber,
//     };
//     dispatch(addContact(newContact));
//     actions.resetForm();
//   };

import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const initialValues = { username: "", usernumber: "" };

export default function ContactForm() {
  const dispatch = useDispatch();

  const inputSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    usernumber: Yup.string()
      .matches(/^[\d-]+$/, "Must be a number")
      .min(9, "Too short")
      .max(12, "Too long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.username,
      number: values.usernumber,
    };
    dispatch(addContact(newContact));
    toast.success(`Contact ${values.username} successfully added!`);
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={inputSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor="username">
            Name
          </label>
          <Field
            type="text"
            name="username"
            id="username"
            className={css.field}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.errorMessage}
          />

          <label className={css.label} htmlFor="usernumber">
            Number
          </label>
          <Field
            type="text"
            name="usernumber"
            id="usernumber"
            className={css.field}
          />
          <ErrorMessage
            name="usernumber"
            component="span"
            className={css.errorMessage}
          />

          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}
