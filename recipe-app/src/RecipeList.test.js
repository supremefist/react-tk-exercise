import {
    act,
    fireEvent,
    render,
    screen,
    document
} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";

import {
    createRecipeData, deleteRecipeData,
    loadRecipeData, loadRecipesData,
    patchRecipeData
} from "./utils/recipeAPIUtils";

import RecipeList from "./RecipeList";

function renderList() {
    return render(
        <BrowserRouter>
            <RecipeList/>
        </BrowserRouter>
    )
}

jest.mock('./utils/recipeAPIUtils');

describe("<RecipeList>", () => {
    test("should be able to delete a recipe", async () => {
        let recipeList = [{
            id: 1,
            name: "Soup",
            description: "None",
            ingredients: []
        }, {
            id: 2,
            name: "Bread",
            description: "None",
            ingredients: []
        }];
        loadRecipesData.mockResolvedValue(recipeList);

        renderList();

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        await screen.findByText("Soup");
        expect(screen.getByText("Bread")).toBeInTheDocument();

        expect(screen.getByTestId("delete_1")).toBeInTheDocument();
        expect(screen.getByTestId("delete_2")).toBeInTheDocument();

        deleteRecipeData.mockResolvedValue(null);

        fireEvent.click(screen.getByTestId("delete_2"));

        await screen.findByText("Soup");
        expect(deleteRecipeData).toHaveBeenCalledTimes(1);
        expect(deleteRecipeData).toHaveBeenCalledWith(2);
    });
});