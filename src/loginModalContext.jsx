import React, {useState} from "react";

const LoginModalContext = React.createContext();

export const LoginModalConsumer = LoginModalContext.Consumer

export const LoginModalProvider = (props) => {

    const [currentLoginState, toggleLoginModal] = useState(false)
    const {children} = props

    return (
        <LoginModalContext.Provider value = {{currentLoginState, toggleLoginModal}}>
            {children}
        </LoginModalContext.Provider>

    )
}

export default LoginModalContext