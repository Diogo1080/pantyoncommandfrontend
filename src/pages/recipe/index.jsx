import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import "./recipe.less"

const Recipe = () => {

    const [image, setImage] = useState({})
    const [recipe, setRecipe] = useState([])

    const {id} = useParams()

    useEffect(() => {
        async function getRecipe() {
            fetch("http://localhost:8080/api/recipes/" + id, {
                method: 'GET',
                redirect: 'follow',
            })
                .then(response => response.json())
                .then(response => {
                    setRecipe(response)
                })
                .catch(error => console.log('error', error));
        }

        async function getRecipeImage() {

            fetch("http://localhost:8080/api/recipes/" + id + "/image", {
                method: 'GET',
                redirect: 'follow',
            })
                .then(response => response.blob())
                .then(response => {
                    setImage(URL.createObjectURL(response))
                })
                .catch(error => console.log('error', error));
        }


        getRecipeImage();
        getRecipe();
    }, []);

    return (
        <>
            <div>
                <div className="large-img-container">
                    <img alt={recipe.name} className="large-img" src={image}/>
                    <h1>
                        {
                            recipe.name
                        }
                    </h1>
                </div>
                <div className="info-container">
                    <div>
                        <p>
                            Prep Time:
                            {
                                " " + recipe.prepTime
                            }
                        </p>
                    </div>
                    <div>
                        {recipe.map(({id, ingredientIds, name, prepTime, steps}) => {

                        })}
                    </div>
                    <div>
                        <p>
                            Preparation:
                        </p>
                        <p className="steps">
                            {
                                recipe.steps
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipe;