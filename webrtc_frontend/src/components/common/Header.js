import {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";

class Header extends Component {
    render() {
        const {location} = this.props;

        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to={"/"}>webRTC</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={"/"} active={location.pathname==="/"}>Anasayfa</Nav.Link>
                        <Nav.Link as={Link} to={"/login"} active={location.pathname==="/login"}>Giriş Yap</Nav.Link>
                        <Nav.Link as={Link} to={"/register"} active={location.pathname==="/register"}>Kayıt Ol</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        )
    }
}

export default withRouter(Header);
