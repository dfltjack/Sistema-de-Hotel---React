import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h1>Home</h1>
            <p>Bem-vindo ao sistema de gerenciamento de hotel. Aqui você pode gerenciar hóspedes, quartos e reservas de forma eficiente.</p>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Gerenciar Hóspedes</Card.Title>
                            <Card.Text>
                                Adicione, edite e visualize informações dos hóspedes.
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate('/hospede')}>Ir para Hóspedes</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Gerenciar Reservas</Card.Title>
                            <Card.Text>
                                Veja e gerencie todas as reservas feitas no hotel.
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate('/reserva')}>Ir para Reservas</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Gerenciar Quartos</Card.Title>
                            <Card.Text>
                                Adicione e edite informações dos quartos disponíveis.
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate('/quarto')}>Ir para Quartos</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
