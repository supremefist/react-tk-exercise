import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    margin: 5px;
`

class NavBar extends Component {
    render() {
        const activeStyle = {
            fontWeight: "bold",
        };
        return (
            <nav>
                <StyledNavLink exact to="/recipes"
                         activeStyle={activeStyle}>Recipes</StyledNavLink>
                <StyledNavLink exact to="/recipes/create"
                         activeStyle={activeStyle}>Create</StyledNavLink>
            </nav>
        );
    }
}

export default NavBar;