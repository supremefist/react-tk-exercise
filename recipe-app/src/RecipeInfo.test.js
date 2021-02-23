import {act, fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import RecipeInfo from "./RecipeInfo";
import {
    createRecipeData,
    loadRecipeData,
    patchRecipeData
} from "./utils/recipeAPIUtils";

function renderInfo(recipeId) {
    let match = {
        params: {
            id: recipeId
        }
    }

    return render(
        <BrowserRouter>
            <RecipeInfo match={match}/>
        </BrowserRouter>
    )
}

jest.mock('./utils/recipeAPIUtils');

describe("<RecipeInfo>", () => {
    test("should display a recipe info", async () => {
        let recipeId = 1;

        const inputRecipe = {
            "id": recipeId,
            "name": "Bolognaise",
            "description": "Beef mince and pasta.",
            "ingredients": ["Beef mince", "Pasta"]
        };

        loadRecipeData.mockResolvedValue(inputRecipe);

        renderInfo(recipeId);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        await screen.findByText(inputRecipe.name);
        expect(screen.getByText(inputRecipe.description)).toBeInTheDocument();
        expect(screen.getByText(inputRecipe.ingredients[0])).toBeInTheDocument();
        expect(screen.getByText(inputRecipe.ingredients[1])).toBeInTheDocument();
    });

    test("can edit recipe info", async () => {
        let recipeId = 1;

        const inputRecipe = {
            "id": recipeId,
            "name": "Bolognaise",
            "description": "Beef mince and pasta.",
            "ingredients": ["Beef mince", "Pasta"]
        };

        loadRecipeData.mockResolvedValue(inputRecipe);
        renderInfo(recipeId);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        await screen.findByText(inputRecipe.name);

        fireEvent.click(screen.getByText('E'));

        const newRecipe = {
            "id": recipeId,
            "name": "Bolognaise 2",
            "description": "Beef mince, cheese and pasta.",
            "ingredients": ["Lean beef mince", "Cheese", "Pasta"]
        };

        const nameInput = screen.getByLabelText('Name:');
        fireEvent.change(
            nameInput,
            {target: {value: newRecipe.name}});

        const descriptionInput = screen.getByLabelText('Description:');
        fireEvent.change(
            descriptionInput,
            {target: {value: newRecipe.description}});

        fireEvent.click(screen.getByText('Add'));
        const ingredientInputA = screen.getByPlaceholderText('Ingredient 0');
        fireEvent.change(
            ingredientInputA,
            {target: {value: newRecipe.ingredients[0]}});
        const ingredientInputB = screen.getByPlaceholderText('Ingredient 1');
        fireEvent.change(
            ingredientInputB,
            {target: {value: newRecipe.ingredients[1]}});
        const ingredientInputC = screen.getByPlaceholderText('Ingredient 2');
        fireEvent.change(
            ingredientInputC,
            {target: {value: newRecipe.ingredients[2]}});

        patchRecipeData.mockResolvedValueOnce(newRecipe);
        loadRecipeData.mockResolvedValueOnce(newRecipe);
        fireEvent.click(screen.getByText('Save'));

        // Wait for save to finish
        await screen.findByText("E");

        expect(screen.getByText(newRecipe.name)).toBeInTheDocument();
        expect(screen.getByText(newRecipe.description)).toBeInTheDocument();
        expect(screen.getByText(newRecipe.ingredients[0])).toBeInTheDocument();
        expect(screen.getByText(newRecipe.ingredients[1])).toBeInTheDocument();
        expect(screen.getByText(newRecipe.ingredients[2])).toBeInTheDocument();

        expect(patchRecipeData).toHaveBeenCalledTimes(1);
        expect(patchRecipeData).toHaveBeenCalledWith(recipeId, {
            name: newRecipe.name,
            description: newRecipe.description,
            ingredients: newRecipe.ingredients,
        });
    });
});