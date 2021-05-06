import React, {useContext, useEffect, useState} from "react";
import ingredientsContext from "../../context/ingredientsContext";
import "./ingredients.less"

const Ingredients = (props) => {
    const {id} = props;

    const {currentIngredients, setIngredients} = useContext(ingredientsContext)
    const [ingredientInfo, setIngredientInfo] = useState([])

    const handleChangeIngredients = (id) => {
        let newArray = currentIngredients.slice();
        if (currentIngredients.indexOf(id) >= 0) {
            newArray.splice(newArray.indexOf(id), 1)
        } else {
            newArray.push(id)
        }
        setIngredients(newArray);
    }

    useEffect(() => {
        async function getCategories() {
            fetch("http://localhost:8080/api/ingredients?categoryId=" + id + "&size=1000", {
                method: 'GET',
                redirect: 'follow',
            })
                .then(response => response.json())
                .then(response => {
                    setIngredientInfo(response.results)
                })
                .catch(error => console.log('error', error));
        }

        getCategories();
    }, []);

    return (
        <div className="ingredientContainer">
            {ingredientInfo.map((ingredient) => {
                return (
                    <div className="ingredient" key={ingredient.id}>
                        <div className="checkbox">
                            <label className={currentIngredients.indexOf(ingredient.id) >= 0?"active":""} htmlFor={"checkbox" + ingredient.id}>
                                <input type="checkbox" checked={currentIngredients.indexOf(ingredient.id) >= 0}
                                       id={"checkbox" + ingredient.id}
                                       onChange={() => {
                                           handleChangeIngredients(ingredient.id)
                                       }}
                                />
                            </label>
                        </div>
                        {ingredient.name}
                    </div>
                );
            })}
        </div>

    );
}

export default Ingredients