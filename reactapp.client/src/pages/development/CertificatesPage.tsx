import React, { useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from 'react-bootstrap';

interface Certificate {
    id: number;
    name: string;
    date: string;
    description: string;
    issuer: string;
    image: string;
}

export const Certificates: React.FC = () => {
    const [certificates] = useState<Certificate[]>([
        { id: 1, name: 'Certyfikat: Smarowanie nart', date: '2024-01-10', description: 'Certyfikat za profesjonalne smarowanie nart i desek snowboardowych, używając najlepszej jakości wosków.', issuer: 'Organizacja A', image: 'image/smarowanie.jpg' },
        { id: 2, name: 'Certyfikat: Ostrzenie krawędzi', date: '2024-02-15', description: 'Certyfikat za profesjonalne ostrzenie krawędzi w deskach snowboardowych oraz nartach zjazdowych.', issuer: 'Organizacja B', image: 'image/ostrzenie.jpg' },
        { id: 3, name: 'Certyfikat: Szkolenie podopiecznych', date: '2024-03-20', description: 'Certyfikat za profesjonalną naukę oraz przygotowanie młodszych osób do jazdy rekreacyjnej.', issuer: 'Organizacja C', image: 'image/nauka.jpg' },
    ]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    const openModal = (certificate: Certificate): void => {
        setSelectedCertificate(certificate);
        setShowModal(true);
    };

    const closeModal = (): void => setShowModal(false);

    return (
        <Container fluid className="my-5">
            <h3>Certyfikaty</h3>
            <Row>
                {certificates.map((certificate) => (
                    <Col key={certificate.id} xs={12} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={certificate.image} style={{ width: '100%', height: 'auto' }} />
                            <Card.Body>
                                <Card.Title>{certificate.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{certificate.date}</Card.Subtitle>
                                <Card.Text>{certificate.description}</Card.Text>
                                <Button variant="primary" onClick={() => openModal(certificate)}>
                                    Szczegóły
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Szczegóły Certyfikatu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCertificate && (
                        <div>
                            <Image src={selectedCertificate.image} fluid className="mb-3" />
                            <p><strong>Nazwa:</strong> {selectedCertificate.name}</p>
                            <p><strong>Data:</strong> {selectedCertificate.date}</p>
                            <p><strong>Opis:</strong> {selectedCertificate.description}</p>
                            <p><strong>Wydawca:</strong> {selectedCertificate.issuer}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

