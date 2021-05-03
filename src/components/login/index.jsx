import React from "react";
import "./login.less"
import {useState} from "react";

const Login = (props) => {

    const {showing, showingcallback} = props;

    const loginInitialState = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        loginEmail: "",
        loginPassword: "",
        tabToShow: "signIn"
    }

    const [input, setInput] = useState(loginInitialState)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});
    }

    const onSwitchTab = (e) => {
        let selected = e.currentTarget.getAttribute("data-state");
        setInput({...input, tabToShow: selected})
    }

    const handleRegister = (evt) => {
        evt.preventDefault();

        const data = {
            email: input.email,
            userName: input.username,
            password: input.password,
            confirmPassword: input.confirmPassword
        };

        console.log(data)

        if (data.password != input.confirmPassword) {
            alert("Passwords don't match")
        } else {
            fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then((response) => {
                console.log(response)
            })
        }


    }

    const handleLogin = (evt) => {
        evt.preventDefault();

        const data = {
            email: input.loginEmail,
            password: input.loginPassword,
        };

        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            response.headers.forEach(value => {console.log(value)})
            if (response.status != 200) {
                alert("Login info wrong.")
            } else {
                return response.json();
            }
        }).then((response) => {
            console.log(response);
            document.cookie = "token=Bearer " + response.token;
        })

    }

    return (
        <div className={showing?"loginOn outer-container":"outer-container"} style={{display: showing ? "flex" : "none"}}>
            <div className="inner-container">
                <div className="login-popin" className="close-btn-container">
                    <img onClick={() => showingcallback()} src="cancel.svg" className="login-close-btn"/>
                </div>
                <div className="tab-container">
                    <div className="tabs">
                        <div data-state="signIn"
                             className={input.tabToShow === "signIn" ? "selected login-tab" : "login-tab"}
                             onClick={onSwitchTab}>Sign In
                        </div>
                        <div data-state="signUp"
                             className={input.tabToShow === "signUp" ? "selected login-tab" : "login-tab"}
                             onClick={onSwitchTab}>Sign Up
                        </div>
                    </div>
                    {input.tabToShow === "signIn" ?
                        <div className="sign-in">
                            <form onSubmit={handleLogin}>
                                <div className="form-container">
                                    <div>
                                        <label htmlFor="loginEmail">Email:</label>
                                        <input name="loginEmail" type="text" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="Password">Password:</label>
                                        <input name="loginPassword" type="password" onChange={handleInputChange}/>
                                    </div>
                                    <div className="submit-btn-container">
                                        <button className="submit-btn" type="submit">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="sign-up">
                            <form onSubmit={handleRegister}>
                                <div className="form-container">
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input name="email" type="text" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input name="username" type="text" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password:</label>
                                        <input name="password" type="password" onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <input name="confirmPassword" type="password" onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="submit-btn-container">
                                    <button className="submit-btn" type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login