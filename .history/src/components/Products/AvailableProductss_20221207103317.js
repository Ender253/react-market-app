import classes from "./AvailableProducts.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategoriesQuery } from "./ProductItem/use-categories-query";
import { useProductQuery } from "./ProductItem/use-products-query";
import { useDispatch } from "react-redux";
import { QueryStatus } from "../../constants/query";
import { setProductsId } from "../../store/ProductReducer";
import { useDeepMemo } from '../../hooks/use-deep-memo';

const AvailableProducts = (props) => {
  const { category, filterCategories, status: categoryStatus } = useCategoriesQuery();
  const { products, status, error } = useProductQuery({
    // enabled: categoryStatus === QueryStatus.Success,
    select(response){
      console.log(response);
      return response;
    }
  });

  const { t } = useTranslation();

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

  const productsList = useDeepMemo(()=>products?.filter(filterProducts)??[],[products, filterProducts]);

  console.log(productsList);
  const productList = useDeepMemo(() => {
    const productsData = t("products_a", { returnObjects: true });

    return productsList.map((product) => {
      const { name, description } = productsData[product.id] || {};
      return (
        <ProductItem
          id={product.id}
          key={product.id}
          name={name}
          description={description}
          price={product.price}
        />
      );
    });
  }, [t, productsList]);

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
