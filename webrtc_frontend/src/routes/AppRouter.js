import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

class AppRouter extends Component {
    render() {
        return (
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
            </Routes>
        )
    }
}

export default AppRouter;
