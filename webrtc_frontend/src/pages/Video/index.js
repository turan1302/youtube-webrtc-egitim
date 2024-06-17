import {Component} from "react";
import Header from "../../components/common/Header";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import AuthLayout from "../../components/Layout/AuthLayout";
import {Card, Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";

class Video extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.checkUser();
    }

    checkUser = () => {
        const {navigate,params} = this.props;
        this.props.AuthStore.getToken();
        const token = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user.access_token : null;

        RestClient.postRequest(AppUrl.video,{
            conn_string : params.conn
        },{
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res)=>{
            const status = res.status;
            const result = res.data;
            if (status!==200){
                Notification.error(result);
                navigate("/");
            }
        }).catch((err)=>{
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz"
            });
            navigate("/");
        })
    }

    render() {
        const {params} = this.props;
        const user = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState.user : null;

        return (
            <>
                <AuthLayout>
                    <Header/>

                    <Container>
                        <Row className={"mt-5"}>
                            <Col md={12}>
                                <Card>
                                    <Card.Header><p>
                                        Karşı Tarafın Kimliği: {params.conn}
                                        <br/>
                                        Bizim Kimliğimiz: {user.conn_string}
                                    </p></Card.Header>
                                    <Card.Body>
                                        <p>Bizim Kameramız</p>
                                        <video
                                            playsInline
                                            autoPlay
                                            width={300}
                                            height={300}
                                        />
                                        <hr/>
                                        <p>Karşı Tarafın Kamerası</p>
                                        <video
                                            playsInline
                                            autoPlay
                                            width={300}
                                            height={300}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </AuthLayout>
            </>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(Video)));
