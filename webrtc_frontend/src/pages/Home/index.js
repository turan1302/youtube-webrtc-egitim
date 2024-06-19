import {Component} from "react";
import Header from "../../components/common/Header";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import AuthLayout from "../../components/Layout/AuthLayout";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import { CircleSpinner } from "react-spinners-kit";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            clients: []
        }
    }

    componentDidMount() {
        this.getClientList();
    }

    getClientList = () => {
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.getRequest(AppUrl.home, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                this.setState({
                    isLoading: false,
                    clients: result.data.clients
                });
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz"
            });
        })
    }

    clientsRender = (clients)=>{
        return clients.map((item,index)=>{
            return (
                <ListGroup.Item as={Link} to={`/video/${item.conn_string}`} key={index}>{item.name}</ListGroup.Item>
            )
        })
    }

    render() {
        const {isLoading, clients} = this.state;

        if (isLoading===true){
            return (
                <div className={"d-flex justify-content-center align-items-center vh-100"}>
                    <CircleSpinner size={30} color="#686769" loading={isLoading} />
                </div>
            )
        }

        return (
            <>
                <Helmet>
                    <title>WebRTC</title>
                </Helmet>

                <AuthLayout>
                    <Header/>

                    <Container>
                        <h3 className={"d-flex justify-content-center my-5"}>Kullanıcı Listesi</h3>
                        <Row className={"mt-5"}>
                            <Col md={12}>
                                <ListGroup>
                                    {(clients.length>0) ? this.clientsRender(clients) : (
                                        <div className={"alert alert-danger text-center"}>
                                            Herhangi bir kullanıcı bulunamadı
                                        </div>
                                    )}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </AuthLayout>
            </>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(Home)));
