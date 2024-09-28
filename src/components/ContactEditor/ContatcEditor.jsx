import { useSelector, useDispatch } from "react-redux";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import { changeContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactEditor.module.css";
import { resetCurrentContact } from "../../redux/contacts/slice";

export default function ContactEditor({ contact }) {
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentContact);

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

  const initialValues = {
    username: currentContact.name,
    usernumber: currentContact.number,
  };

  const handleSubmit = (values, actions) => {
    const updatedContact = {
      name: values.username,
      number: values.usernumber,
    };

    dispatch(changeContact({ contactId: contact.id, updatedContact }))
      .then(() => {
        dispatch({ type: "contacts/updateContactList" });
        toast.success(`Contact ${values.username} successfully updated!`);
      })
      .catch(() => {
        toast.error("Failed to update contact");
      })
      .finally(() => {
        actions.resetForm();
        dispatch(resetCurrentContact());
      });
  };

  return (
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
          Update contact
        </button>
      </Form>
    </Formik>
  );
}
