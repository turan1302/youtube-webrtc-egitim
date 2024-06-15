import {Component} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import withRouter from "../withRouter";
import {inject, observer} from "mobx-react";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class AuthRouter extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
            </Routes>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(AuthRouter)));
