import React, {useEffect, useState} from "react";
import "./ingredients.less"

const Ingredients = (props) => {
    const {ingredientMenuState} = props;

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

        getCategories();
    }, []);
    return (
        <div className="ingredientCategoryContainer" style={{display: ingredientMenuState ? "flex" : "none"}}>
            {categoriesInfo.map((category) => {
                return(
                    <div className="categoryContainer" key={category.id}>
                        {category.name}
                    </div>
                );
            })}
        </div>

    );
}

export default Ingredients