import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';

interface Invoice {
    id: number;
    approved: boolean | null;
    correction: boolean | null;
    number: string;
    date: string;
    deliveryDate: string;
    businessPartner: string;
    netAmount: number;
    vatAmount: number;
    grossAmount: number;
}

interface NewInvoice {
    approved: boolean;
    correction: boolean;
    number: string;
    date: string;
    deliveryDate: string;
    businessPartner: string;
    netAmount: number;
    vatAmount: number;
    grossAmount: number;
}

interface InvoiceFilters {
    periodFrom: string;
    periodTo: string;
    warehouse: string;
    businessPartner: string;
}

export const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: 1, approved: null, correction: null, number: 'FV/000026/21', date: '2024-04-01', deliveryDate: '2024-04-05', businessPartner: 'Firma A', netAmount: 1000, vatAmount: 230, grossAmount: 1230 },
        { id: 2, approved: null, correction: null, number: 'FV/000032/09', date: '2024-04-02', deliveryDate: '2024-04-06', businessPartner: 'Firma B', netAmount: 1500, vatAmount: 345, grossAmount: 1845 },
        { id: 3, approved: null, correction: null, number: 'FV/000052/14', date: '2024-04-03', deliveryDate: '2024-04-07', businessPartner: 'Firma C', netAmount: 1150, vatAmount: 276, grossAmount: 1476 },
        { id: 4, approved: null, correction: null, number: 'FV/000042/11', date: '2024-04-04', deliveryDate: '2024-04-08', businessPartner: 'Firma D', netAmount: 1750, vatAmount: 215, grossAmount: 1236 },
        { id: 5, approved: null, correction: null, number: 'FV/000022/07', date: '2024-04-05', deliveryDate: '2024-04-09', businessPartner: 'Firma E', netAmount: 1540, vatAmount: 432, grossAmount: 1513 },
        { id: 6, approved: null, correction: null, number: 'FV/000126/21', date: '2024-04-06', deliveryDate: '2024-04-10', businessPartner: 'Firma F', netAmount: 1650, vatAmount: 378, grossAmount: 2028 },
        { id: 7, approved: null, correction: null, number: 'FV/000232/09', date: '2024-04-07', deliveryDate: '2024-04-11', businessPartner: 'Firma G', netAmount: 1250, vatAmount: 287, grossAmount: 1537 },
        { id: 8, approved: null, correction: null, number: 'FV/000352/14', date: '2024-04-08', deliveryDate: '2024-04-12', businessPartner: 'Firma H', netAmount: 1350, vatAmount: 326, grossAmount: 1676 },
        { id: 9, approved: null, correction: null, number: 'FV/000442/11', date: '2024-04-09', deliveryDate: '2024-04-13', businessPartner: 'Firma I', netAmount: 1850, vatAmount: 215, grossAmount: 1236 },
        { id: 10, approved: null, correction: null, number: 'FV/000522/07', date: '2024-04-10', deliveryDate: '2024-04-14', businessPartner: 'Firma J', netAmount: 1640, vatAmount: 432, grossAmount: 2072 },
    ]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [newInvoice, setNewInvoice] = useState<NewInvoice>({
        approved: false,
        correction: false,
        number: '',
        date: '',
        deliveryDate: '',
        businessPartner: '',
        netAmount: 0,
        vatAmount: 0,
        grossAmount: 0,
    });
    const [deleteInvoiceId, setDeleteInvoiceId] = useState<string>('');
    const [validated, setValidated] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const [filters, setFilters] = useState<InvoiceFilters>({
        periodFrom: '',
        periodTo: '',
        warehouse: '',
        businessPartner: '',
    });

    const openDetails = (invoice: Invoice): void => {
        setSelectedInvoice(invoice);
        setShowDetailModal(true);
    };

    const closeDetails = (): void => setShowDetailModal(false);

    const addInvoice: React.FormEventHandler<HTMLFormElement> = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setShowError(true);
        } else {
            e.preventDefault();
            const newId = invoices.length + 1;
            const invoiceToAdd: Invoice = { id: newId, ...newInvoice };
            setInvoices([...invoices, invoiceToAdd]);
            setFilteredInvoices([...invoices, invoiceToAdd]);
            setShowSuccess(true);
            setShowError(false);
            setNewInvoice({
                approved: false,
                correction: false,
                number: '',
                date: '',
                deliveryDate: '',
                businessPartner: '',
                netAmount: 0,
                vatAmount: 0,
                grossAmount: 0,
            });
        }
        setValidated(true);
    };

    const handleNewInvoiceInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNewInvoice({ ...newInvoice, [name]: value });
    };

    const handleFilterInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const deleteInvoice = (): void => {
        const idToDelete = parseInt(deleteInvoiceId);
        setInvoices(invoices.filter((invoice) => invoice.id !== idToDelete));
        setFilteredInvoices(filteredInvoices.filter((invoice) => invoice.id !== idToDelete));
        setDeleteInvoiceId('');
    };

    const applyFilter = (): void => {
        let filtered = invoices;
        if (filters.periodFrom) {
            filtered = filtered.filter((invoice) => invoice.date >= filters.periodFrom);
        }
        if (filters.periodTo) {
            filtered = filtered.filter((invoice) => invoice.date <= filters.periodTo);
        }
        if (filters.businessPartner) {
            filtered = filtered.filter((invoice) => invoice.businessPartner === filters.businessPartner);
        }
        setFilteredInvoices(filtered);
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h3>Faktury sprzedaży</h3>
                    <Tabs defaultActiveKey="list" className="mb-3">
                        <Tab eventKey="list" title="Lista faktur">
                            <Form className="mb-3">
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Form.Label>Okres od</Form.Label>
                                        <Form.Control type="date" name="periodFrom" onChange={handleFilterInputChange} />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label>Okres do</Form.Label>
                                        <Form.Control type="date" name="periodTo" onChange={handleFilterInputChange} />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Group controlId="invoiceFilterBusinessPartner">
                                            <Form.Label>Kontrahent</Form.Label>
                                            <Form.Select
                                                name="businessPartner"
                                                aria-label="Kontrahent"
                                                title="Kontrahent"
                                                onChange={handleFilterSelectChange}
                                            >
                                                <option value="">Wybierz kontrahenta</option>
                                                <option value="Firma A">Firma A</option>
                                                <option value="Firma B">Firma B</option>
                                                <option value="Firma C">Firma C</option>
                                                <option value="Firma D">Firma D</option>
                                                <option value="Firma E">Firma E</option>
                                                <option value="Firma F">Firma F</option>
                                                <option value="Firma G">Firma G</option>
                                                <option value="Firma H">Firma H</option>
                                                <option value="Firma I">Firma I</option>
                                                <option value="Firma J">Firma J</option>
                                                <option value="Firma K">Firma K</option>
                                                <option value="Firma L">Firma L</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={applyFilter}>
                                    Filtruj
                                </Button>
                            </Form>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Zatwierdź</th>
                                        <th>Korekta</th>
                                        <th>Numer</th>
                                        <th>Data</th>
                                        <th>Data dostawy</th>
                                        <th>Kontrahent</th>
                                        <th>Netto</th>
                                        <th>VAT</th>
                                        <th>Wartość</th>
                                        <th>Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td>
                                                <Form.Check type="checkbox" checked={invoice.approved || false} readOnly />
                                            </td>
                                            <td>
                                                <Form.Check type="checkbox" checked={invoice.correction || false} readOnly />
                                            </td>
                                            <td>{invoice.number}</td>
                                            <td>{invoice.date}</td>
                                            <td>{invoice.deliveryDate}</td>
                                            <td>{invoice.businessPartner}</td>
                                            <td>{invoice.netAmount}</td>
                                            <td>{invoice.vatAmount}</td>
                                            <td>{invoice.grossAmount}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => openDetails(invoice)}>
                                                    Szczegóły
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Tab>

                        <Tab eventKey="add" title="Dodaj fakturę">
                            {showSuccess && <Alert variant="success">Faktura dodana pomyślnie!</Alert>}
                            {showError && <Alert variant="danger">Proszę poprawić błędy w formularzu.</Alert>}
                            <Form noValidate validated={validated} onSubmit={addInvoice}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Numer</Form.Label>
                                        <Form.Control required type="text" name="number" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić numer faktury.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control required type="date" name="date" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić datę.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Data dostawy</Form.Label>
                                        <Form.Control required type="date" name="deliveryDate" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić datę dostawy.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Kontrahent</Form.Label>
                                        <Form.Control required type="text" name="businessPartner" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić kontrahenta.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Form.Label>Netto</Form.Label>
                                        <Form.Control required type="number" name="netAmount" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić kwotę netto.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label>VAT</Form.Label>
                                        <Form.Control required type="number" name="vatAmount" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić VAT.
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label>Wartość</Form.Label>
                                        <Form.Control required type="number" name="grossAmount" onChange={handleNewInvoiceInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić wartość.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Zatwierdzona"
                                            name="approved"
                                            onChange={(e) => setNewInvoice({ ...newInvoice, approved: e.target.checked })}
                                        />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Korekta"
                                            name="correction"
                                            onChange={(e) => setNewInvoice({ ...newInvoice, correction: e.target.checked })}
                                        />
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Dodaj fakturę
                                </Button>
                            </Form>
                        </Tab>

                        <Tab eventKey="delete" title="Usuń fakturę">
                            <Form>
                                <Row>
                                    <Col md={12} className="mb-3">
                                        <Form.Label>Wybierz numer faktury do usunięcia</Form.Label>
                                        <Form.Select
                                            aria-label="Wybierz fakturę"
                                            title="Wybierz fakturę"
                                            value={deleteInvoiceId}
                                            onChange={(e) => setDeleteInvoiceId(e.target.value)}
                                        >
                                            <option value="">Wybierz fakturę</option>
                                            {invoices.map((invoice) => (
                                                <option key={invoice.id} value={invoice.id}>
                                                    {invoice.number}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Button variant="danger" onClick={deleteInvoice}>
                                    Usuń fakturę
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

            <Modal show={showDetailModal} onHide={closeDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Szczegóły Faktury</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvoice && (
                        <div>
                            <p>
                                <strong>Numer:</strong> {selectedInvoice.number}
                            </p>
                            <p>
                                <strong>Data:</strong> {selectedInvoice.date}
                            </p>
                            <p>
                                <strong>Data Dostawy:</strong> {selectedInvoice.deliveryDate}
                            </p>
                            <p>
                                <strong>Kontrahent:</strong> {selectedInvoice.businessPartner}
                            </p>
                            <p>
                                <strong>Netto:</strong> {selectedInvoice.netAmount}
                            </p>
                            <p>
                                <strong>VAT:</strong> {selectedInvoice.vatAmount}
                            </p>
                            <p>
                                <strong>Wartość:</strong> {selectedInvoice.grossAmount}
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDetails}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

