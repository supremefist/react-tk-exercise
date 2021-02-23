import {useState} from "react";
import axios from "axios";
import {loadRecipeData, patchRecipeData} from "../utils/recipeAPIUtils";

const RECIPES_ROOT = "http://localhost:8000/api/recipes/";

const useRecipeState = (recipeId, setLoading) => {
    const [recipe, setRecipe] = useState(null);

    const loadRecipe = () => {
        async function getData() {
            let loadedRecipe = await loadRecipeData(recipeId);
            setRecipe(loadedRecipe);
            setLoading(false);
        }

        getData();
    }

    const updateRecipe = (recipeId, recipeData) => {
        async function patchData() {
            await patchRecipeData(recipeId, recipeData);
            loadRecipe();
        }

        patchData();
    };


    return {
        recipe,
        loadRecipe: loadRecipe,
        updateRecipe: updateRecipe
    }
}

export default useRecipeState;