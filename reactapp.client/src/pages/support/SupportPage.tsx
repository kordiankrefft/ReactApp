import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface ContactDetails {
    address: string;
    email: string;
    phone: string;
}

export const Support: React.FC = () => {
    const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
    const [isEditingReturns, setIsEditingReturns] = useState<boolean>(false);

    const [contactDetails, setContactDetails] = useState<ContactDetails>({
        address: '74-572 Suwałki, ul. Szara 32',
        email: 'contact@skiingclub.com',
        phone: '+123 456 7890',
    });

    const [returnDetails, setReturnDetails] = useState<ContactDetails>({
        address: '98-400 Wrocław, ul. Biała 10',
        email: 'returns@skiingclub.com',
        phone: '+123 456 7895',
    });

    const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setContactDetails({ ...contactDetails, [name]: value });
    };

    const handleReturnInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setReturnDetails({ ...returnDetails, [name]: value });
    };

    const toggleEditContact = (): void => {
        setIsEditingContact(!isEditingContact);
    };

    const toggleEditReturns = (): void => {
        setIsEditingReturns(!isEditingReturns);
    };

    const saveContact = (): void => {
        setIsEditingContact(false);
    };

    const saveReturns = (): void => {
        setIsEditingReturns(false);
    };

    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={12} md={6}>
                    <div className="mt-3" style={{ textAlign: 'left' }}>
                        <h3>Dane kontaktowe</h3>
                        {!isEditingContact ? (
                            <>
                                <p style={{ marginTop: '20px' }}>{contactDetails.address}</p>
                                <p>{contactDetails.email}</p>
                                <p>{contactDetails.phone}</p>
                                <Button variant="primary" onClick={toggleEditContact}>
                                    Edytuj
                                </Button>
                            </>
                        ) : (
                            <Form>
                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={contactDetails.address}
                                        onChange={handleContactInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={contactDetails.email}
                                        onChange={handleContactInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={contactDetails.phone}
                                        onChange={handleContactInputChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={saveContact}>
                                    Zapisz
                                </Button>
                                <Button variant="secondary" onClick={toggleEditContact} className="ms-2">
                                    Anuluj
                                </Button>
                            </Form>
                        )}
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="mt-3" style={{ textAlign: 'left' }}>
                        <h3>Dane do zwrotów</h3>
                        {!isEditingReturns ? (
                            <>
                                <p style={{ marginTop: '20px' }}>{returnDetails.address}</p>
                                <p>{returnDetails.email}</p>
                                <p>{returnDetails.phone}</p>
                                <Button variant="primary" onClick={toggleEditReturns}>
                                    Edytuj
                                </Button>
                            </>
                        ) : (
                            <Form>
                                <Form.Group className="mb-3" controlId="formReturnAddress">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={returnDetails.address}
                                        onChange={handleReturnInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formReturnEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={returnDetails.email}
                                        onChange={handleReturnInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formReturnPhone">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={returnDetails.phone}
                                        onChange={handleReturnInputChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={saveReturns}>
                                    Zapisz
                                </Button>
                                <Button variant="secondary" onClick={toggleEditReturns} className="ms-2">
                                    Anuluj
                                </Button>
                            </Form>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

