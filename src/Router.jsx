import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom"

import Home from "./pages/home"
import "./index.css"


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home></Home>
                </Route>
                <Route path="/Search">

                </Route>
                <Route path="/products/:id">

                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Router