import classes from "./AvailableProducts.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategoriesQuery } from "./ProductItem/use-categories-query";
import { useProductQuery } from "./ProductItem/use-products-query";
import { useDispatch } from "react-redux";
import { QueryStatus } from "../../constants/query";
import { setProductsId } from "../../store/ProductReducer";

const AvailableProducts = (props) => {
  const { category, filterCategories } = useCategoriesQuery();
  const { productss , status, error } = useProductQuery();
const dispatch = useDispatch();
const  setProdctEl = useCallback(
    (id)=>{
        dispatch(setProductsId(id))
    },[dispatch]
)



  const { t } = useTranslation();

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       setIsLoading(true);

  //       const response = await fetch(
  //         "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
  //       );

  //       if (!response.ok) {
  //         throw new Error("Coaie nu merge!");
  //       }

  //       const data = await response.json();

  //       setProducts(Object.keys(data).map((key) => ({ ...data[key], id: key })));
  //       setIsLoading(false);
  //     };

  //     fetchProducts()
  //       .then()
  //       .catch((error) => {
  //         setIsLoading(false);
  //         setError(error.message);
  //       });
  //   }, []);

  const isSubcategory = useCallback((category, subCategory) => {
    if (category.id === subCategory.id) return true;

    if (category.child)
      return category.child.find((child) => isSubcategory(child, subCategory));

    return false;
  }, []);

  const isInCategories = useCallback(
    (categoryId, productCategoryId) => {
      const category = filterCategories(categoryId);
      const productCategory = filterCategories(productCategoryId);

      return isSubcategory(category, productCategory);
    },
    [filterCategories, isSubcategory]
  );

  const filterProducts = useCallback(
    (product) => {
      if (!category) {
        return true;
      }

      return isInCategories(category.id, product.categoryId);
    },
    [category, isInCategories]
  );

  const productsData = t("products_a", { returnObjects: true });

  const productList = productss?.filter(filterProducts).map((product) => {
    const { name, description } = productsData[product.id] || {};
    return (
      <ProductItem
        id={product.id}
        key={product.id}
        name={name}
        description={description}
        price={product.price}
        setProduct={setProdctEl}
      />
    );
  });

  if (status === QueryStatus.Loading) {
    return (
      <section className={classes.ProductsLoading}>
        <p>Nu merge varule</p>
      </section>
    );
  }

  if (status === QueryStatus.Error) {
    return (
      <section>
        <p className={classes.ProductsError}>{error} </p>
      </section>
    );
  }

  return (
    <section className={classes.products}>
      <Card>
        <ul>{productList}</ul>
      </Card>
    </section>
  );
};

export default AvailableProducts;
