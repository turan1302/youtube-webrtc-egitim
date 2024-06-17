import {Component} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import withRouter from "../withRouter";
import {inject, observer} from "mobx-react";
import Video from "../pages/Video";

class AuthRouter extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/video/:conn"} element={<Video/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
                <Route path={"*"} element={<Navigate to={"/"}/>}/>
            </Routes>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(AuthRouter)));
