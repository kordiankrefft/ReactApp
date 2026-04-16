import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

interface AccountSettings {
    notifications: boolean;
    publicProfile: boolean;
    rememberMe: boolean;
}

export const Account: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);
    const [settings, setSettings] = useState<AccountSettings>({
        notifications: false,
        publicProfile: false,
        rememberMe: false,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setShowError(true);
            setShowSuccess(false);
        } else {
            event.preventDefault();
            setShowSuccess(true);
            setShowError(false);
        }
        setValidated(true);
    };

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = e.target;
        setSettings({
            ...settings,
            [name]: checked,
        });
    };

    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={12} md={6}>
                    <h3>Konto</h3>
                    <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Adres email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Wprowadź adres email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić poprawny adres email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Wprowadź hasło"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić hasło.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Zaloguj się
                        </Button>
                        {showSuccess && (
                            <Alert variant="success" className="mt-3">
                                Zalogowano pomyślnie!
                            </Alert>
                        )}
                        {showError && (
                            <Alert variant="danger" className="mt-3">
                                Proszę sprawdzić wprowadzone dane.
                            </Alert>
                        )}
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    <h3>Ustawienia</h3>
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="formNotifications">
                            <Form.Check
                                type="checkbox"
                                label="Chcę otrzymywać powiadomienia"
                                name="notifications"
                                checked={settings.notifications}
                                onChange={handleSettingsChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPublicProfile">
                            <Form.Check
                                type="checkbox"
                                label="Chcę, aby mój profil był widoczny publicznie"
                                name="publicProfile"
                                checked={settings.publicProfile}
                                onChange={handleSettingsChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRememberMe">
                            <Form.Check
                                type="checkbox"
                                label="Zapamiętaj mnie"
                                name="rememberMe"
                                checked={settings.rememberMe}
                                onChange={handleSettingsChange}
                            />
                        </Form.Group>
                        <Button variant="primary">Zapisz ustawienia</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

