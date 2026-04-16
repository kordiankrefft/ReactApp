import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

interface EmployeePayrollRow {
    id: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    baseSalary: number;
    bonus: number;
    deductions: number;
}

interface PayrollFilters {
    sortBy: string;
    jobTitle: string;
    salaryFrom: string;
    salaryTo: string;
}

export const Payroll: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeePayrollRow[]>([
        { id: 1, firstName: 'Jan', lastName: 'Kowalski', jobTitle: 'Sprzedawca', baseSalary: 5000, bonus: 1000, deductions: 500 },
        { id: 2, firstName: 'Anna', lastName: 'Nowak', jobTitle: 'Instruktor', baseSalary: 4500, bonus: 800, deductions: 300 },
        { id: 3, firstName: 'Piotr', lastName: 'Wiśniewski', jobTitle: 'Magazynier', baseSalary: 5500, bonus: 1200, deductions: 600 },
        { id: 4, firstName: 'Marek', lastName: 'Zając', jobTitle: 'Doradca', baseSalary: 4800, bonus: 900, deductions: 400 },
        { id: 5, firstName: 'Karolina', lastName: 'Lis', jobTitle: 'Sprzedawca', baseSalary: 4200, bonus: 750, deductions: 300 },
        { id: 6, firstName: 'Agnieszka', lastName: 'Kowal', jobTitle: 'Kierownik', baseSalary: 6000, bonus: 1500, deductions: 700 },
        { id: 7, firstName: 'Tomasz', lastName: 'Jankowski', jobTitle: 'Specjalista', baseSalary: 5200, bonus: 1100, deductions: 400 },
        { id: 8, firstName: 'Katarzyna', lastName: 'Nowicka', jobTitle: 'Asystent', baseSalary: 3800, bonus: 600, deductions: 200 },
    ]);

    const [filters, setFilters] = useState<PayrollFilters>({
        sortBy: '',
        jobTitle: '',
        salaryFrom: '',
        salaryTo: '',
    });

    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentEmployee, setCurrentEmployee] = useState<EmployeePayrollRow | null>(null);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const openEdit = (employee: EmployeePayrollRow): void => {
        setCurrentEmployee(employee);
        setShowEditModal(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (currentEmployee) {
            setCurrentEmployee({ ...currentEmployee, [name]: value });
        }
    };

    const saveEdit = (): void => {
        if (currentEmployee) {
            setEmployees((prev) => prev.map((e) => (e.id === currentEmployee.id ? currentEmployee : e)));
            setShowEditModal(false);
        }
    };

    const filteredAndSortedEmployees = employees
        .filter((employee) => {
            const jobTitleOk =
                filters.jobTitle === '' ||
                employee.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase());
            const salaryFromOk =
                filters.salaryFrom === '' || employee.baseSalary >= parseFloat(filters.salaryFrom);
            const salaryToOk =
                filters.salaryTo === '' || employee.baseSalary <= parseFloat(filters.salaryTo);
            return jobTitleOk && salaryFromOk && salaryToOk;
        })
        .sort((a, b) => {
            if (filters.sortBy === '') return 0;
            if (filters.sortBy === 'firstName') return a.firstName.localeCompare(b.firstName);
            if (filters.sortBy === 'lastName') return a.lastName.localeCompare(b.lastName);
            if (filters.sortBy === 'jobTitle') return a.jobTitle.localeCompare(b.jobTitle);
            if (filters.sortBy === 'baseSalary') return a.baseSalary - b.baseSalary;
            return 0;
        });

    return (
        <Container fluid>
            <h3>Karta płacowa pracowników</h3>
            <Form className="mb-3">
                <Row>
                    <Col md={2}>
                        <Form.Label>Sortuj według:</Form.Label>
                        <Form.Select name="sortBy" onChange={handleFilterChange}>
                            <option value="">Wybierz</option>
                            <option value="firstName">Imienia</option>
                            <option value="lastName">Nazwiska</option>
                            <option value="jobTitle">Stanowiska</option>
                            <option value="baseSalary">Pensji</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Label>Filtruj stanowisko:</Form.Label>
                        <Form.Control type="text" name="jobTitle" onChange={handleFilterChange} />
                    </Col>
                    <Col md={2}>
                        <Form.Label>Filtruj pensje od:</Form.Label>
                        <Form.Control type="number" name="salaryFrom" onChange={handleFilterChange} />
                    </Col>
                    <Col md={2}>
                        <Form.Label>Filtruj pensje do:</Form.Label>
                        <Form.Control type="number" name="salaryTo" onChange={handleFilterChange} />
                    </Col>
                    <Col md={2} className="align-self-end">
                        <Button
                            variant="primary"
                            onClick={() =>
                                setFilters({ sortBy: '', jobTitle: '', salaryFrom: '', salaryTo: '' })
                            }
                        >
                            Resetuj filtry
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Stanowisko</th>
                        <th>Pensja</th>
                        <th>Premie</th>
                        <th>Odliczenia</th>
                        <th>Suma</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedEmployees.map((employee) => {
                        const total = employee.baseSalary + employee.bonus - employee.deductions;
                        return (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.baseSalary}</td>
                                <td>{employee.bonus}</td>
                                <td>{employee.deductions}</td>
                                <td>{total}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => openEdit(employee)}>
                                        Edytuj
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div className="mt-3">
                <Button variant="info">Eksportuj dane</Button>
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj pracownika</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentEmployee && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={currentEmployee.firstName}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={currentEmployee.lastName}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Stanowisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobTitle"
                                    value={currentEmployee.jobTitle}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pensja</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="baseSalary"
                                    value={currentEmployee.baseSalary}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Premie</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="bonus"
                                    value={currentEmployee.bonus}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Odliczenia</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="deductions"
                                    value={currentEmployee.deductions}
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

