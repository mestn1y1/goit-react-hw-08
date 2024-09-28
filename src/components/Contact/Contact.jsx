import css from "./Contact.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact, changeContact } from "../../redux/contacts/operations";
import { setCurrentContact } from "../../redux/contacts/slice";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleChange = () => {
    dispatch(setCurrentContact(contact));
  };

  return (
    <li className={css.container}>
      <div className={css.containerData}>
        <div>
          <AiOutlineUser className={css.icon} />
          <span className={css.itemEl}>{contact.name}</span>
        </div>
        <div>
          <FiPhone />
          <span className={css.itemEl}>{contact.number}</span>
        </div>
      </div>
      <div className={css.containerButton}>
        <button className={css.button} onClick={handleChange}>
          <BsPencilSquare />
        </button>
        <button className={css.button} onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
