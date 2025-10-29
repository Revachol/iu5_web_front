// pages/HomePage.tsx
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

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
            <div className="hero-buttons">
              <Button
                className="hero-button primary"
                onClick={() => navigate('/historical_objects')}
              >
                Каталог исторических объектов
              </Button>
              <Button
                className="hero-button secondary"
                onClick={() => navigate('/my-request')}
              >
                Моя заявка
              </Button>
            </div>
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

        {/* Популярные объекты */}
        <Row className="popular-section">
          <Col lg={12}>
            <h2 className="section-title">Популярные исторические объекты</h2>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="popular-card">
              <Card.Img 
                variant="top" 
                src="http://localhost:9000/iu5-web/img/placeholder-historical.jpg"
                className="card-image"
              />
              <Card.Body>
                <Card.Text className="price">0.355$ / за шт</Card.Text>
                <Card.Title className="card-title">Кирпич строительный</Card.Title>
                <div className="card-buttons">
                  <Button 
                    variant="outline-dark" 
                    size="sm"
                    className="detail-btn"
                  >
                    Подробнее
                  </Button>
                  <Button 
                    variant="dark" 
                    size="sm"
                    className="buy-btn"
                  >
                    Купить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="popular-card">
              <Card.Img 
                variant="top" 
                src="http://localhost:9000/iu5-web/img/placeholder-historical.jpg"
                className="card-image"
              />
              <Card.Body>
                <Card.Text className="price">8.58$ / за лист</Card.Text>
                <Card.Title className="card-title">Свинец кровельный</Card.Title>
                <div className="card-buttons">
                  <Button 
                    variant="outline-dark" 
                    size="sm"
                    className="detail-btn"
                  >
                    Подробнее
                  </Button>
                  <Button 
                    variant="dark" 
                    size="sm"
                    className="buy-btn"
                  >
                    Купить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="popular-card">
              <Card.Img 
                variant="top" 
                src="http://localhost:9000/iu5-web/img/placeholder-historical.jpg"
                className="card-image"
              />
              <Card.Body>
                <Card.Text className="price">258$ / за день</Card.Text>
                <Card.Title className="card-title">Труд каменщика</Card.Title>
                <div className="card-buttons">
                  <Button 
                    variant="outline-dark" 
                    size="sm"
                    className="detail-btn"
                  >
                    Подробнее
                  </Button>
                  <Button 
                    variant="dark" 
                    size="sm"
                    className="buy-btn"
                  >
                    Купить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;