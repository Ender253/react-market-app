import React from "react";
import classes from "./NavBar.module.css";
import NavCartButton from "./NavCartButton";
import DropdownButtonLanguage from "./LanguageDd";
import ProductCategories from "./Products/ProductItem/ProductCategories";

function NavBar(props) {
const {onShowCart, ...rest} = props;


  return (
    <nav>
      <div className={classes.navbar_container}>
        <div className={classes.navbar_inner}>
          <div className={classes.navbar_branding}>
            <a
              href="*"
              className={classes.navbarbrand}
              title="Cautarea nu se opreste niciodata"
            >
              <img
                src="https://s13emagst.akamaized.net/layout/ro/images/logo//59/88362.svg"
                alt="eMAG"
              ></img>
            </a>
          </div>
          <div className={classes.navbar_searchbox}>
            <div className={classes.searchbox_wrapper}>
              <form className={classes.form}>
                <input type="text" className={classes.input} placeholder="Începe o nouă căutare"></input>
                <span className={classes.icon}></span>
              </form>
            </div>
            
          </div>
        </div>
        <DropdownButtonLanguage />
        <ProductCategories {...rest}/>
        <NavCartButton onClick={onShowCart}/>
      </div>
      
    </nav>
  );
}

export default NavBar;
