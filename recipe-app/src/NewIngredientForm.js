import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import RecipeInfo from "./RecipeInfo";
import useInputState from "./hooks/useInputState";
import useStringListInputState from "./hooks/useStringListInputState";

const StyledDiv = styled.div`
    height: 30px;
    padding: 0px;
    margin: 0px;
`

const StyledButton = styled.button`
    height: 30px;
    width: 10px;
`

function NewIngredientForm(props) {
    const handleNameChange = (e) => {
        props.handleNameChange(e, props.idx);
    }

    const handleDelete = (e) => {
        props.removeIngredient(e, props.idx);
    }

    return (
        <StyledDiv>
            <input placeholder={`Ingredient ${props.idx}`} value={props.name}
                   onChange={handleNameChange}/>
            <StyledButton onClick={handleDelete}>X</StyledButton>
        </StyledDiv>
    );
}

export default NewIngredientForm;