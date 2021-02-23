import React, {useState, useEffect} from "react";
import styled from "styled-components";
import RecipeForm from "./RecipeForm";
import {NavLink, Redirect} from "react-router-dom";
import useRecipeState from "./hooks/useRecipeState";

const StyledRecipe = styled.div`
    border: black 5px double;
    padding: 5px;
    margin: 5px;
    background: lightgray;
    text-align: left;
`

const UnorderedList = styled.ul`
    font-size: 10pt;
    display: block;
    text-align: left;
`

const Button = styled.button`
    float: right;
`

function buildIngredients(ingredients) {
    return (
        <div>
            <p>Ingredients:</p>
            <UnorderedList>
                {ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>))}
            </UnorderedList>
        </div>
    );
}

function RecipeInfo(props) {
    let recipeId = props.match.params.id;

    let [loading, setLoading] = useState(true);

    let {recipe, loadRecipe, updateRecipe} = useRecipeState(
        recipeId, setLoading);

    useEffect(() => {
        setLoading(true);
        loadRecipe();
    }, []);

    let [editing, setEditing] = useState(false);

    const handleEdit = (e) => {
        setEditing(true);
    };

    const buildRecipe = () => {
        if (loading) {
            return (
                <p>Loading...</p>
            );
        } else if (recipe == null) {
            return (
                <Redirect to="/recipes"/>
            );
        } else if (editing) {
            return (
                <RecipeForm recipe={recipe} edit={true}
                            updateRecipe={updateRecipe}
                            setEditing={setEditing}
                            loading={loading}/>
            );
        } else {
            return (
                <>
                    <StyledRecipe>
                        <div>
                            <Button
                                onClick={handleEdit}
                                disabled={loading}>E
                            </Button>
                        </div>
                        <h4>{recipe.name}</h4>
                        <p>{recipe.description}</p>
                        {recipe.ingredients.length > 0 && buildIngredients(recipe.ingredients)}
                    </StyledRecipe>
                    <NavLink exact to="/">Back</NavLink>
                </>
            )
        }
    };

    return (
        buildRecipe()
    );
}

export default RecipeInfo;