import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Row, Col, Table, Form, Button, Modal, Card } from 'react-bootstrap';

interface Product {
    code: string;
    name: string;
    category: string;
    pkwiu: string;
    price: string;
}

const initialProducts: Product[] = [
    { code: '12', name: 'Head BOA', category: 'Obuwie', pkwiu: '111', price: '989.00' },
    { code: '05', name: 'Kurtka ocieplana', category: 'Odzież', pkwiu: '222', price: '460.00' },
    { code: '76', name: 'Gogle', category: 'Akcesoria', pkwiu: '333', price: '760.00' },
    { code: '34', name: 'Deska snowboardowa', category: 'Sprzęt', pkwiu: '333', price: '1200.00' },
    { code: '01', name: 'Narty Rossignol', category: 'Sprzęt', pkwiu: '111', price: '2000.00' },
    { code: '02', name: 'Buty narciarskie Salomon', category: 'Obuwie', pkwiu: '112', price: '1200.00' },
    { code: '03', name: 'Kask Uvex', category: 'Akcesoria', pkwiu: '113', price: '300.00' },
    { code: '04', name: 'Kurtka narciarska The North Face', category: 'Odzież', pkwiu: '114', price: '800.00' },
    { code: '06', name: 'Rekawice narciarskie Reusch', category: 'Akcesoria', pkwiu: '115', price: '150.00' },
    { code: '07', name: 'Spodnie narciarskie Columbia', category: 'Odzież', pkwiu: '116', price: '600.00' },
    { code: '08', name: 'Gogle Oakley', category: 'Akcesoria', pkwiu: '117', price: '500.00' },
    { code: '09', name: 'Kijki Leki', category: 'Sprzęt', pkwiu: '118', price: '250.00' },
    { code: '10', name: 'Buty snowboardowe Burton', category: 'Obuwie', pkwiu: '119', price: '1000.00' },
    { code: '11', name: 'Deska snowboardowa Lib Tech', category: 'Sprzęt', pkwiu: '120', price: '1800.00' },
    { code: '13', name: 'Narty Atomic', category: 'Sprzęt', pkwiu: '121', price: '2100.00' },
    { code: '14', name: 'Bielizna termoaktywna Brubeck', category: 'Odzież', pkwiu: '122', price: '150.00' },
    { code: '15', name: 'Kask Giro', category: 'Akcesoria', pkwiu: '123', price: '350.00' },
    { code: '16', name: 'Buty narciarskie Fischer', category: 'Obuwie', pkwiu: '124', price: '1300.00' },
    { code: '17', name: 'Gogle Smith', category: 'Akcesoria', pkwiu: '125', price: '450.00' },
    { code: '18', name: 'Kask narciarski Atomic', category: 'Akcesoria', pkwiu: '126', price: '320.00' },
    { code: '19', name: 'Rekawice narciarskie Hestra', category: 'Akcesoria', pkwiu: '127', price: '200.00' },
    { code: '20', name: 'Spodnie narciarskie Salomon', category: 'Odzież', pkwiu: '128', price: '700.00' }
];

interface ProductReportFilter {
    name: string;
    priceFrom: string;
    priceTo: string;
    category: string;
}

export const ProductReports: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [filter, setFilter] = useState<ProductReportFilter>({
        name: '',
        priceFrom: '',
        priceTo: '',
        category: ''
    });
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const openEdit = (product: Product): void => {
        setCurrentProduct(product);
        setShowEditModal(true);
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        if (currentProduct) {
            setCurrentProduct({ ...currentProduct, [name]: value });
        }
    };

    const saveEdit = (): void => {
        if (currentProduct) {
            setProducts((prev) => prev.map((p) => (p.code === currentProduct.code ? currentProduct : p)));
            setFilteredProducts((prev) => prev.map((p) => (p.code === currentProduct.code ? currentProduct : p)));
            setShowEditModal(false);
        }
    };

    const applyFilter = (): void => {
        setFilteredProducts(
            products.filter((product) => {
                const nameOk =
                    filter.name === '' ||
                    product.name.toLowerCase().includes(filter.name.toLowerCase());
                const fromOk =
                    filter.priceFrom === '' ||
                    parseFloat(product.price) >= parseFloat(filter.priceFrom);
                const toOk =
                    filter.priceTo === '' ||
                    parseFloat(product.price) <= parseFloat(filter.priceTo);
                const categoryOk =
                    filter.category === '' || product.category === filter.category;
                return nameOk && fromOk && toOk && categoryOk;
            })
        );
    };

    const totalValue = filteredProducts.reduce((sum, product) => sum + Number(product.price), 0);
    const totalProducts = filteredProducts.length;

    const pieData = {
        labels: ['Obuwie', 'Odzież', 'Akcesoria', 'Sprzęt'],
        datasets: [
            {
                data: [
                    filteredProducts.filter((p) => p.category === 'Obuwie').length,
                    filteredProducts.filter((p) => p.category === 'Odzież').length,
                    filteredProducts.filter((p) => p.category === 'Akcesoria').length,
                    filteredProducts.filter((p) => p.category === 'Sprzęt').length,
                ],
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                hoverBackgroundColor: ['#0056b3', '#218838', '#e0a800', '#c82333'],
            },
        ],
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h3>Raporty towarów</h3>
                    <Form className="mt-3">
                        <Row>
                            <Col md={3} className="mb-3">
                                <Form.Label>Nazwa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={filter.name}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                            <Col md={3} className="mb-3">
                                <Form.Label>Cena od</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="priceFrom"
                                    value={filter.priceFrom}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                            <Col md={3} className="mb-3">
                                <Form.Label>Cena do</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="priceTo"
                                    value={filter.priceTo}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                            <Col md={3} className="mb-3">
                                <Form.Label>Kategorie</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={filter.category}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Wszystkie</option>
                                    <option value="Obuwie">Obuwie</option>
                                    <option value="Odzież">Odzież</option>
                                    <option value="Akcesoria">Akcesoria</option>
                                    <option value="Sprzęt">Sprzęt</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={applyFilter}>
                            Filtruj
                        </Button>
                    </Form>
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Kod</th>
                                <th>Nazwa</th>
                                <th>Kategoria</th>
                                <th>PKWiU</th>
                                <th>Cena</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.code}>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.pkwiu}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => openEdit(product)}
                                        >
                                            Edytuj
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Podsumowanie</Card.Title>
                            <Card.Text>
                                <strong>Całkowita wartość towarów:</strong> {totalValue.toFixed(2)} PLN
                                <br />
                                <strong>Liczba towarów:</strong> {totalProducts}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <div style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }}>
                        <Pie data={pieData} />
                    </div>
                </Col>
            </Row>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj towar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProduct && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Kod</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    value={currentProduct.code}
                                    onChange={handleEditChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={currentProduct.name}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kategoria</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={currentProduct.category}
                                    onChange={handleEditChange}
                                >
                                    <option value="Obuwie">Obuwie</option>
                                    <option value="Odzież">Odzież</option>
                                    <option value="Akcesoria">Akcesoria</option>
                                    <option value="Sprzęt">Sprzęt</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>PKWiU</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pkwiu"
                                    value={currentProduct.pkwiu}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cena</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Anuluj
                    </Button>
                    <Button variant="primary" onClick={saveEdit}>
                        Zapisz zmiany
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

