import {Component, createRef} from "react";
import Header from "../../components/common/Header";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import AuthLayout from "../../components/Layout/AuthLayout";
import {Card, Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import { Peer } from "peerjs";

const HOST = "127.0.0.1";
const PORT = 4444;

class Video extends Component {

    constructor(props) {
        super(props);

        this.localVideoRef = createRef();
        this.remoteVideoRef = createRef();
    }

    componentDidMount() {
        this.checkUser();
        this.startVideoChat();
    }

    componentWillUnmount() {
        this.peer.destroy();
    }

    startVideoChat = ()=>{
        const {params} = this.props;
        this.peer = new Peer(this.props.AuthStore.appState.user.conn_string,{
            host : HOST,
            port : PORT,
            key : "webrtc",
            path : "/"
        });

        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        const _self = this;

        getUserMedia({video : true,audio : false},function (stream){
            if (_self.localVideoRef.current){
                _self.localVideoRef.current.srcObject = stream;
            }

            const call = _self.peer.call(params.conn,stream);
            call.on("stream",function (remoteStream){
               if (_self.remoteVideoRef.current){
                   _self.remoteVideoRef.current.srcObject = remoteStream;
               }
            });
        },function (err) {
            console.log("Stream error: ",err);
        });

        _self.peer.on("call",function (call){
          getUserMedia({video : true,audio : false},function (stream){
              call.answer(stream);
              call.on("stream",function (remoteStream){
                  if (_self.remoteVideoRef.current){
                      _self.remoteVideoRef.current.srcObject = remoteStream;
                  }
              });
          },function (err){
              console.log("Stream error: ",err);
          });
        })
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
                                            ref={this.localVideoRef}
                                            playsInline
                                            autoPlay
                                            width={300}
                                            height={300}
                                        />
                                        <hr/>
                                        <p>Karşı Tarafın Kamerası</p>
                                        <video
                                            ref={this.remoteVideoRef}
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
