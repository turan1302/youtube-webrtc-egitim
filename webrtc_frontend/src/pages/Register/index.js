import {Component} from "react";
import Header from "../../components/common/Header";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import withRouter from "../../withRouter";
import Notification from "../../RestAPI/Notification";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

class Register extends Component {

    constructor(props) {
        super(props);
    }

    _handleSubmit = (values,{resetForm,setSubmitting}) => {
        const {navigate} = this.props;

        RestClient.postRequest(AppUrl.register,values).then((res)=>{
            const result = res.data;
            const status = res.status;

            if (status===201){
                Notification.success(result);
                navigate("/login");
            }else{
                if (status===422){
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
           })
        });

        setSubmitting(false);
    }

    render() {
        return (
            <>
                <Header/>

                <Container>
                    <Row>
                        <Col md={12}>
                            <Card style={{width: '100%', marginTop: "5rem"}}>
                                <Card.Header>Kayıt Ol</Card.Header>
                                <Card.Body>
                                    <Formik initialValues={{
                                        name: '',
                                        email: '',
                                        password: '',
                                        password_confirmation: '',
                                    }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string().required("Ad Soyad Alanı Gereklidir"),
                                                email: Yup.string().required("E-Mail Alanı Gereklidir").email("E-Mail Adresi Geçersiz"),
                                                password: Yup.string().required("Şifre Alanı Gereklidir").min(8, "Şifreniz 8 Karakterden Az Olamaz").max(16, "Şifreniz 16 Karakterden Fazla Olamaz"),
                                                password_confirmation: Yup.string().required("Şifre (Tekrar) Alanı Gereklidir").oneOf([Yup.ref("password"), null], "Şifreler Eşleşmiyor"),
                                            })}
                                            onSubmit={this._handleSubmit}>
                                        {({values,errors,touched,handleBlur,handleChange,handleSubmit,isValid,isSubmitting}) => (
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>Adınız Soyadınız</Form.Label>
                                                    <Form.Control value={values.name} onChange={handleChange('name')} onBlur={handleBlur} name={"name"} type="text" placeholder="Adınız Soyadınız"/>
                                                    {(errors.name && touched.name) && <small style={{color : "red"}}>{errors.name}</small>}
                                                </Form.Group>

                                                <Form.Group className={"mt-3"}>
                                                    <Form.Label>E-Mail Adresiniz</Form.Label>
                                                    <Form.Control value={values.email} onChange={handleChange('email')} onBlur={handleBlur} name={"email"} type="text" placeholder="E-Mail Adresiniz"/>
                                                    {(errors.email && touched.email) && <small style={{color : "red"}}>{errors.email}</small>}
                                                </Form.Group>

                                                <Form.Group className={"mt-3"}>
                                                    <Form.Label>Şifreniz</Form.Label>
                                                    <Form.Control value={values.password} onChange={handleChange('password')} onBlur={handleBlur} name={"password"} type="password" placeholder="Şifreniz"/>
                                                    {(errors.password && touched.password) && <small style={{color : "red"}}>{errors.password}</small>}
                                                </Form.Group>

                                                <Form.Group className={"mt-3"}>
                                                    <Form.Label>Şifreniz (Tekrar)</Form.Label>
                                                    <Form.Control value={values.password_confirmation} onChange={handleChange('password_confirmation')} onBlur={handleBlur} name={"password_confirmation"} type="password" placeholder="Şifreniz (Tekrar)"/>
                                                    {(errors.password_confirmation && touched.password_confirmation) && <small style={{color : "red"}}>{errors.password_confirmation}</small>}
                                                </Form.Group>

                                                <Button disabled={(!isValid || isSubmitting)} onClick={handleSubmit} className={"mt-3"} variant="primary" type="submit">
                                                    Kayıt Ol
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

export default withRouter(Register);
