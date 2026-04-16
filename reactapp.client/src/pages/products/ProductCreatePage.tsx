import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm } from 'react-hook-form';

interface ProductFormData {
    code: string;
    catalogNumber: string;
    name: string;
    category: string;
    pkwiu: string;
    purchaseVat: string;
    salesVat: string;
    price: string;
    additionalInfo: string;
    notes: string;
    entryDate: string;
    isCurrent: boolean;
    file: File | null;
}

export const ProductCreate: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [formData, setFormData] = useState<ProductFormData>({
        code: '',
        catalogNumber: '',
        name: '',
        category: '',
        pkwiu: '',
        purchaseVat: '',
        salesVat: '',
        price: '',
        additionalInfo: '',
        notes: '',
        entryDate: '',
        isCurrent: false,
        file: null,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        setValue,
        watch,
    } = useForm<ProductFormData>({
        defaultValues: formData,
        mode: 'onSubmit',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setValue('file', file, { shouldDirty: true });
    };

    const onValid = (data: ProductFormData) => {
        setFormData(data);
        setShowSuccess(true);
        setShowError(false);
        // eslint-disable-next-line no-console
        console.log(data);
    };

    const onInvalid = () => {
        setShowError(true);
        setShowSuccess(false);
    };

    return (
        <Container fluid>
            <Form noValidate validated={isSubmitted} onSubmit={handleSubmit(onValid, onInvalid)}>
                <Row>
                    <Col className="mt-2 mb-3 float-end">
                        <Button variant="primary" type="submit">
                            Dodaj towar
                        </Button>
                    </Col>
                </Row>
                {showSuccess && (
                    <Alert variant="success">
                        Towar został zapisany pomyślnie!
                    </Alert>
                )}
                {showError && (
                    <Alert variant="danger">
                        Wystąpił błąd podczas zapisywania towaru. Proszę sprawdzić wprowadzone dane.
                    </Alert>
                )}
                <Row>
                    <Tabs defaultActiveKey="basicData" id="productData" className="mb-3">
                        <Tab eventKey="basicData" title="Dane podstawowe">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Kod</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Wprowadź kod"
                                            isInvalid={Boolean(errors.code)}
                                            {...register('code', { required: true })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić kod.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nr Katalogowy</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Wprowadź nr katalogowy"
                                            isInvalid={Boolean(errors.catalogNumber)}
                                            {...register('catalogNumber', { required: true })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić numer katalogowy.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwa</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Wprowadź nazwę"
                                            isInvalid={Boolean(errors.name)}
                                            {...register('name', { required: true })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić nazwę.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Kategorie</Form.Label>
                                        <Form.Select
                                            required
                                            aria-label="Default select example"
                                            isInvalid={Boolean(errors.category)}
                                            {...register('category', { required: true })}
                                        >
                                            <option value="">Wybierz</option>
                                            <option value="1">Odzież</option>
                                            <option value="2">Akcesoria</option>
                                            <option value="3">Obuwie</option>
                                            <option value="4">Sprzęt</option>
                                            <option value="5">Rekawice</option>
                                            <option value="6">Odzież dziecięca</option>
                                            <option value="7">Sprzęt dziecięcy</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wybrać kategorię.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Data wprowadzenia</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            isInvalid={Boolean(errors.entryDate)}
                                            {...register('entryDate', { required: true })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wybrać datę.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Czy aktualny"
                                            checked={Boolean(watch('isCurrent'))}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setValue('isCurrent', e.target.checked, { shouldDirty: true })
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="productFile" className="mb-3">
                                        <Form.Label>Upload Pliku</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" type="submit">
                                        Zapisz
                                    </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="price" title="Cena">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>PKWIU</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Wprowadź PKWIU"
                                            isInvalid={Boolean(errors.pkwiu)}
                                            {...register('pkwiu', { required: true })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić PKWIU.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>VAT zakupu</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="Wprowadź VAT"
                                                isInvalid={Boolean(errors.purchaseVat)}
                                                {...register('purchaseVat', { required: true })}
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić VAT zakupu.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>VAT sprzedaży</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="Wprowadź VAT sprzedaży"
                                                isInvalid={Boolean(errors.salesVat)}
                                                {...register('salesVat', { required: true })}
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić VAT zakupu.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cena domyślna</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>PLN</InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="number"
                                                placeholder="Wprowadź cenę"
                                                isInvalid={Boolean(errors.price)}
                                                {...register('price', { required: true })}
                                            />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić cenę.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" type="submit">
                                        Zapisz
                                    </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="notes" title="Uwagi">
                            <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dodatkowe informacje</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            {...register('additionalInfo')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Uwagi</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            {...register('notes')}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <Button variant="primary" type="submit">
                                        Zapisz
                                    </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="summary" title="Podsumowanie">
                            <Row>
                                <Col>
                                    <h5>Podsumowanie wprowadzonych danych:</h5>
                                    <ul>
                                        <li>Kod: {watch('code')}</li>
                                        <li>Nr Katalogowy: {watch('catalogNumber')}</li>
                                        <li>Nazwa: {watch('name')}</li>
                                        <li>Kategorie: {watch('category')}</li>
                                        <li>Data wprowadzenia: {watch('entryDate')}</li>
                                        <li>Czy aktualny: {watch('isCurrent') ? 'Tak' : 'Nie'}</li>
                                        <li>PKWIU: {watch('pkwiu')}</li>
                                        <li>VAT zakupu: {watch('purchaseVat')}%</li>
                                        <li>VAT sprzedaży: {watch('salesVat')}%</li>
                                        <li>Cena: {watch('price')} PLN</li>
                                        <li>Dodatkowe informacje: {watch('additionalInfo')}</li>
                                        <li>Uwagi: {watch('notes')}</li>
                                        <li>Plik: {watch('file') ? watch('file')!.name : 'Brak'}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Row>
            </Form>
        </Container>
    );
};

