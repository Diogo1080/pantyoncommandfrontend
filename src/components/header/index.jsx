import React, {useContext} from "react";
import "./header.less"
import {Link} from "react-router-dom"
import LoginContext from "../../context/loginContext";

const Header = (props) => {


    const {currentLoginState} = props
    const {toggleLoginModal} = useContext(LoginContext)

    return (
        <>
            <header className="header">
                <nav className="title-container">
                    <Link to="/">
                        <img src="logo.png" alt="pantry on command" className="logo-image"/>
                    </Link>
                </nav>
                <div className="link-container">
                    <Link to="/search">
                        Search
                    </Link>
                </div>
                <div className="login-svg-container">
                    {
                        currentLoginState?
                            <Link to="/profile">
                                <img src="chef.svg" alt="chef-icon" />
                            </Link>
                        :
                            <img src="chef.svg" alt="chef-icon" onClick={toggleLoginModal}/>
                    }
                </div>
            </header>
        </>
    );
}

export default Header;