import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import classes from "./DropdownButton.module.css";
import i18next from '../../i18n'

const DropdownButtonLanguage = () => {
  const changeLanguage = (ln) => {
    return ()=>{
      i18next.changeLanguage(ln)
      console.log(`Am schimbat cu ${ln}`)};
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Language"
      className={classes.dropdown}
    >
      <Dropdown.Item href="#/action-1" onClick={changeLanguage('ro')}>
        RO
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={changeLanguage("en")}>
        EN
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownButtonLanguage;
