import React from "react";
import { Container, Nav, Navbar, useNavigate } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import Hospede from "../../pages/Hospede/hospede";

const navBarMain = () => {
    return(
        <>
            <Navbar>
                <Container>
                    <Nav>
                        <Link to="/hospede">Hóspedes</Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/hospede" element={<Hospede/>}></Route>
            </Routes>
        </>
    )
}

export default navBarMain;