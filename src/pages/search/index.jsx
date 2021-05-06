import React, {useContext, useEffect, useState} from "react";
import "./search.less"
import Category from "../../components/categories";
import ingredientsContext from "../../context/ingredientsContext";
import {Redirect} from "react-router";

const Search = () => {

    const {currentIngredients} = useContext(ingredientsContext)

    const [searched, toggleSearched] = useState(false);

    const [ingredientMenuState, toggleShowIngredientMenu] = useState(true);

    const [categoriesInfo, setCategoriesInfo] = useState([])

    useEffect(() => {
        async function getCategories() {
            fetch("http://localhost:8080/api/categories?size=1000", {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(response => {
                    setCategoriesInfo(response.results)
                })
                .catch(error => console.log('error', error));
        }

        let promise = getCategories();
    }, []);

    function handleSearchSubmit() {
        currentIngredients.length > 0 ? toggleSearched(true) : alert("No ingredient selected")
    }

    return (
        <>
            {searched ? <Redirect to={{pathname: "/searched"}}/> :
                <>
                    <section className="container">
                        <h1>
                            Search Menu
                        </h1>
                    </section>
                    <div className="outerIngredientsMenuContainer">
                        <div className="ingredientsMenuContainer">
                            <button className="menu" onClick={() => {
                                toggleShowIngredientMenu(!ingredientMenuState)
                            }}>
                                Ingredients
                            </button>
                            <div className="ingredientCategoryContainer"
                                 style={{display: ingredientMenuState ? "flex" : "none"}}>
                                {categoriesInfo.map((category) => {
                                    return (
                                        <Category name={category.name} id={category.id} key={category.id}/>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="link-container submit-btn-container">
                            <button className="submit-btn" onClick={() => {
                                handleSearchSubmit()
                            }}>Find me some recipes
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Search;
