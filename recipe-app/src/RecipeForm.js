import React from "react";
import styled from "styled-components";

import useInputState from "./hooks/useInputState";
import useStringListInputState from "./hooks/useStringListInputState";
import NewIngredientForm from "./NewIngredientForm";
import {createRecipeData} from "./utils/recipeAPIUtils";

const StyledRecipeForm = styled.form`
    border: black 5px double;
    padding: 5px;
    margin: 5px;
    background: lightgray;
    width: 500px;
    text-align: left;
`

const StyledDiv = styled.div`
    display: flex;
`

const StyledParagraph = styled.p`
    display: flex;
`

const StyledIngredientList = styled.div`
    display: inline;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 0px;
    gap: 0px;
`

const StyledLabel = styled.label`
    width: 100px;
`

const StyledInput = styled.input`
    width: 90%;
    margin: 2px;
`

function RecipeForm(props) {
    let recipe = props.recipe;

    if (!recipe) {
        recipe = {
            "name": "",
            "description": "",
            "ingredients": []
        };
    }

    const [name, handleNameChange] = useInputState(recipe.name);
    const [description, handleDescriptionChange] =
        useInputState(recipe.description);
    const [ingredients, addBlankIngredient, handleIngredientChange, removeIngredient] = useStringListInputState(recipe.ingredients);

    const buildIngredientsForms = () => {
        return ingredients.map((name, idx) => <NewIngredientForm
            name={name} idx={idx} key={idx}
            handleNameChange={handleIngredientChange}
            removeIngredient={removeIngredient}/>);
    }

    const handleCreate = (e) => {
        e.preventDefault();

        createRecipeData({
            name: name,
            description: description,
            ingredients: ingredients
        }, true, props);
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        let recipeData = {
            name: name,
            description: description,
            ingredients: ingredients
        };
        props.updateRecipe(recipe.id, recipeData);
        props.setEditing(false);
    }

    return (
        <StyledRecipeForm>
            {!props.edit && <h4>New Recipe</h4>}

            <StyledDiv>
                <StyledLabel htmlFor="name">Name: </StyledLabel>
                <StyledInput
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </StyledDiv>
            <StyledDiv>
                <StyledLabel htmlFor="description">Description: </StyledLabel>
                <StyledInput
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </StyledDiv>
            <StyledDiv>
                <StyledLabel>Ingredients: </StyledLabel>
                <StyledIngredientList>
                    {buildIngredientsForms()}
                    <button onClick={addBlankIngredient}>Add</button>
                </StyledIngredientList>
            </StyledDiv>
            <button onClick={props.edit ? handleUpdate : handleCreate}
                    disabled={props.loading}>
                {props.edit ? "Save" : "Add Recipe"}
            </button>
        </StyledRecipeForm>
    );
}

export default RecipeForm;