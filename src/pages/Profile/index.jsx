import React, {useContext, useEffect, useState} from "react";
import "../../index.less"
import "./profile.less"
import LoginContext from "../../context/loginContext";
import {Redirect} from "react-router";

const Profile = () => {

    const {currentLoginState, loginInfo, setLoginInfo, toggleLogin} = useContext(LoginContext)

    let logout=false

    let token

    if (document.cookie) {
        token = JSON.parse(atob(document.cookie?.split("token=Bearer")[1]?.split(".")[1]));
    }

    if(!token){logout=true}

    const [logOut, setLogOut] = useState(logout)

    const loginUpdateState = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    }
    const [formInfo, setFormInfo] = useState(loginUpdateState)



    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormInfo({...formInfo, [name]: value});
    }

    //Get logged in user info
    useEffect(() => {
        if (currentLoginState) {
            fetch("http://localhost:8080/api/users/" + loginInfo.userId, {
                method: 'GET',
                headers: {
                    "Authorization": document.cookie?.split("token=")[1],
                },
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    setFormInfo({
                        email: result.email,
                        username: result.username,
                        password: formInfo.password,
                        confirmPassword: formInfo.confirmPassword
                    })
                })
                .catch(error => console.log('error', error));
        }
    }, [currentLoginState]);


    //handle update logged in user info
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const data = {
            userName: formInfo.username,
            email: formInfo.email,
            password: formInfo.password,
        };

        if (data.password !== formInfo.confirmPassword || data.password === false || formInfo.confirmPassword === false) {
            alert("Passwords don't match or are empty")
        } else {
            fetch("http://localhost:8080/api/users/" + token.userId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": document.cookie?.split("token=")[1],
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(() => {
                        alert("Updated");
                    }
                )
                .catch(error => alert('error', error));
        }
    }

    function logoff() {
        toggleLogin(false)
        setLoginInfo({userName: "", userRole: "", userId: null})
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        setLogOut(true)
    }

    return (
        <>
            {logOut ? <Redirect to={{pathname: "/"}}></Redirect>
                : (
                    <div>

                        <section className="container">
                            <h1>
                                Profile
                            </h1>
                        </section>
                        <section className="flex">
                            <form onSubmit={handleSubmit}>
                                <div className="container flex-end">
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input name="email" type="text" value={formInfo.email}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input name="username" type="text" value={formInfo.username}
                                               onChange={handleInputChange}/>
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
                                    <button className="submit-btn" type="submit">Update info</button>
                                </div>
                            </form>
                        </section>
                        <div className="flex">
                            <button className="btn" onClick={logoff}>Log Off</button>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default Profile;
