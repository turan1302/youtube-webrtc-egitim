import {Component} from "react";
import Header from "../../components/common/Header";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class Register extends Component {
    render() {
        return (
            <>
                <Header/>

                <Container>
                    <Row>
                        <Col md={12}>
                            <Card style={{ width: '100%',marginTop : "5rem" }}>
                                <Card.Header>Kayıt Ol</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Adınız Soyadınız</Form.Label>
                                            <Form.Control type="text" placeholder="Adınız Soyadınız" />
                                        </Form.Group>

                                        <Form.Group className={"mt-3"}>
                                            <Form.Label>E-Mail Adresiniz</Form.Label>
                                            <Form.Control type="email" placeholder="E-Mail Adresiniz" />
                                        </Form.Group>

                                        <Form.Group className={"mt-3"}>
                                            <Form.Label>Şifreniz</Form.Label>
                                            <Form.Control type="password" placeholder="Şifreniz" />
                                        </Form.Group>

                                        <Form.Group className={"mt-3"}>
                                            <Form.Label>Şifreniz (Tekrar)</Form.Label>
                                            <Form.Control type="password" placeholder="Şifreniz (Tekrar)" />
                                        </Form.Group>

                                        <Button className={"mt-3"} variant="primary" type="submit">
                                            Kayıt Ol
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Register;
