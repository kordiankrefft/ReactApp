import React, { useState } from 'react';
import { Button, Card, Carousel, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TrainingRegistrationForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    trainingDate: Date;
    training: string;
}

export const Trainings: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<{ title: string; description: string }>({ title: '', description: '' });
    const [formData, setFormData] = useState<TrainingRegistrationForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        trainingDate: new Date(),
        training: '',
    });
    const [validated, setValidated] = useState<boolean>(false);

    const openModal = (title: string, description: string): void => {
        setModalContent({ title, description });
        setShowModal(true);
    };

    const closeModal = (): void => setShowModal(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date | null): void => {
        if (!date) return;
        setFormData({ ...formData, trainingDate: date });
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            alert('Form submitted!');
            // eslint-disable-next-line no-console
            console.log(formData);
        }
        setValidated(true);
    };

    return (
        <Container fluid>
            <h2 className="text-center">Szkolenia</h2>
            <Row>
                <Col md={2}>
                    <Card className="mb-3">
                        <Card.Header>Nadchodzące szkolenia</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Ostrzenie krawędzi - 2024-06-10</ListGroup.Item>
                            <ListGroup.Item>Smarowanie nart - 2024-06-12</ListGroup.Item>
                            <ListGroup.Item>Szkolenie sprzedażowe - 2024-06-15</ListGroup.Item>
                            <ListGroup.Item>Zaawansowane techniki jazdy - 2024-06-18</ListGroup.Item>
                            <ListGroup.Item>Serwisowanie sprzętu - 2024-06-20</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card>
                        <Card.Header>Opinie uczestników</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>"Świetne szkolenie, bardzo polecam! Dowiedziałem się wielu nowych rzeczy."</p>
                                <footer className="blockquote-footer">Jan Kowalski</footer>
                            </blockquote>
                            <blockquote className="blockquote mb-0 mt-3">
                                <p>"Profesjonalnie przeprowadzone szkolenie, polecam wszystkim!"</p>
                                <footer className="blockquote-footer">Anna Nowak</footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src="image/smarowanie4.jpg" style={{ height: '660px' }} alt="First slide" />
                            <Carousel.Caption>
                                <h3>Ostrzenie krawędzi</h3>
                                <p>Jeżeli chodzi o szkolenie grupowe, jest ono realizowane w postaci pokazu, podczas którego omawiane są trzy główne czynności serwisowe (naprawa ślizgu, ostrzenie krawędzi, smarowanie na gorąco). W czasie tego szkolenia omawiamy trochę teorii, są pytania i odpowiedzi, a także pamiątkowy certyfikat.</p>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        openModal(
                                            'Ostrzenie krawędzi',
                                            'Szkolenie ostrzenia krawędzi w nartach i snowboardzie to specjalistyczny kurs, który ma na celu nauczenie uczestników, jak prawidłowo ostrzyć krawędzie sprzętu zimowego. Dobrze naostrzone krawędzie są kluczowe dla bezpieczeństwa, kontroli oraz wydajności jazdy na stoku. Na szkoleniu omawiane są podstawy ostrzenia, znaczenie ostrzenia oraz różnice między krawędziami bocznymi a dolnymi. Uczestnicy poznają także narzędzia do ostrzenia, m.in. rodzaje pilników (stalowych, diamentowych) oraz ostrzalki (ręczne, elektryczne), a także akcesoria pomocnicze, jak klipsy, gumki do usuwania gratów i miarki do kontroli kątów ostrzenia.'
                                        )
                                    }
                                >
                                    Przejdź dalej
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="image/smarowanie2.jpg" style={{ height: '660px' }} alt="Second slide" />
                            <Carousel.Caption style={{ color: 'black' }}>
                                <h3>Smarowanie nart</h3>
                                <p>Szkolenie poświęcone zagadnieniom smarowania nart zjazdowych (smarowanie metodą na gorąco, omówienie procesu, przygotowanie ślizgu, smarów i narzędzi) oraz biegowych (technika klasyczna i popularna tzw. łyżwa – smarowanie na poślizg i trzymanie).</p>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        openModal(
                                            'Smarowanie nart',
                                            'Szkolenie smarowania nart to specjalistyczny kurs, który ma na celu nauczenie uczestników, jak prawidłowo smarować narty, aby zapewnić lepszą jazdę i ochronę sprzętu. Dobrze nasmarowane narty zapewniają lepszy poślizg, kontrolę oraz wydajność na stoku. Na szkoleniu omawiane są podstawy smarowania, znaczenie smarowania i różnice między rodzajami smarów (uniwersalne, specjalistyczne do różnych warunków pogodowych). Uczestnicy poznają narzędzia do smarowania, m.in. żelazka, skrobaki, szczotki i pady polerujące. Techniki smarowania obejmują przygotowanie nart (czyszczenie, usuwanie starego smaru), nakładanie smaru (rozprowadzanie za pomocą żelazka) oraz usuwanie nadmiaru smaru i polerowanie, by uzyskać gładką powierzchnię. Ważny element to również bezpieczeństwo przy pracy z gorącymi narzędziami i chemikaliami.'
                                        )
                                    }
                                >
                                    Przejdź dalej
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="image/sprzedaz4.jpg" style={{ height: '660px' }} alt="Third slide" />
                            <Carousel.Caption>
                                <h3>Szkolenie sprzedażowe</h3>
                                <p>Sprzedaż to kluczowy proces w każdej firmie. Najważniejsze, aby handlowiec był świadomy, że jest szefem własnej firmy. Na nim spoczywa pełna odpowiedzialność za relacje Firma-Klient.</p>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        openModal(
                                            'Szkolenie sprzedażowe',
                                            'Szkolenie sprzedażowe to specjalistyczny program edukacyjny, który rozwija umiejętności sprzedażowe uczestników. Celem jest zwiększenie efektywności pracy handlowców, poprawa wyników sprzedaży oraz budowanie długotrwałych relacji z klientami. Omawiane są m.in. podstawy sprzedaży, znaczenie sprzedaży, różne techniki i strategie sprzedażowe.'
                                        )
                                    }
                                >
                                    Przejdź dalej
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col md={2}>
                    <Card className="mb-3">
                        <Card.Header>Informacje o szkoleniach</Card.Header>
                        <Card.Body>
                            <p>Nasze szkolenia prowadzone są przez doświadczonych instruktorów. Każde szkolenie obejmuje część teoretyczną i praktyczną. Uczestnicy otrzymują materiały szkoleniowe oraz certyfikat ukończenia.</p>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Kontakt</Card.Header>
                        <Card.Body>
                            <p>Masz pytania? Skontaktuj się z nami!</p>
                            <p><strong>Email:</strong> szkolenia@example.com</p>
                            <p><strong>Telefon:</strong> 123-456-789</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Container className="mt-5 mb-5">
                <h3>Zapisz się na szkolenie</h3>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Wprowadź swoje imię"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wprowadzić imię.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formSurname">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Wprowadź swoje nazwisko"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wprowadzić nazwisko.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Wprowadź swój email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wprowadzić email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    required
                                    type="tel"
                                    placeholder="Wprowadź swój numer telefonu"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wprowadzić numer telefonu.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formDate">
                                <Form.Label>Data szkolenia</Form.Label>
                                <DatePicker
                                    required
                                    selected={formData.trainingDate}
                                    onChange={(d: Date | null) => handleDateChange(d)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wybrać datę szkolenia.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTraining">
                                <Form.Label>Wybierz szkolenie</Form.Label>
                                <Form.Select
                                    required
                                    name="training"
                                    aria-label="Wybierz szkolenie"
                                    title="Wybierz szkolenie"
                                    value={formData.training}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Wybierz</option>
                                    <option value="Ostrzenie krawędzi">Ostrzenie krawędzi</option>
                                    <option value="Smarowanie nart">Smarowanie nart</option>
                                    <option value="Szkolenie sprzedażowe">Szkolenie sprzedażowe</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Proszę wybrać szkolenie.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-3">
                        Zapisz się
                    </Button>
                </Form>
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

