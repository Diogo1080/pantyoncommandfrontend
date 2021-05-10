import React, {useContext, useEffect, useState} from "react";
import "./recipe.less"
import ingredientsContext from "../../context/ingredientsContext";
import {Link} from "react-router-dom";

const RecipeCard = (props) => {

    const {currentIngredients, setIngredients} = useContext(ingredientsContext)

    const {id, name, steps, prepTime, ingredientIds} = props;

    const [image, setImage] = useState("")

    const calculatePercentage = () => {
        let arrOfIds = [];
        for (let i = 0; i < ingredientIds.length; i++) {
            arrOfIds.push(ingredientIds[i].id);
        }

        const intersection = currentIngredients.filter(element => arrOfIds.includes(element));

        return (parseFloat(intersection.length) / arrOfIds.length) * 100;
    }

    useEffect(() => {
        async function getRecipeImage() {

            fetch("http://localhost:8080/api/recipes/" + id + "/image", {
                method: 'GET',
                redirect: 'follow',
            })
                .then(response=>response.blob())
                .then(response => {
                    // Then create a local URL for that image and print it
                    setImage(URL.createObjectURL(response))
                })
                .catch(error => console.log('error', error));
        }

        getRecipeImage();
    }, []);

    return (
        <>
            <div id="recipe-card" className="recipe-card">
                <div className="recipe-card-image-container">
                    <img id="recipe-image" src={image} alt={name + " image"}/>
                </div>
                <div className="recipe-card-small-info">
                    <div className="recipe-card-prepTime">
                        <img src="clock.svg"/>
                        {prepTime}
                    </div>
                    <div className="recipe-card-percentage">
                        {
                            calculatePercentage()
                        }
                        % of ingredients
                    </div>
                </div>
                <div className="recipe-card-container">
                    <div className="recipe-card-title">
                        <b><h3 id="recipe-name">{name}</h3></b>
                    </div>
                    <div className="recipe-card-steps">
                        <p id="recipe-steps" className="recipe-steps">
                            {steps}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipeCard;
