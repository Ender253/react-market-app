import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getSelectedCategoryId } from "../../../store/CategoryReducer";

export function useCategoriesQuery() {
  const categoryId = useSelector(getSelectedCategoryId);

  const {
    data: categories,
    error,
    status,
  } = useQuery({
    queryKey: ["products-categories"],
    async queryFn() {
      const response = await fetch(
        "https://food-app-8d033-default-rtdb.europe-west1.firebasedatabase.app/categories_v3.json"
      );

      return await response.json();
    },
  });

  const filterCategories = useCallback(
    (categoryId, data = categories, returnCategory = null) => {
      data?.find((category) => {
        if (category.child)
          returnCategory = filterCategories(
            categoryId,
            category.child,
            returnCategory
          );
        if (category.id === categoryId) return (returnCategory = category);

        return false;
      });

      return returnCategory;
    },
    [categories]
  );

  return {
    categories,
    error,
    status,
    categoryId,
    category: useMemo(
      () => filterCategories(categoryId),
      [categoryId, filterCategories]
    ),
    filterCategories,
  };
}
