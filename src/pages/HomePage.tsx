// pages/HomePage.tsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HomePage.css';

const HomePage: React.FC = () => {

  return (
    <div className="home-page">
      <Container className="home-container">
        {/* Герой-секция */}
        <Row className="hero-section">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="hero-title">
              ИСТОРИЧЕСКИЕ ОБЪЕКТЫ
            </h1>
            <p className="hero-subtitle">
              Вычисление стоимости исторических объектов с учетом инфляции. 
              Исследуйте уникальные исторические артефакты и создайте собственную 
              исследовательскую заявку.
            </p>
          </Col>
        </Row>

        {/* Преимущества */}
        <Row className="features-section">
          <Col lg={12}>
            <h2 className="section-title">Почему выбирают нас</h2>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">📊</div>
                <Card.Title>Точные расчеты</Card.Title>
                <Card.Text>
                  Автоматическое вычисление стоимости с учетом инфляции и исторических данных
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">🏛️</div>
                <Card.Title>Богатая база</Card.Title>
                <Card.Text>
                  Обширная коллекция исторических объектов различных эпох и культур
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">🔍</div>
                <Card.Title>Детальный анализ</Card.Title>
                <Card.Text>
                  Подробная информация по каждому объекту с исторической справкой
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;