import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';

interface BusinessPartner {
    code: string;
    name: string;
    taxId: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    tier: string;
}

export const BusinessPartners: React.FC = () => {
    const [partners, setPartners] = useState<BusinessPartner[]>([
        { code: 'K001', name: 'Firma A', taxId: '1234567890', address: 'ul. Przykładowa 1, 00-000 Warszawa', phone: '123-456-789', email: 'firmaA@example.com', tier: 'premium', logo: '' },
        { code: 'K002', name: 'Firma B', taxId: '0987654321', address: 'ul. Testowa 2, 11-111 Kraków', phone: '987-654-321', email: 'firmaB@example.com', tier: 'standard', logo: '' },
        { code: 'K003', name: 'Firma C', taxId: '1357924680', address: 'ul. Prosta 3, 22-222 Gdańsk', phone: '575-355-865', email: 'firmaC@example.com', tier: 'premium', logo: '' },
        { code: 'K004', name: 'Firma D', taxId: '2468013579', address: 'ul. Kwiatowa 4, 33-333 Poznań', phone: '674-134-644', email: 'firmaD@example.com', tier: 'standard', logo: '' },
        { code: 'K005', name: 'Firma E', taxId: '9876543210', address: 'ul. Piękna 5, 44-444 Wrocław', phone: '342-333-253', email: 'firmaE@example.com', tier: 'premium', logo: '' },
        { code: 'K006', name: 'Firma F', taxId: '1928374650', address: 'ul. Główna 6, 55-555 Łódź', phone: '267-232-222', email: 'firmaF@example.com', tier: 'standard', logo: '' },
        { code: 'K007', name: 'Firma G', taxId: '1029384756', address: 'ul. Poboczna 7, 66-666 Katowice', phone: '141-124-111', email: 'firmaG@example.com', tier: 'premium', logo: '' },
        { code: 'K008', name: 'Firma H', taxId: '5647382910', address: 'ul. Polna 8, 77-777 Bydgoszcz', phone: '240-673-030', email: 'firmaH@example.com', tier: 'standard', logo: '' },
        { code: 'K009', name: 'Firma I', taxId: '6574839201', address: 'ul. Parkowa 9, 88-888 Lublin', phone: '459-659-959', email: 'firmaI@example.com', tier: 'premium', logo: '' },
        { code: 'K010', name: 'Firma J', taxId: '7465920381', address: 'ul. Leśna 10, 99-999 Szczecin', phone: '748-858-758', email: 'firmaJ@example.com', tier: 'standard', logo: '' },
        { code: 'K011', name: 'Firma K', taxId: '6556839201', address: 'ul. Półowa 4, 88-888 Lublin', phone: '934-939-754', email: 'firmaK@example.com', tier: 'premium', logo: '' },
        { code: 'K012', name: 'Firma L', taxId: '7444920381', address: 'ul. Jasna 14, 99-999 Szczecin', phone: '432-467-488', email: 'firmaL@example.com', tier: 'standard', logo: '' },
    ]);

    const [filteredPartners, setFilteredPartners] = useState<BusinessPartner[]>(partners);
    const [filteredPartnersForDelete, setFilteredPartnersForDelete] = useState<BusinessPartner[]>(partners);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTermDelete, setSearchTermDelete] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPartner, setCurrentPartner] = useState<BusinessPartner | null>(null);
    const [newPartner, setNewPartner] = useState<BusinessPartner>({
        code: '',
        name: '',
        taxId: '',
        address: '',
        phone: '',
        email: '',
        logo: '',
        tier: 'standard',
    });
    const [validated, setValidated] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('partners');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredPartners(
            partners.filter((partner) =>
                partner.code.toLowerCase().includes(term) ||
                partner.name.toLowerCase().includes(term) ||
                partner.taxId.toLowerCase().includes(term) ||
                partner.address.toLowerCase().includes(term)
            )
        );
    };

    const handleSearchDelete = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const term = e.target.value.toLowerCase();
        setSearchTermDelete(term);
        setFilteredPartnersForDelete(
            partners.filter((partner) =>
                partner.code.toLowerCase().includes(term) ||
                partner.name.toLowerCase().includes(term) ||
                partner.taxId.toLowerCase().includes(term) ||
                partner.address.toLowerCase().includes(term)
            )
        );
    };

    const handleDelete = (code: string): void => {
        const next = partners.filter((partner) => partner.code !== code);
        setPartners(next);
        setFilteredPartners(next.filter((partner) =>
            partner.code.toLowerCase().includes(searchTerm) ||
            partner.name.toLowerCase().includes(searchTerm) ||
            partner.taxId.toLowerCase().includes(searchTerm) ||
            partner.address.toLowerCase().includes(searchTerm)
        ));
        setFilteredPartnersForDelete(next.filter((partner) =>
            partner.code.toLowerCase().includes(searchTermDelete) ||
            partner.name.toLowerCase().includes(searchTermDelete) ||
            partner.taxId.toLowerCase().includes(searchTermDelete) ||
            partner.address.toLowerCase().includes(searchTermDelete)
        ));
    };

    const openEdit = (partner: BusinessPartner): void => {
        setCurrentPartner(partner);
        setShowModal(true);
    };

    const saveEdit = (): void => {
        if (!currentPartner) return;
        const next = partners.map((p) => (p.code === currentPartner.code ? currentPartner : p));
        setPartners(next);
        setFilteredPartners(next);
        setFilteredPartnersForDelete(next);
        setShowModal(false);
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (!currentPartner) return;
        setCurrentPartner({ ...currentPartner, [name]: value });
    };

    const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNewPartner({ ...newPartner, [name]: value });
    };

    const handleAdd = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setShowError(true);
        } else {
            const next = [...partners, newPartner];
            setPartners(next);
            setFilteredPartners(next);
            setFilteredPartnersForDelete(next);
            setNewPartner({
                code: '',
                name: '',
                taxId: '',
                address: '',
                phone: '',
                email: '',
                logo: '',
                tier: 'standard',
            });
            setShowSuccess(true);
            setShowError(false);
            setActiveTab('partners');
        }
        setValidated(true);
    };

    const getBackgroundColor = (tier: string): string => {
        switch (tier) {
            case 'premium':
                return '#ffd700';
            case 'standard':
                return '#ffffff';
            default:
                return '#f8f9fa';
        }
    };

    return (
        <Container fluid>
            <h3>Kontrahenci</h3>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k as string)}
                id="business-partners-tabs"
                className="mb-3"
            >
                <Tab eventKey="partners" title="Kontrahenci">
                    <Form className="mb-3">
                        <Form.Group controlId="formSearch" className="me-2">
                            <Form.Label>Filtruj:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Wprowadź kod, nazwę, NIP lub adres"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="mb-2"
                            />
                        </Form.Group>
                    </Form>
                    <Row>
                        {filteredPartners.map((partner, index) => (
                            <Col key={index} md={4}>
                                <Card className="mb-3" style={{ backgroundColor: getBackgroundColor(partner.tier) }}>
                                    <Card.Header>
                                        <FaUserTie className="me-2" />
                                        {partner.name}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <strong>Kod:</strong> {partner.code}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>NIP:</strong> {partner.taxId}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Adres:</strong> {partner.address}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Telefon:</strong> {partner.phone}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Email:</strong> {partner.email}
                                        </Card.Text>
                                        <Button variant="warning" onClick={() => openEdit(partner)}>
                                            Edytuj
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Tab>

                <Tab eventKey="add" title="Dodaj kontrahenta">
                    {showSuccess && <Alert variant="success">Kontrahent dodany pomyślnie!</Alert>}
                    {showError && <Alert variant="danger">Proszę poprawić błędy w formularzu.</Alert>}
                    <Form noValidate validated={validated} onSubmit={handleAdd}>
                        <Form.Group className="mb-3" controlId="formCode">
                            <Form.Label>Kod</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="code"
                                value={newPartner.code}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź kod"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić kod.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nazwa</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                value={newPartner.name}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź nazwę"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić nazwę.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaxId">
                            <Form.Label>NIP</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="taxId"
                                value={newPartner.taxId}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź NIP"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić NIP.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="address"
                                value={newPartner.address}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź adres"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić adres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="phone"
                                value={newPartner.phone}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź telefon"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić telefon.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                value={newPartner.email}
                                onChange={handleNewInputChange}
                                placeholder="Wprowadź email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Proszę wprowadzić prawidłowy adres email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTier">
                            <Form.Label>Typ</Form.Label>
                            <Form.Select name="tier" value={newPartner.tier} onChange={(e) => setNewPartner({ ...newPartner, tier: e.target.value })}>
                                <option value="standard">Standard</option>
                                <option value="premium">Premium</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Form>
                </Tab>

                <Tab eventKey="delete" title="Usuń kontrahenta">
                    <Form className="mb-3">
                        <Form.Group controlId="formSearchDelete" className="me-2">
                            <Form.Label>Filtruj:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Wprowadź kod, nazwę, NIP lub adres"
                                value={searchTermDelete}
                                onChange={handleSearchDelete}
                                className="mb-2"
                            />
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Kod</th>
                                <th>Nazwa</th>
                                <th>NIP</th>
                                <th>Adres</th>
                                <th>Telefon</th>
                                <th>Email</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPartnersForDelete.map((partner, index) => (
                                <tr key={index}>
                                    <td>{partner.code}</td>
                                    <td>{partner.name}</td>
                                    <td>{partner.taxId}</td>
                                    <td>{partner.address}</td>
                                    <td>{partner.phone}</td>
                                    <td>{partner.email}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(partner.code)}>
                                            Usuń
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj kontrahenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPartner && (
                        <Form>
                            <Form.Group className="mb-3" controlId="editCode">
                                <Form.Label>Kod</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    value={currentPartner.code}
                                    onChange={handleEditInputChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editName">
                                <Form.Label>Nazwa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={currentPartner.name}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editTaxId">
                                <Form.Label>NIP</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="taxId"
                                    value={currentPartner.taxId}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editAddress">
                                <Form.Label>Adres</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={currentPartner.address}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editPhone">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={currentPartner.phone}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={currentPartner.email}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editTier">
                                <Form.Label>Typ</Form.Label>
                                <Form.Select
                                    name="tier"
                                    value={currentPartner.tier}
                                    onChange={(e) =>
                                        setCurrentPartner({ ...currentPartner, tier: e.target.value })
                                    }
                                >
                                    <option value="standard">Standard</option>
                                    <option value="premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Anuluj
                    </Button>
                    <Button variant="primary" onClick={saveEdit}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

