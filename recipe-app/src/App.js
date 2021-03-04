import logo from './logo.svg';
import './App.css';
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import {Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import RecipeInfo from "./RecipeInfo";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Switch>
                <Route path="/recipes/create"
                       render={routeProps => <RecipeForm {...routeProps}/>}/>
                <Route path="/recipes/:id"
                       render={routeProps => <RecipeInfo {...routeProps}/>}/>

                <Route
                    exact path="/recipes"
                    render={() => <RecipeList/>}/>
                <Redirect to="/recipes"/>

            </Switch>
        </div>
    );
}

export default App;
