import React, {useContext} from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom"
import Home from "./pages/home"
import Search from "./pages/search"
import Header from "./components/header";
import Login from "./components/login";
import Profile from "./pages/Profile";

import "./index.less"
import LoginContext from "./context/loginContext";
import {IngredientProvider} from "./context/ingredientsContext";
import Searched from "./pages/searched";


const Router = () => {

    const {currentLoginState,toggleLogin,loginInfo,setLoginInfo,currentLoginModalState,toggleLoginModal} = useContext(LoginContext)
    return (
        <>
            <BrowserRouter>
                <Login
                    currentLoginModalState={currentLoginModalState}
                    setLoginInfo={setLoginInfo}
                    toggleLogin={toggleLogin}
                    toggleLoginModal={toggleLoginModal}>
                </Login>
                <main className= "clean-layout-body">
                    <Header currentLoginState={currentLoginState}/>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/profile" exact>
                            <Profile/>
                        </Route>
                        <IngredientProvider>
                            <Route path="/search">
                                <Search/>
                            </Route>
                            <Route>
                                <Searched/>
                            </Route>
                        </IngredientProvider>
                    </Switch>
                </main>
            </BrowserRouter>
        </>
    )
}
export default Router