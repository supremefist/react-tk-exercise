import axios from "axios";

const RECIPES_ROOT = "http://localhost:8000/api/recipes/";


const buildIngredientData = (ingredients) => {
    return ingredients.map(ingredient => {
        return {
            name: ingredient
        }
    });
}

const parseIngredientData = (ingredients) => {
    return ingredients.map(ingredient => {
        return ingredient.name
    });
}


const createRecipeData = (recipeData, redirect, props) => {
    async function postData() {
        let finalRecipeData = {
            name: recipeData.name,
            description: recipeData.description,
            ingredients: buildIngredientData(recipeData.ingredients)
        };

        try {
            let response = await axios.post(RECIPES_ROOT, finalRecipeData);
            if (redirect) {
                let createdId = response.data.id;
                props.history.push(`/recipes/${createdId}`);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    postData();
};


const loadRecipeData = async (recipeId) => {
    try {
        const response = await axios.get(`${RECIPES_ROOT}${recipeId}`);

        let loadedRecipe = response.data;

        loadedRecipe.ingredients = loadedRecipe.ingredients.map(ingredient => {
            return ingredient.name;
        });

        return loadedRecipe;
    } catch (error) {
        alert(error.message);
    }
};

const patchRecipeData = async (recipeId, recipeData) => {
    try {
        let finalRecipeData = {
            name: recipeData.name,
            description: recipeData.description,
            ingredients: buildIngredientData(recipeData.ingredients)
        }

        await axios.patch(`${RECIPES_ROOT}${recipeId}/`, finalRecipeData);

    } catch (error) {
        alert(error.message);
    }
}

const deleteRecipeData = async (recipeId) => {
    try {
        await axios.delete(`${RECIPES_ROOT}${recipeId}`);
    } catch (error) {
        alert(error.message);
    }
}

const loadRecipesData = async () => {
    let recipes = [];
    try {
        const response = await axios.get(RECIPES_ROOT);

        recipes = response.data;

        recipes = recipes.map(recipe => {
            recipe.ingredients = parseIngredientData(recipe.ingredients);

            return recipe;
        })
    } catch (error) {
        alert(error.message);
    }

    return recipes;
}

export {
    createRecipeData, loadRecipeData, patchRecipeData, deleteRecipeData,
    loadRecipesData
};