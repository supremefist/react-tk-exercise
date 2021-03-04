import React, {useState, useEffect} from "react";
import styled from "styled-components";

import useRecipeListState from "./hooks/useRecipeListState";
import RecipeSummary from "./RecipeSummary";


const StyledRecipeList = styled.ul`
    justify-content: center;
    margin: 12px;
    gap: 50px;
`

function buildRecipes(props, recipes, deleteRecipe) {
    return (
        <div>
            <h4>Recipe List</h4>
            <StyledRecipeList>
                {recipes.map(recipe => (
                    <RecipeSummary key={recipe.id} recipe={recipe}
                                   deleteRecipe={deleteRecipe}/>
                ))}
            </StyledRecipeList>
        </div>
    );
}

function RecipeList(props) {
    const [loading, setLoading] = useState(true);

    const {
        recipes,
        loadRecipes,
        deleteRecipe
    } = useRecipeListState([], setLoading);

    useEffect(() => {
        setLoading(true);
        loadRecipes();
    }, []);

    if (loading) {
        return (
            <p>Loading...</p>
        );
    } else {
        return (
            <>
                <StyledRecipeList>
                    {buildRecipes(props, recipes, deleteRecipe)}
                </StyledRecipeList>
            </>
        );
    }
}

export default RecipeList;