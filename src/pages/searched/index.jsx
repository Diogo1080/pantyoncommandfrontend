import React, {useContext, useEffect, useState} from "react";
import ingredientsContext from "../../context/ingredientsContext";
import RecipeCard from "../../components/recipe";
import "./searched.less"

const Searched = () => {

    const {currentIngredients, setIngredients} = useContext(ingredientsContext)

    const [recipeList, setRecipeList] = useState([])

    useEffect(() => {

        async function getRecipes() {
            let data = "";
            currentIngredients.map((value)=>{
                data==""? data=data.concat(value):data=data.concat(","+value)
            })

            fetch("http://localhost:8080/api/recipes?ingredients=" + data, {
                method: 'GET',
                redirect: 'follow',
            })
                .then(response => response.json())
                .then(response => {
                    setRecipeList(response.results)
                })
                .catch(error => console.log('error', error));
        }

        getRecipes();
    }, []);


    return (
        <>{recipeList?.length === 0 ?
            <div>
                No results found.
            </div>
            :
            <div className="outer-container-cards">
                {recipeList.map(({id, ingredientIds, name, prepTime, steps}) => {
                    return (
                        <RecipeCard
                            key={id}
                            id={id}
                            name={name}
                            steps={steps}
                            prepTime={prepTime}
                            ingredientIds={ingredientIds}>
                        </RecipeCard>
                    )
                })}
            </div>
        }</>
    );
}

export default Searched;
