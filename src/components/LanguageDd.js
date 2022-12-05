import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import classes from "./DropdownButton.module.css";
import i18next from "../i18n"

const langs = [{name:'ro',label:'RO'},{name:'en',label:'EN', childs: [{name:'ro1',label:'Bine ma'}]},];

const DDILang= (props)=>{
  const {name, label, childs} = props;

  
  const changeLanguage = (event) => {
    const ln = event.target.dataset.lang;

      i18next.changeLanguage(ln)
      console.log(`Am schimbat cu ${ln}`);
  };



  return <Dropdown.Item href="#" data-lang={name} onClick={changeLanguage}>
  {label}
{childs?.map(child=><DDILang {...child}/>)}

</Dropdown.Item>
}

const DropdownButtonLanguage = () => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Language"
      className={classes.dropdown}
    >
     {langs.map(lang=> <DDILang key={lang.name} {...lang}/>)}
    </DropdownButton>
  );
};

export default DropdownButtonLanguage;
