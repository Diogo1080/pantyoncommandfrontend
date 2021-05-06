import React, {useState} from "react";

const LoginContext = React.createContext();

export const LoginModalConsumer = LoginContext.Consumer

export const LoginModalProvider = (props) => {

    let loginInitialState = false;

    let loginInfoInitialSate ={
        username: "",
        userRole: "",
        userId:null
    }

    if (document.cookie.split("token=")[1]) {
        loginInitialState = true

        const token = JSON.parse(atob(document.cookie.split("token=Bearer")[1].split(".")[1]))
        loginInfoInitialSate={
            username: token.username,
            userRole: token.userRole,
            userId: token.userId
        }
    }

    const [loginInfo, setLoginInfo] = useState(loginInfoInitialSate)
    const [currentLoginModalState, toggleLoginModal] = useState(false)
    const [currentLoginState, toggleLogin] = useState(loginInitialState)
    const {children} = props

    return (
        <LoginContext.Provider
            value={{currentLoginState, toggleLogin, loginInfo, setLoginInfo, currentLoginModalState, toggleLoginModal}}>
            {children}
        </LoginContext.Provider>

    )
}

export default LoginContext