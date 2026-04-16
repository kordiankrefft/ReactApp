import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import type { Product, ProductCategory } from '../../../types/product';
import { pl } from '../../../i18n/pl';

interface EditProductModalProps {
    show: boolean;
    product: Product | null;
    categories: ProductCategory[];
    onClose: () => void;
    onSave: (next: Product) => void;
}

export function EditProductModal({ show, product, categories, onClose, onSave }: EditProductModalProps): JSX.Element {
    const [draft, setDraft] = useState<Product | null>(product);

    useEffect(() => {
        setDraft(product);
    }, [product]);

    const update = (name: keyof Product, value: string) => {
        if (!draft) return;
        if (name === 'price') {
            setDraft({ ...draft, price: value === '' ? 0 : Number(value) });
            return;
        }
        setDraft({ ...draft, [name]: value } as Product);
    };

    const save = () => {
        if (!draft) return;
        onSave(draft);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{pl.products.editProduct}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {draft && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{pl.products.table.code}</Form.Label>
                            <Form.Control type="text" value={draft.code} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{pl.products.table.name}</Form.Label>
                            <Form.Control
                                type="text"
                                value={draft.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('name', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editProductCategory">
                            <Form.Label>{pl.products.table.category}</Form.Label>
                            <Form.Select
                                aria-label={pl.products.table.category}
                                title={pl.products.table.category}
                                value={draft.category}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('category', e.target.value)}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{pl.products.table.pkwiu}</Form.Label>
                            <Form.Control
                                type="text"
                                value={draft.pkwiu}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('pkwiu', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{pl.products.table.price}</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>PLN</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    value={Number.isFinite(draft.price) ? String(draft.price) : ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('price', e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {pl.common.cancel}
                </Button>
                <Button variant="primary" onClick={save}>
                    {pl.common.saveChanges}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

