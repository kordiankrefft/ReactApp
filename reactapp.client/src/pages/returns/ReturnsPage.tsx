import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

interface ReturnRequest {
    id: number;
    product: string;
    reason: string;
    date: string;
    status: string;
}

export const Returns: React.FC = () => {
    const [returns, setReturns] = useState<ReturnRequest[]>([
        { id: 1, product: 'Buty U42', reason: 'Uszkodzony', date: '2024-01-10', status: 'Oczekuje' },
        { id: 2, product: 'Kurtka B23', reason: 'Nie spełnia oczekiwań', date: '2024-01-15', status: 'Zatwierdzony' },
        { id: 3, product: 'Gogle T31', reason: 'Zamówiono zły rozmiar', date: '2024-01-20', status: 'Odrzucony' },
        { id: 4, product: 'Rękawice T75', reason: 'Niepasujący kolor', date: '2024-02-01', status: 'Oczekuje' },
        { id: 5, product: 'Buty J62', reason: 'Inny powód', date: '2024-02-05', status: 'Oczekuje' },
        { id: 6, product: 'Spodnie H21', reason: 'Uszkodzony', date: '2024-02-10', status: 'Zatwierdzony' },
        { id: 7, product: 'Kask D32', reason: 'Nie spełnia oczekiwań', date: '2024-02-15', status: 'Odrzucony' },
        { id: 8, product: 'Czapka F44', reason: 'Zamówiono zły rozmiar', date: '2024-02-20', status: 'Oczekuje' },
    ]);

    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const openDetails = (item: ReturnRequest): void => {
        setSelectedReturn(item);
        setIsEditing(false);
        setShowDetailModal(true);
    };

    const closeDetails = (): void => {
        setShowDetailModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (selectedReturn) {
            setSelectedReturn({ ...selectedReturn, [name]: value });
        }
    };

    const save = (): void => {
        if (selectedReturn) {
            setReturns((prev) => prev.map((r) => (r.id === selectedReturn.id ? selectedReturn : r)));
            setIsEditing(false);
            setShowDetailModal(false);
        }
    };

    return (
        <Container fluid className="my-5">
            <Row>
                <Col xs={12}>
                    <h3>Zwroty</h3>
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
                            {returns.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.product}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => openDetails(item)}>
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
                    <Modal.Title>Szczegóły Zwrotu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReturn && (
                        <div>
                            {isEditing ? (
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Produkt</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="product"
                                            value={selectedReturn.product}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Powód</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="reason"
                                            value={selectedReturn.reason}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={selectedReturn.date}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="status"
                                            value={selectedReturn.status}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Form>
                            ) : (
                                <>
                                    <p><strong>ID:</strong> {selectedReturn.id}</p>
                                    <p><strong>Produkt:</strong> {selectedReturn.product}</p>
                                    <p><strong>Powód:</strong> {selectedReturn.reason}</p>
                                    <p><strong>Data:</strong> {selectedReturn.date}</p>
                                    <p><strong>Status:</strong> {selectedReturn.status}</p>
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

