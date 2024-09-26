import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <label htmlFor="searchbox" className={css.label}>
        <FaSearch size="12" /> Find contacts by name
      </label>
      <input
        type="text"
        name="searchBox"
        id="searchbox"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
