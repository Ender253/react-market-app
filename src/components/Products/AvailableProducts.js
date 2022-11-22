import classes from "./AvailableProducts.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Coaie nu merge!");
      }

      const data = await response.json();

      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  const productsData = t('products_a', { returnObjects: true });

  const productList = products.map((product) => {
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

  if (isLoading) {
    return (
      <section className={classes.ProductsLoading}>
        <p>Nu merge varule</p>
      </section>
    );
  }

  if (error) {
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
