import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import type { ProductCategory } from '../../../types/product';
import { pl } from '../../../i18n/pl';
import type { ProductFilters } from '../../../hooks/useProducts';

interface ProductsFiltersProps {
    filters: ProductFilters;
    onChange: (name: keyof ProductFilters, value: string) => void;
    categories: ProductCategory[];
}

export function ProductsFilters({ filters, onChange, categories }: ProductsFiltersProps): JSX.Element {
    return (
        <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{pl.products.filtersTitle}</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Row>
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{pl.products.searchByName}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={pl.products.enterName}
                                        value={filters.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('name', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{pl.products.priceFrom}</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder={pl.common.select}
                                            value={filters.priceFrom}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('priceFrom', e.target.value)}
                                        />
                                        <InputGroup.Text>PLN</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{pl.products.priceTo}</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder={pl.common.select}
                                            value={filters.priceTo}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('priceTo', e.target.value)}
                                        />
                                        <InputGroup.Text>PLN</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mb-3" controlId="productsFilterCategory">
                                    <Form.Label>{pl.products.category}</Form.Label>
                                    <Form.Select
                                        aria-label={pl.products.category}
                                        title={pl.products.category}
                                        value={filters.category}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange('category', e.target.value)}
                                    >
                                        <option value="">{pl.common.select}</option>
                                        {categories.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

