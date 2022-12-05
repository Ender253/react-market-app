import Dropdown from "react-bootstrap/Dropdown";
import classes from "./ProductCategories.module.css";
import { useState, useEffect, useCallback } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export function useProductCategories(){
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

 
  useEffect(() => {
    const fetchCat = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/categories_v3.json"
      );
      if (!response.ok) {
        throw new Error("Coaie nu merge");
      }

      const data = await response.json();

      setCategories(data);
      setIsLoading(false);
    };
    fetchCat()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  

  return {isLoading, categories, category,error, setCategory}
}

const ProductCategories = (props) => {
  const {isLoading, categories, error, setCategory} = props;

  const setCategoryElement = useCallback(
    (id) => {
      setCategory(id);
      console.log("merge", id);
    },
    [setCategory]
  );

  if (isLoading) {
    return (
      <section className={classes.catLoading}>
        <p>Nu merge varule</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={classes.catError}>{error} </p>
      </section>
    );
  }

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Categories"
      className={classes.dropdown}
    >
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} setCategory={setCategoryElement} />
      ))}
    </DropdownButton>
  );
};

function CategoryItem(props) {
  const { category, setCategory } = props;

  const dropdownChangeHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setCategory(category.id);
  };
  return (
    <DropdownItem key={category.id} onClick={dropdownChangeHandler} as="span">
      {category.name}

      {category.child?.length > 0
        ? category.child.map((category) => <CategoryItem key={category.id} category={category} setCategory={setCategory}/>)
        : null}
    </DropdownItem>
  );
}

export default ProductCategories;
