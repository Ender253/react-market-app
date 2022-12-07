import classes from "./ProductCategories.module.css";
import { useCallback } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useCategoriesQuery } from "./use-categories-query";
import { QueryStatus } from "../../../constants/query";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../../store/CategoryReducer";

const ProductCategories = () => {
  const { categories, status, error } = useCategoriesQuery();
  const dispatch = useDispatch();

  const setCategoryElement = useCallback(
    (id) => {
      dispatch(setCategoryId(id));
      console.log("merge coaie",categories);
    },
    [dispatch]
  );

  if (status === QueryStatus.Loading) {
    return (
      <section className={classes.catLoading}>
        <p>Nu merge varule</p>
      </section>
    );
  }

  if (status === QueryStatus.Error) {
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
      {categories?.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          setCategory={setCategoryElement}
        />
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
    <DropdownItem
      className={classes.dropdownElement}
      key={category.id}
      onClick={dropdownChangeHandler}
      as="span"
    >
      <span className="dropdown-item"> {category.name}</span>

      {category.child?.length > 0
        ? category.child.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              setCategory={setCategory}
            />
          ))
        : null}
    </DropdownItem>
  );
}

export default ProductCategories;
