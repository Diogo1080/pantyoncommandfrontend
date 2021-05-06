import React, {useState} from "react";

const LoginContext = React.createContext();

export const LoginModalConsumer = LoginContext.Consumer

export const LoginModalProvider = (props) => {

    let loginInitialState=false;

    if(document.cookie.split("token=")[1]){
        loginInitialState = true
    }

    const [currentLoginModalState, toggleLoginModal] = useState(false)
    const [currentLoginState, toggleLogin] = useState(loginInitialState)
    const {children} = props

    return (
        <LoginContext.Provider value = {{currentLoginState, toggleLogin, currentLoginModalState, toggleLoginModal}}>
            {children}
        </LoginContext.Provider>

    )
}

export default LoginContext