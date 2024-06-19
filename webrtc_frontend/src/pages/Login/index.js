import {Component} from "react";
import Header from "../../components/common/Header";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import {Formik} from "formik";
import * as Yup from 'yup';
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import {Helmet} from "react-helmet";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    _handleSubmit = (values, {resetForm, setSubmitting}) => {
        const {navigate} = this.props;

        RestClient.postRequest(AppUrl.login,values).then((res)=>{
            const result = res.data;
            const status = res.status;

            if (status===200){
                let userData = {
                    id : result.data.id,
                    name : result.data.name,
                    email : result.data.email,
                    conn_string : result.data.conn_string,
                    access_token : result.data.access_token,
                }

                let appState = {
                    isLoggedIn : true,
                    user : userData
                }

                this.props.AuthStore.saveToken(appState);
                Notification.success(result);
                navigate("/");

            }else{
                if (status===422){
                    Notification.error(result);
                    setSubmitting(false);
                }else if (status===401){
                    Notification.error(result);
                    setSubmitting(false);
                }else{
                    Notification.error(result);
                    setSubmitting(false);
                }
            }

        }).catch((e)=>{
            console.log(e);
            Notification.error({
                title : "Hata",
                message : "Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz"
            });

            setSubmitting(false);
        });

        setSubmitting(false);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Giriş Yap</title>
                </Helmet>

                <Header/>

                <Container>
                    <Row>
                        <Col md={12}>
                            <Card style={{width: '100%', marginTop: "5rem"}}>
                                <Card.Header>Giriş Yap</Card.Header>
                                <Card.Body>
                                    <Formik initialValues={{
                                        email: '',
                                        password: ''
                                    }}
                                            validationSchema={Yup.object().shape({
                                                email: Yup.string().required("E-Mail Alanı Boş Bırakılamaz").email("Lütfen Geçerli Bir E-Mail Adresi Giriniz"),
                                                password: Yup.string().required("Şifre Alanı Boş Bırakılamaz").min(8, "Şifreniz 8 Karakterden Az Olamaz").max(16, "Şifreniz 16 Karakterden Fazla Olamaz")
                                            })}
                                            onSubmit={this._handleSubmit}>
                                        {({errors,values,touched,handleChange,handleSubmit,handleBlur,isValid,isSubmitting}) => (
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>E-Mail Adresiniz</Form.Label>
                                                    <Form.Control value={values.email} onChange={handleChange('email')} onBlur={handleBlur} name={"email"} type="text" placeholder="E-Mail Adresiniz"/>
                                                    {(errors.email && touched.email) && <small style={{color : "red"}}>{errors.email}</small>}
                                                </Form.Group>

                                                <Form.Group className={"mt-3"}>
                                                    <Form.Label>Şifreniz</Form.Label>
                                                    <Form.Control value={values.password} onChange={handleChange('password')} onBlur={handleBlur} name={"password"} type="password" placeholder="Şifreniz"/>
                                                    {(errors.password && touched.password) && <small style={{color : "red"}}>{errors.password}</small>}
                                                </Form.Group>

                                                <Button disabled={(!isValid || isSubmitting)} onClick={handleSubmit} className={"mt-3"} variant="primary" type="submit">
                                                    Giriş Yap
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withRouter(inject("AuthStore")(observer(Login)));
