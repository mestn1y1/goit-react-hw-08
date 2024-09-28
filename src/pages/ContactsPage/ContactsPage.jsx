import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../..//components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectIsLoading, selectIsError } from "../../redux/contacts/selectors";
import { RotatingLines } from "react-loader-spinner";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import ContactEditor from "../../components/ContactEditor/ContatcEditor";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loader = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  const currentContact = useSelector(selectCurrentContact);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      {currentContact ? (
        <ContactEditor contact={currentContact} />
      ) : (
        <ContactForm />
      )}
      <SearchBox />
      {loader && (
        <RotatingLines
          visible={true}
          height="76"
          width="76"
          strokeWidth="2"
          strokeColor="grey"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass="loader"
        />
      )}
      <ToastContainer autoClose={2000} />
      <ContactList />
    </div>
  );
}
