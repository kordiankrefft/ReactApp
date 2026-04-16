import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { pl } from '../../i18n/pl';
import { initialEmployees } from '../../mock/employees';
import type { Employee } from '../../types/employee';
import { useEmployees } from '../../hooks/useEmployees';

export const Employees: React.FC = () => {
    const { filtered, filters, setFilters, removeByCode, upsert } = useEmployees(initialEmployees);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

    const openEdit = (employee: Employee): void => {
        setCurrentEmployee(employee);
        setShowModal(true);
    };

    const handleModalChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setCurrentEmployee((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const saveModal = (): void => {
        if (!currentEmployee) return;
        upsert(currentEmployee);
        setShowModal(false);
    };

    return (
        <Container fluid>
            <h3 className="mb-3">{pl.employees.filterTitle}</h3>
            <Row className="mb-3">
                <Col sm={3}>
                    <Form.Control
                        type="text"
                        placeholder={pl.employees.searchByLastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilters((prev) => ({ ...prev, lastNameQuery: e.target.value }))
                        }
                    />
                </Col>
                <Col sm={3}>
                    <Form.Group controlId="employeeUnitFilter">
                        <Form.Label>{pl.employees.unit}</Form.Label>
                        <Form.Select
                            aria-label="Jednostka organizacyjna"
                            title="Jednostka organizacyjna"
                            value={filters.unit}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setFilters((prev) => ({ ...prev, unit: e.target.value }))
                            }
                        >
                            <option value="">Wybierz jednostkę organizacyjną</option>
                            <option value="Wydział A">Wydział A</option>
                            <option value="Wydział B">Wydział B</option>
                            <option value="Wydział C">Wydział C</option>
                            <option value="Wydział D">Wydział D</option>
                            <option value="Wydział E">Wydział E</option>
                            <option value="Wydział F">Wydział F</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={3} className="d-flex align-items-center">
                    <Form.Check
                        type="checkbox"
                        label={pl.employees.withDependents}
                        checked={filters.dependentsOnly}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFilters((prev) => ({ ...prev, dependentsOnly: e.target.checked }))
                        }
                        className="me-2"
                    />
                    <Button variant="primary">{pl.common.filter}</Button>
                </Col>
            </Row>

            <Row>
                {filtered.map((employee, index) => (
                    <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {employee.firstName} {employee.lastName}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {employee.unit}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Kod pracownika:</strong> {employee.code}
                                    <br />
                                    <strong>Adres:</strong> {employee.address}
                                    <br />
                                    <strong>Telefon:</strong> {employee.phone}
                                    <br />
                                    <strong>Stanowisko:</strong> {employee.jobTitle}
                                    <br />
                                    <strong>Email:</strong> {employee.email}
                                    <br />
                                    <strong>Data Urodzenia:</strong> {employee.dateOfBirth}
                                    <br />
                                    <strong>PESEL:</strong> {employee.nationalId}
                                    <br />
                                    <strong>Zależni:</strong> {employee.hasDependents ? 'Tak' : 'Nie'}
                                </Card.Text>
                                <Button variant="warning" className="me-2" onClick={() => openEdit(employee)}>
                                    {pl.common.edit}
                                </Button>
                                <Button variant="danger" onClick={() => removeByCode(employee.code)}>
                                    {pl.common.delete}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {currentEmployee && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{pl.employees.editEmployee}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={currentEmployee.firstName}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={currentEmployee.lastName}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jednostka organizacyjna</Form.Label>
                                <Form.Select
                                    name="unit"
                                    aria-label="Jednostka organizacyjna"
                                    title="Jednostka organizacyjna"
                                    value={currentEmployee.unit}
                                    onChange={handleModalChange}
                                >
                                    <option value="Wydział A">Wydział A</option>
                                    <option value="Wydział B">Wydział B</option>
                                    <option value="Wydział C">Wydział C</option>
                                    <option value="Wydział D">Wydział D</option>
                                    <option value="Wydział E">Wydział E</option>
                                    <option value="Wydział F">Wydział F</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Adres</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={currentEmployee.address}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={currentEmployee.phone}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Stanowisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobTitle"
                                    value={currentEmployee.jobTitle}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={currentEmployee.email}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Data Urodzenia</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={currentEmployee.dateOfBirth}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>PESEL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nationalId"
                                    value={currentEmployee.nationalId}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Zależni"
                                    name="hasDependents"
                                    checked={currentEmployee.hasDependents}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setCurrentEmployee({ ...currentEmployee, hasDependents: e.target.checked })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {pl.common.cancel}
                        </Button>
                        <Button variant="primary" onClick={saveModal}>
                            {pl.common.saveChanges}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

