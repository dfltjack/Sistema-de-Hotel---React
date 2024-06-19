import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "../../pages/Home/home";
import Hospede from "../../pages/Hospede/hospede";
import Quarto from "../../pages/Quarto/quarto";
import Reserva from "../../pages/Reserva/reserva";

const NavBarMain = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand as={Link} to="/">Hotel Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/hospede">Hóspedes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/reserva">Reservas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/quarto">Quartos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hospede" element={<Hospede />} />
                    <Route path="/quarto" element={<Quarto />} />
                    <Route path="/reserva" element={<Reserva />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
        </>
    );
}

export default NavBarMain;
