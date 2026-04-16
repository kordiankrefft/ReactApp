import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

interface MenuProps {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<MenuProps> = ({ showMenu, setShowMenu }) => {
    const handleMenuItemClick = (): void => {
        setShowMenu(false);
    };

    return (
        <Offcanvas show={showMenu} onHide={() => setShowMenu(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="menu">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Link onClick={handleMenuItemClick}>
                        <Link to="/pomocikontakt" className="nav-link">Pomoc i Kontakt</Link>
                    </Nav.Link>
                    <Nav.Link onClick={handleMenuItemClick}>
                        <Link to="/szczegoly-produktow" className="nav-link">Szczegóły produktów</Link>
                    </Nav.Link>
                    <Nav.Link onClick={handleMenuItemClick}>
                        <Link to="/zwroty" className="nav-link">Zwroty</Link>
                    </Nav.Link>
                    <Nav.Link onClick={handleMenuItemClick}>
                        <Link to="/moje-konto" className="nav-link">Moje konto</Link>
                    </Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export function Layout(): JSX.Element {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className="app">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/" className="d-block">
                            <Image src="/image/image1.png" className="logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link>
                                <Link to="/" className="d-block custom-link">Strona Główna</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/kontrahenci" className="d-block">Kontrahenci</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/faktury" className="d-block">Faktury sprzedaży</Link>
                            </Nav.Link>
                            <NavDropdown title="Towary i usługi" id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Link to="/towar" className="d-block">Dodawanie towaru</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/towary" className="d-block">Towary</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="raporty">
                                    Raporty
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Kadry i płace" id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Link to="/pracownik" className="d-block">Nowy pracownik</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/pracownicy" className="d-block">Personel</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/place" className="d-block">Place</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="raport">
                                    Raporty
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Rozwój" id="navbarScrollingDropdown">
                                <NavDropdown.Item>
                                    <Link to="/szkolenia" className="d-block">Szkolenia</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/certyfikaty" className="d-block">Certyfikaty</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Szukaj"
                                className="me-2"
                                aria-label="Szukaj"
                            />
                            <Button variant="outline-primary">Szukaj</Button>
                        </Form>
                        <span className="mx-2"></span>
                        <Button variant="secondary" onClick={() => setShowMenu(!showMenu)}>
                            Menu
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />

            <div className="px-5">
                <Container fluid>
                    <Outlet />
                </Container>
            </div>
        </div>
    );
}
