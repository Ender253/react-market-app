import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProductId } from "../../../store/ProductReducer";

export const useProductQuery = () => {
  const {
    data: productss,
    error,
    status,
  } = useQuery({
    queryKey: ["productss"],
    async queryFn() {
      const response = await fetch(
        "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      const json = await response.json();
      return json;
    },
  });

  return {
    productss,
    error,
    status,
  };
};
