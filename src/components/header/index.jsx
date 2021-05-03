import React, {useContext} from "react";
import "./header.less"
import {Link} from "react-router-dom"
import LoginModalContext from "../../LoginModalContext";

const Header = () => {

    const {toggleLoginModal} = useContext(LoginModalContext)

    return (
        <>
            <header className="header">
                <nav className="title-container">
                    <Link to="/">
                        <img src="logo.png" alt="pantry on command" className="logo-image"/>
                    </Link>
                </nav>
                <div className="link-container">
                    <Link exact="true" to="/">
                        Home
                    </Link>
                </div>
                <div className="link-container">
                    <Link to="/search">
                        Search
                    </Link>
                </div>
                <div className="login-svg-container">
                    <img src="chef.svg" alt="chef-icon" onClick={toggleLoginModal}/>
                </div>
            </header>
        </>
    );
}

export default Header;