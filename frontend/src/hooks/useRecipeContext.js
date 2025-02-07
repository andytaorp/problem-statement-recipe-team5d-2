  import { useContext } from "react";
  import RecipesContext from "../context/RecipeContext";

  const useRecipeContext = () => {
    return useContext(RecipesContext);
  };

  export default useRecipeContext;