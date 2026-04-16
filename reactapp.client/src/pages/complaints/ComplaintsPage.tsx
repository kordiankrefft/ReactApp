import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

interface Complaint {
    id: number;
    product: string;
    reason: string;
    date: string;
    status: string;
}

export const Complaints: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([
        { id: 1, product: 'Produkt 1', reason: 'Uszkodzony', date: '2024-01-10', status: 'Oczekuje' },
        { id: 2, product: 'Produkt 2', reason: 'Nie spełnia oczekiwań', date: '2024-01-15', status: 'Zatwierdzony' },
        { id: 3, product: 'Produkt 3', reason: 'Zamówiono zły rozmiar', date: '2024-01-20', status: 'Odrzucony' },
        { id: 4, product: 'Produkt 4', reason: 'Niepasujący kolor', date: '2024-02-01', status: 'Oczekuje' },
        { id: 5, product: 'Produkt 5', reason: 'Inny powód', date: '2024-02-05', status: 'Oczekuje' },
        { id: 6, product: 'Produkt 6', reason: 'Uszkodzony', date: '2024-02-10', status: 'Zatwierdzony' },
        { id: 7, product: 'Produkt 7', reason: 'Nie spełnia oczekiwań', date: '2024-02-15', status: 'Odrzucony' },
        { id: 8, product: 'Produkt 8', reason: 'Zamówiono zły rozmiar', date: '2024-02-20', status: 'Oczekuje' },
    ]);

    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const openDetails = (complaint: Complaint): void => {
        setSelectedComplaint(complaint);
        setIsEditing(false);
        setShowDetailModal(true);
    };

    const closeDetails = (): void => setShowDetailModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (!selectedComplaint) return;
        setSelectedComplaint({ ...selectedComplaint, [name]: value });
    };

    const save = (): void => {
        if (!selectedComplaint) return;
        setComplaints((prev) =>
            prev.map((c) => (c.id === selectedComplaint.id ? selectedComplaint : c))
        );
        setIsEditing(false);
        setShowDetailModal(false);
    };

    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={12}>
                    <h3>Reklamacje</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produkt</th>
                                <th>Powód</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td>{complaint.id}</td>
                                    <td>{complaint.product}</td>
                                    <td>{complaint.reason}</td>
                                    <td>{complaint.date}</td>
                                    <td>{complaint.status}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => openDetails(complaint)}>
                                            Szczegóły
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showDetailModal} onHide={closeDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Szczegóły Reklamacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <div>
                            {isEditing ? (
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Produkt</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="product"
                                            value={selectedComplaint.product}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Powód</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="reason"
                                            value={selectedComplaint.reason}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={selectedComplaint.date}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="status"
                                            value={selectedComplaint.status}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Form>
                            ) : (
                                <>
                                    <p><strong>ID:</strong> {selectedComplaint.id}</p>
                                    <p><strong>Produkt:</strong> {selectedComplaint.product}</p>
                                    <p><strong>Powód:</strong> {selectedComplaint.reason}</p>
                                    <p><strong>Data:</strong> {selectedComplaint.date}</p>
                                    <p><strong>Status:</strong> {selectedComplaint.status}</p>
                                </>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? (
                        <>
                            <Button variant="primary" onClick={save}>
                                Zapisz
                            </Button>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Anuluj
                            </Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>
                            Edytuj
                        </Button>
                    )}
                    <Button variant="secondary" onClick={closeDetails}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

