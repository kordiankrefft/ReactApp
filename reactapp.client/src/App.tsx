import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaFacebook, FaTwitter, FaInstagram, FaRegCopyright } from 'react-icons/fa';
import React from 'react';

const App: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Container fluid className="flex-grow-1">
                <Row>
                    <Col>
                        <Image
                            fluid
                            src="image/image2.png"
                            style={{
                                marginLeft: '5px',
                                marginBottom: '20px',
                                marginTop: '20px',
                                width: '260vh',
                                height: '75vh',
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem', marginLeft: '5px' }}>
                            <Card.Img variant="top" src="image/kalendarz.jpg" />
                            <Card.Body>
                                <Card.Title>Terminarz</Card.Title>
                                <Card.Text>
                                    Zadania do wykonania, terminy realizacji
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="image/ksiegowosc.jpg" />
                            <Card.Body>
                                <Card.Title>Księgowość</Card.Title>
                                <Card.Text>
                                    Dziennik, plan kont, zestawienia księgowe, deklaracje dochodowe
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '19rem' }}>
                            <Card.Img variant="top" src="image/produkcja.jpg" />
                            <Card.Body>
                                <Card.Title>Produkcja</Card.Title>
                                <Card.Text>
                                    Technologie, operacje
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem', marginLeft: '5px' }}>
                            <Card.Img variant="top" src="image/dokumenty.jpg" />
                            <Card.Body>
                                <Card.Title>Ewidencja dokumentów</Card.Title>
                                <Card.Text>
                                    Ewidencjonowanie dokumentów, ewidencja i deklaracja VAT, zestawienie
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem', marginLeft: '5px' }}>
                            <Card.Img variant="top" src="image/pojazd.jpg" />
                            <Card.Body>
                                <Card.Title>Ewidencja pojazdów</Card.Title>
                                <Card.Text>
                                    Ewidencja pojazdów, trasy, przejazdy oraz koszty
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '19rem', marginLeft: '5px' }}>
                            <Card.Img variant="top" src="image/dms.jpg" />
                            <Card.Body>
                                <Card.Title>DMS</Card.Title>
                                <Card.Text>
                                    Zarządzanie dokumentami
                                </Card.Text>
                                <Button variant="primary">Wybierz</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-dark text-white text-center py-3 mt-auto" style={{ width: '277vh', marginLeft: '-60px' }}>
                <Container>
                    <Row>
                        <Col md={4} className="text-md-left" style={{ textAlign: 'left' }}>
                            <h5>Subskrybuj nasz Newsletter</h5>
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="wpisz swój email" />
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Subskrybuj</button>
                            </form>
                        </Col>
                        <Col md={4} className="text-center">
                            <p style={{ margin: 0 }}>74-572 Suwałki, ul. Szara 32</p>
                            <p style={{ margin: 0 }}>Email: contact@skiingclub.com</p>
                            <p style={{ margin: 0 }}>Phone: +123 456 7890</p>
                        </Col>
                        <Col md={4} className="d-flex justify-content-center align-items-center" style={{ marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <FaFacebook size={30} />
                                </a>
                                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <FaTwitter size={30} />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <FaInstagram size={30} />
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" style={{ marginTop: '15px' }}>
                            <p style={{ margin: 0 }}>
                                <FaRegCopyright /> 2024 SKIing CLUB
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default App;