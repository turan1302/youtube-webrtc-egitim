import {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";
import {inject, observer} from "mobx-react";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

class Header extends Component {

    constructor(props) {
        super(props);

        this.isLoggedIn();
    }

    isLoggedIn = async () => {
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.check, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            if (result.isLoggedIn !== true) {
                this.props.AuthStore.removeToken();
            } else {
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
        }).catch((err) => {
            console.log(err);
            this.props.AuthStore.removeToken();
        });
    }

    render() {
        const {location} = this.props;
        const {isLoggedIn, user} = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState : {};

        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to={"/"}>webRTC</Navbar.Brand>
                    <Nav className="mr-auto">

                        {(!isLoggedIn) ? (
                            <>
                                <Nav.Link as={Link} to={"/login"} active={location.pathname === "/login"}>Giriş
                                    Yap</Nav.Link>
                                <Nav.Link as={Link} to={"/register"} active={location.pathname === "/register"}>Kayıt
                                    Ol</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Navbar style={{color : "#cccccc"}}>Kullanıcı: {user.name}</Navbar>
                                <Nav.Link as={Link} to={"/logout"} active={location.pathname === "/logout"}>Çıkış
                                    Yap</Nav.Link>
                            </>
                        )}


                    </Nav>
                </Navbar>
            </>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(Header)));
