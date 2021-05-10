import React, {useState} from "react";
import "./categories.less"
import Ingredients from "../Ingredients";

const Category = (props) => {
    const {name,id} = props;

    const [categoryOpen, setCategoryOpen] = useState(false)

    return (
        <>
            <button className={categoryOpen?"categoryBtn open":"categoryBtn"} onClick={()=>{setCategoryOpen(!categoryOpen)}}>
                {name}
            </button>
            <div className="outer-container-category" style={{display: categoryOpen ? "flex" : "none"}}>
                <Ingredients categoryOpen={categoryOpen} id={id}></Ingredients>
            </div>
        </>

    );
}

export default Category