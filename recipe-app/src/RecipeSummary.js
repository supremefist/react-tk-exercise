import React, {useState, useEffect} from "react";
import styled from "styled-components";
import RecipeForm from "./RecipeForm";
import {NavLink} from "react-router-dom";

const StyledRecipeSummary = styled.li`
    text-align: left;
`

function RecipeInfo(props) {
    let {recipe} = props;

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteRecipe(recipe.id);
    }

    const buildRecipe = () => {
        let recipeUrl = `/recipes/${recipe.id}`;
        let deleteId = `delete_${recipe.id}`;

        return (
            <StyledRecipeSummary>
                <NavLink exact to={recipeUrl}>{recipe.name}</NavLink>
                <button data-testid={deleteId} onClick={handleDelete}>X</button>
            </StyledRecipeSummary>
        );
    };

    return (
        buildRecipe()
    );
}

export default RecipeInfo;