import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

interface EmployeeReport {
    id: number;
    employee: string;
    date: string;
    hoursWorked: number;
    overtimeHours: number;
    vacationDays: number;
    absenceDays: number;
    comment: string;
}

interface EmployeeReportFilters {
    employee: string;
    dateFrom: string;
    dateTo: string;
}

export const EmployeeReports: React.FC = () => {
    const [reports, setReports] = useState<EmployeeReport[]>([
        { id: 1, employee: 'Jan Kowalski', date: '2024-04-01', hoursWorked: 8, overtimeHours: 2, vacationDays: 0, absenceDays: 0, comment: 'Pracowity i sumienny' },
        { id: 2, employee: 'Anna Nowak', date: '2024-04-02', hoursWorked: 7, overtimeHours: 3, vacationDays: 0, absenceDays: 0, comment: 'Zawsze punktualna' },
        { id: 3, employee: 'Piotr Wisniewski', date: '2024-04-03', hoursWorked: 8, overtimeHours: 1, vacationDays: 0, absenceDays: 0, comment: 'Dobrze radzi sobie w zespole' },
        { id: 4, employee: 'Maria Lewandowska', date: '2024-04-04', hoursWorked: 8, overtimeHours: 2, vacationDays: 0, absenceDays: 0, comment: 'Bardzo zorganizowana' },
        { id: 5, employee: 'Tomasz Dąbrowski', date: '2024-04-05', hoursWorked: 6, overtimeHours: 4, vacationDays: 0, absenceDays: 0, comment: 'Potrzebuje poprawić efektywność' },
        { id: 6, employee: 'Karolina Lis', date: '2024-04-06', hoursWorked: 8, overtimeHours: 2, vacationDays: 0, absenceDays: 0, comment: 'Znakomita współpraca' },
        { id: 7, employee: 'Tomasz Jankowski', date: '2024-04-07', hoursWorked: 8, overtimeHours: 1, vacationDays: 0, absenceDays: 0, comment: 'Zawsze pomocny' },
        { id: 8, employee: 'Katarzyna Nowicka', date: '2024-04-08', hoursWorked: 7, overtimeHours: 3, vacationDays: 0, absenceDays: 0, comment: 'Dobra komunikacja' },
    ]);

    const [filters, setFilters] = useState<EmployeeReportFilters>({
        employee: '',
        dateFrom: '',
        dateTo: '',
    });
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentReport, setCurrentReport] = useState<EmployeeReport | null>(null);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const openEdit = (report: EmployeeReport): void => {
        setCurrentReport(report);
        setShowEditModal(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (currentReport) {
            setCurrentReport({ ...currentReport, [name]: value });
        }
    };

    const saveEdit = (): void => {
        if (currentReport) {
            setReports((prev) => prev.map((r) => (r.id === currentReport.id ? currentReport : r)));
            setShowEditModal(false);
        }
    };

    const filteredReports = reports.filter((report) => {
        const date = new Date(report.date);
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;
        return (
            (filters.employee === '' ||
                report.employee.toLowerCase().includes(filters.employee.toLowerCase())) &&
            (from === null || date >= from) &&
            (to === null || date <= to)
        );
    });

    const totalHours = filteredReports.reduce((sum, report) => sum + Number(report.hoursWorked), 0);
    const totalOvertime = filteredReports.reduce((sum, report) => sum + Number(report.overtimeHours), 0);
    const totalVacation = filteredReports.reduce((sum, report) => sum + Number(report.vacationDays), 0);
    const totalAbsence = filteredReports.reduce((sum, report) => sum + Number(report.absenceDays), 0);

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h3>Raporty pracowników</h3>
                    <Form className="mt-3">
                        <Row>
                            <Col md={4} className="mb-3">
                                <Form.Label>Pracownik</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employee"
                                    value={filters.employee}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                            <Col md={4} className="mb-3">
                                <Form.Label>Data od</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateFrom"
                                    value={filters.dateFrom}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                            <Col md={4} className="mb-3">
                                <Form.Label>Data do</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateTo"
                                    value={filters.dateTo}
                                    onChange={handleFilterChange}
                                />
                            </Col>
                        </Row>
                        <Button
                            variant="primary"
                            onClick={() => setFilters({ employee: '', dateFrom: '', dateTo: '' })}
                        >
                            Resetuj filtry
                        </Button>
                    </Form>

                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>Pracownik</th>
                                <th>Data</th>
                                <th>Godziny przepracowane</th>
                                <th>Nadgodziny</th>
                                <th>Urlop</th>
                                <th>Nieobecność</th>
                                <th>Komentarz</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.employee}</td>
                                    <td>{report.date}</td>
                                    <td>{report.hoursWorked}</td>
                                    <td>{report.overtimeHours}</td>
                                    <td>{report.vacationDays}</td>
                                    <td>{report.absenceDays}</td>
                                    <td>{report.comment}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => openEdit(report)}>
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
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Całkowite godziny przepracowane</Card.Title>
                            <Card.Text>
                                <h3>{totalHours}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Całkowite nadgodziny</Card.Title>
                            <Card.Text>
                                <h3>{totalOvertime}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Całkowite dni urlopu</Card.Title>
                            <Card.Text>
                                <h3>{totalVacation}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Całkowite dni nieobecności</Card.Title>
                            <Card.Text>
                                <h3>{totalAbsence}</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={12}>
                    <h3>Wykres godzin pracy</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={filteredReports}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="employee" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hoursWorked" fill="#8884d8" />
                            <Bar dataKey="overtimeHours" fill="#82ca9d" />
                            <Bar dataKey="vacationDays" fill="#ffc658" />
                            <Bar dataKey="absenceDays" fill="#ff8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edytuj raport</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentReport && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Pracownik</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employee"
                                    value={currentReport.employee}
                                    onChange={handleEditChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={currentReport.date}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Godziny przepracowane</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="hoursWorked"
                                    value={currentReport.hoursWorked}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nadgodziny</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="overtimeHours"
                                    value={currentReport.overtimeHours}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Urlop</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="vacationDays"
                                    value={currentReport.vacationDays}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nieobecność</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="absenceDays"
                                    value={currentReport.absenceDays}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Komentarz</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="comment"
                                    value={currentReport.comment}
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

