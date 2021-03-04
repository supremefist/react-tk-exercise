import {useState} from "react";
import axios from "axios";
import {
    createRecipeData,
    deleteRecipeData,
    loadRecipesData
} from "../utils/recipeAPIUtils";


const useRecipeListState = (initialRecipes, setLoading) => {
    const [recipes, setRecipes] = useState(initialRecipes);

    const loadRecipes = () => {
        async function getData() {
            let recipes = await loadRecipesData();

            setRecipes(recipes);
            setLoading(false);
        }

        getData();
    }

    return {
        recipes,
        loadRecipes: loadRecipes,

        createRecipe: (recipeData, redirect, props) => {
            async function createRecipe() {
                setLoading(true);
                await createRecipeData(recipeData, redirect, props);
                loadRecipes();
                setLoading(false);
            }

            createRecipe();
        },

        deleteRecipe: (recipeId) => {
            async function deleteData() {
                setLoading(true);
                await deleteRecipeData(recipeId);
                loadRecipes();
                setLoading(false);
            }

            deleteData();
        }
    }
}

export default useRecipeListState;
