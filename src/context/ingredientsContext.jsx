import React, {useContext, useState} from "react";
import ingredientsContext from "./ingredientsContext";

const IngredientContext = React.createContext();

export const IngredientConsumer = IngredientContext.Consumer

export const IngredientProvider = (props) => {


    const [searchedState, toggleSearchedState] = useState(false)
    const [currentIngredients, setIngredients] = useState([])
    const {children} = props

    return (
        <IngredientContext.Provider value={{searchedState, toggleSearchedState,currentIngredients, setIngredients}}>
            {children}
        </IngredientContext.Provider>

    )
}

export default IngredientContext