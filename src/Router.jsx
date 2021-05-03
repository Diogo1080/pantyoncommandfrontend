import React, {useContext} from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom"
import Home from "./pages/home"
import Search from "./pages/search"
import Header from "./components/header";
import "./index.less"
import LoginModalContext from "./LoginModalContext";
import Login from "./components/login";


const Router = () => {

    const {currentLoginState, toggleLoginModal} = useContext(LoginModalContext)

    return (
        <>
            <BrowserRouter>
                <Login showing={currentLoginState} showingcallback={toggleLoginModal}></Login>
                <main className= "clean-layout-body">
                    <Header loginState={currentLoginState}/>
                    <Switch>
                        <Route path="/" exact>
                            <Home></Home>
                        </Route>
                        <Route path="/search">
                            <Search></Search>
                        </Route>
                    </Switch>
                </main>
            </BrowserRouter>
        </>
    )
}
export default Router