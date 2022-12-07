import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProductId } from "../../../store/ProductReducer";

export const useProductQuery = () => {
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

      return await response.json()
    },
  });

  return {
    products,
    error,
    status,
  };
};
