import {Component} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import withRouter from "../withRouter";
import {inject, observer} from "mobx-react";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";
import AuthRouter from "./AuthRouter";

class AppRouter extends Component {

    constructor(props) {
        super(props);

        this.isLoggedIn();
    }

    isLoggedIn = async ()=>{
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.check,{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{
            const result = res.data;
            if (result.isLoggedIn !== true){
                this.props.AuthStore.removeToken();
            }else{
                let userData = {
                    id: result.data.id,
                    name: result.data.name,
                    email: result.data.email,
                    conn_string: result.data.conn_string,
                    access_token: result.data.access_token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData
                }

                this.props.AuthStore.saveToken(appState);
            }
        }).catch((err)=>{
            console.log(err);
            this.props.AuthStore.removeToken();
        })
    }

    render() {
        const {isLoggedIn} = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState : false;

        return (
            <Routes>
                <Route path={"/*"} element={(!isLoggedIn) ? <Navigate to={"/login"}/> : <AuthRouter/>}/>
                <Route path={"/login"} element={(isLoggedIn) ? <Navigate to={"/"}/> : <Login/>}/>
                <Route path={"/register"} element={(isLoggedIn) ? <Navigate to={"/"}/> : <Register/>}/>
                <Route path={"*"} element={<Navigate to={"/"}/>}/>
            </Routes>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(AppRouter)));
