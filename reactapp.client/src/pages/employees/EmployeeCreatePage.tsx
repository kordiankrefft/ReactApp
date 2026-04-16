import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface EmployeeFormData {
    firstName: string;
    lastName: string;
    unit: string;
    address: string;
    phone: string;
    jobTitle: string;
    email: string;
    dateOfBirth: string;
    nationalId: string;
}

export const EmployeeCreate: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [formData, setFormData] = useState<EmployeeFormData>({
        firstName: '',
        lastName: '',
        unit: '',
        address: '',
        phone: '',
        jobTitle: '',
        email: '',
        dateOfBirth: '',
        nationalId: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        watch,
    } = useForm<EmployeeFormData>({
        defaultValues: formData,
        mode: 'onSubmit',
    });

    const onValid = (data: EmployeeFormData) => {
        setFormData(data);
        setShowSuccess(true);
        setShowError(false);
    };

    const onInvalid = () => {
        setShowError(true);
        setShowSuccess(false);
    };

    return (
        <Container fluid>
            <h3 className="mb-3">Dodawanie pracownika</h3>
            <Form noValidate validated={isSubmitted} onSubmit={handleSubmit(onValid, onInvalid)}>
                <Row>
                    <Col className="mt-2 mb-3 float-end">
                        <Button variant="primary" type="submit">
                            Dodaj pracownika
                        </Button>
                    </Col>
                </Row>

                {showSuccess && (
                    <Alert variant="success">Pracownik został dodany pomyślnie!</Alert>
                )}
                {showError && (
                    <Alert variant="danger">
                        Wystąpił błąd podczas dodawania pracownika. Proszę sprawdzić wprowadzone dane.
                    </Alert>
                )}

                <Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={4} controlId="formFirstName">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Wprowadź imię"
                                isInvalid={Boolean(errors.firstName)}
                                {...register('firstName', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie imię pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formLastName">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Wprowadź nazwisko"
                                isInvalid={Boolean(errors.lastName)}
                                {...register('lastName', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie nazwisko pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formUnit">
                            <Form.Label>Jednostka organizacyjna</Form.Label>
                            <Form.Select
                                required
                                aria-label="Default select example"
                                isInvalid={Boolean(errors.unit)}
                                {...register('unit', { required: true })}
                            >
                                <option value="">Wybierz jednostkę</option>
                                <option value="A">Wydział A</option>
                                <option value="B">Wydział B</option>
                                <option value="C">Wydział C</option>
                                <option value="D">Wydział D</option>
                                <option value="E">Wydział E</option>
                                <option value="F">Wydział F</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Proszę wybrać jednostkę organizacyjną pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={4} controlId="formAddress">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Wprowadź adres"
                                isInvalid={Boolean(errors.address)}
                                {...register('address', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie adres pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formPhone">
                            <Form.Label>Numer telefonu</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                placeholder="Wprowadź numer telefonu"
                                isInvalid={Boolean(errors.phone)}
                                {...register('phone', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie numer telefonu pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formJobTitle">
                            <Form.Label>Stanowisko</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Wprowadź stanowisko"
                                isInvalid={Boolean(errors.jobTitle)}
                                {...register('jobTitle', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie stanowisko pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={4} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Wprowadź email"
                                isInvalid={Boolean(errors.email)}
                                {...register('email', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie adres email pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formDateOfBirth">
                            <Form.Label>Data urodzenia</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                isInvalid={Boolean(errors.dateOfBirth)}
                                {...register('dateOfBirth', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie datę urodzenia pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="formNationalId">
                            <Form.Label>PESEL</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Wprowadź PESEL"
                                isInvalid={Boolean(errors.nationalId)}
                                {...register('nationalId', { required: true })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawnie numer PESEL pracownika.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Zapisz
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Form>

            <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Szczegóły pracownika</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Imię:</strong> {watch('firstName')}{' '}
                        <strong>Nazwisko:</strong> {watch('lastName')}{' '}
                        <strong>Jednostka organizacyjna:</strong> {watch('unit')}{' '}
                        <strong>Adres:</strong> {watch('address')}{' '}
                        <strong>Numer telefonu:</strong> {watch('phone')}{' '}
                        <strong>Stanowisko:</strong> {watch('jobTitle')}{' '}
                        <strong>Email:</strong> {watch('email')}{' '}
                        <strong>Data urodzenia:</strong> {watch('dateOfBirth')}{' '}
                        <strong>PESEL:</strong> {watch('nationalId')}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccess(false)}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

