import React from "react";
import Ingredients from "../../components/ingredients";
import "./search.less"
const Search = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", document.cookie.split("token=")[1]);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    myHeaders.forEach(value => console.log(value))

    fetch("http://localhost:8080/api/users/1", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    return (
        <>
            <section className="container">
                <h1>
                    Search Menu
                </h1>
            </section>
            <button className="menu">
                Ingredients
            </button>
                <Ingredients></Ingredients>
        </>

    );
}

export default Search;
