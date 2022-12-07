import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProductId } from "../../../store/ProductReducer";
import { uniqueId } from "lodash";
import { useCallback } from "react";

export const useProductQuery = (props = {}) => {
  const { select = (a) => a, ...rest } = props;
  
  const getProducts = useCallback((response = []) => {
    return Object.keys(response).map((key) => ({
      ...response[key],
      id: uniqueId(),
    }));
  }, []);

  const {
    data: products,
    error,
    status,
  } = useQuery({
    queryKey: ["products"],
    async queryFn() {
      const response = await fetch(
        "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      return await response.json();
    },
    select(response) {
      return select(getProducts(response));
    },
    ...rest,
  });


  return {
    products,
    error,
    status,
  };
};
