import css from "./Contact.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
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
      <button className={css.button} onClick={handleDelete}>
        <MdDelete />
      </button>
    </li>
  );
}
