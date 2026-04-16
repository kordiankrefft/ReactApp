import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap';

interface ProductDetailItem {
    key: string;
    value: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    details: ProductDetailItem[];
}

export const ProductDetails: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Buty T42',
            description: 'Buty narciarskie firmy Salomon, wodoodporność 1000.',
            price: '1199.99 PLN',
            image: 'image/buty.jpg',
            details: [
                { key: 'Waga', value: '2,5 kg' },
                { key: 'Wymiary', value: '10x20x30 cm' },
                { key: 'Kolor', value: 'Biały' },
                { key: 'Producent', value: 'Salomon' },
            ],
        },
        {
            id: 2,
            name: 'Buty H64',
            description: 'Buty narciarskie firmy Dalbello, wodoodporność 1200.',
            price: '1399.99 PLN',
            image: 'image/buty2.jpg',
            details: [
                { key: 'Waga', value: '3 kg' },
                { key: 'Wymiary', value: '20x30x40 cm' },
                { key: 'Kolor', value: 'Czarny' },
                { key: 'Producent', value: 'Dalbello' },
            ],
        },
        {
            id: 3,
            name: 'Kurtka G56',
            description: 'Kurtka narciarska firmy Phenix. Wodoodporność 1000, wiatroszczelność 500.',
            price: '699.99 PLN',
            image: 'image/kurtka.jpg',
            details: [
                { key: 'Waga', value: '0,5 kg' },
                { key: 'Wymiary', value: '30x50x70 cm' },
                { key: 'Kolor', value: 'Czarny' },
                { key: 'Producent', value: 'Phenix' },
            ],
        },
        {
            id: 4,
            name: 'Rękawice J12',
            description: 'Rękawice narciarskie ocieplane firmy Reusch. Wodoodporność 800.',
            price: '399.99 PLN',
            image: 'image/rekawice.jpg',
            details: [
                { key: 'Waga', value: '0,2 kg' },
                { key: 'Wymiary', value: '3x15x25 cm' },
                { key: 'Kolor', value: 'Czarny' },
                { key: 'Producent', value: 'Reusch' },
            ],
        },
    ]);

    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    const handleProductFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        productId: number
    ): void => {
        const { name, value } = e.target;
        setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, [name]: value } : p))
        );
    };

    const handleDetailValueChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        productId: number,
        detailIndex: number
    ): void => {
        const { value } = e.target;
        setProducts((prev) =>
            prev.map((p) =>
                p.id === productId
                    ? {
                        ...p,
                        details: p.details.map((d, idx) =>
                            idx === detailIndex ? { ...d, value } : d
                        ),
                    }
                    : p
            )
        );
    };

    return (
        <Container className="my-5">
            {products.map((product) => (
                <Row key={product.id} className="mb-5">
                    <Col xs={12} md={6}>
                        <Image src={product.image} fluid />
                    </Col>
                    <Col xs={12} md={6}>
                        {editingProductId === product.id ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nazwa Produktu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={(e) => handleProductFieldChange(e, product.id)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={product.description}
                                        onChange={(e) => handleProductFieldChange(e, product.id)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cena</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={(e) => handleProductFieldChange(e, product.id)}
                                    />
                                </Form.Group>
                                <ListGroup variant="flush">
                                    {product.details.map((detail, index) => (
                                        <ListGroup.Item key={index}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{detail.key}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={detail.value}
                                                    onChange={(e) =>
                                                        handleDetailValueChange(e, product.id, index)
                                                    }
                                                />
                                            </Form.Group>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button variant="primary" onClick={() => setEditingProductId(null)}>
                                    Zapisz
                                </Button>
                                <Button variant="secondary" onClick={() => setEditingProductId(null)} className="ms-2">
                                    Anuluj
                                </Button>
                            </>
                        ) : (
                            <>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <h4>Cena: {product.price}</h4>
                                <ListGroup variant="flush">
                                    {product.details.map((detail, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>{detail.key}:</strong> {detail.value}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button
                                    variant="primary"
                                    className="mt-3"
                                    onClick={() => setEditingProductId(product.id)}
                                >
                                    Edytuj
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

