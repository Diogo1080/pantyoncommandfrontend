import React from "react";
import "../../index.less"
import "./home.less"

const Home = () => {

    return (
        <>
            <section className="container">
                <h1>
                    Welcome to
                </h1>
                <h1>
                    Pantry on command
                </h1>
            </section>
            <div className="flex">
                <section className="container">
                    <p>
                        Here you will be able to find your favorite recipes.
                    </p>
                </section>
                <section className="container">
                    <p>
                        Start by going over the search button on the header and have fun on your kitchen!
                    </p>
                </section>
            </div>
        </>

    );
}

export default Home;
