import RecipeForm from "./RecipeForm";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {createRecipeData} from "./utils/recipeAPIUtils";

function renderRecipe(recipe = null, edit = false) {
    return render(
        <RecipeForm recipe={recipe} edit={edit}/>
    )
}

jest.mock('./utils/recipeAPIUtils');

describe("<RecipeForm>", () => {
    test("should display a blank form", () => {
        renderRecipe();

        expect(screen.getByText("New Recipe")).toBeInTheDocument();
        expect(screen.getByText("Name:")).toBeInTheDocument();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Ingredients:")).toBeInTheDocument();
    });

    test("should have filled-in a simple recipe", () => {
        const inputRecipe = {
            "name": "Bolognaise",
            "description": "Beef mince and pasta.",
            "ingredients": ["Beef mince", "Pasta"]
        };

        renderRecipe(inputRecipe, true);

        expect(screen.queryByText("New Recipe"))
            .not.toBeInTheDocument();
        expect(screen.getByDisplayValue(inputRecipe.name))
            .toBeInTheDocument();
        expect(screen.getByDisplayValue(inputRecipe.description))
            .toBeInTheDocument();
        expect(screen.getByDisplayValue(inputRecipe.ingredients[0]))
            .toBeInTheDocument();
        expect(screen.getByDisplayValue(inputRecipe.ingredients[1]))
            .toBeInTheDocument();
    });

    test("can create with ingredients", () => {
        const inputRecipe = {
            "id": 1,
            "name": "Bolognaise",
            "description": "Beef mince and pasta.",
            "ingredients": ["Beef mince", "Pasta"]
        };

        renderRecipe(null, false);

        const nameInput = screen.getByLabelText('Name:');
        fireEvent.change(
            nameInput, {target: {value: inputRecipe.name}});
        const descriptionInput = screen.getByLabelText('Description:');
        fireEvent.change(
            descriptionInput,
            {target: {value: inputRecipe.description}});

        createRecipeData.mockResolvedValueOnce(inputRecipe);

        // Add 2 blank ingredients
        fireEvent.click(screen.getByText('Add'));
        fireEvent.click(screen.getByText('Add'));

        const ingredientInputA = screen.getByPlaceholderText('Ingredient 0');
        fireEvent.change(
            ingredientInputA,
            {target: {value: inputRecipe.ingredients[0]}});
        const ingredientInputB = screen.getByPlaceholderText('Ingredient 1');
        fireEvent.change(
            ingredientInputB,
            {target: {value: inputRecipe.ingredients[1]}});

        fireEvent.click(screen.getByText('Add Recipe'));

        expect(createRecipeData).toHaveBeenCalledTimes(1);
        expect(createRecipeData).toHaveBeenCalledWith({
            name: inputRecipe.name,
            description: inputRecipe.description,
            ingredients: inputRecipe.ingredients,
        }, true, {"edit": false, "recipe": null});
    });
});