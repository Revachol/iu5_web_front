// pages/DetailedHistoricalObjectPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useHistoricalObject } from '../hooks/useHistoricalObject'; // правильный импорт
import './DetailedHistoricalObjectPage.css';
import Breadcrumbs from '../modules/Breadcrumbs';
import type { BreadcrumbItem } from '../types';

console.log('🔍 [DetailedHistoricalObjectPage.tsx] Module loaded');

const DetailedHistoricalObjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const objectId = parseInt(id || '0');
  
  // Используем хук для одного объекта
  const { object, loading, error } = useHistoricalObject(objectId);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог исторических объектов', path: '/historical_objects' },
    { label: object ? object.Name : 'Загрузка...' }
  ];

  // const handleAddToCart = () => {
  //   if (object) {
  //     console.log(`Added object ${object.ID} to cart`);
  //     // TODO: Реализовать добавление в корзину
  //   }
  // };

  const handleBack = () => {
    navigate('/historical_objects');
  };

  if (loading) {
    return (
      <div className="detailed-object-page">
        <Container>
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
            <p>Загрузка информации об объекте...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !object) {
    return (
      <div className="detailed-object-page">
        <Container>
          <Alert variant="warning" className="mb-3">
            <p>{error || 'Объект не найден'}</p>
            <p className="mb-0">Используются демонстрационные данные</p>
          </Alert>
          <div className="not-found">
            <h2>Объект не найден</h2>
            <Button 
              variant="dark" 
              onClick={() => navigate('/historical_objects')}
            >
              Вернуться в каталог
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="detailed-object-page">
      <Container className="object-container">
      <Row>
          <Col>
            <Breadcrumbs items={breadcrumbItems} />
          </Col>
        </Row>
        {/* Кнопка назад */}
        <Row>
          <Col>
            <Button 
              variant="outline-dark" 
              onClick={handleBack}
              className="back-button"
            >
              ← Назад к каталогу
            </Button>
          </Col>
        </Row>

        {/* Основная информация об объекте */}
        <Row className="object-content">
          <Col lg={6} className="image-section">
            <Card className="object-image-card">
              <Card.Img 
                variant="top" 
                src={object.ImageURL}
                className="detailed-object-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'http://localhost:9000/iu5-web/img/placeholder-historical.jpg';
                }}
              />
            </Card>
          </Col>
          
          <Col lg={6} className="info-section">
            <div className="object-info">
              <h1 className="object-title">{object.Name}</h1>
              
              <div className="price-section">
                <span className="price">${object.PriceUSD.toFixed(2)}</span>
                <span className="value"> / {object.Unit}</span>
              </div>

              <div className="description-section">
                <h3 className="section-title">Описание</h3>
                <p className="object-description">{object.Description}</p>
              </div>

              <div className="source-section">
                <h3 className="section-title">Исторический источник</h3>
                <p className="object-source">{object.DataSource}</p>
              </div>

              {/* <div className="action-buttons">
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="detail-btn"
                >
                  📖 Подробная справка
                </Button>
                <Button
                  variant="dark"
                  size="lg"
                  className="buy-btn"
                  onClick={handleAddToCart}
                >
                  🛒 Добавить в заявку
                </Button>
              </div> */}
            </div>
          </Col>
        </Row>

        {/* Дополнительная информация
        <Row className="additional-info">
          <Col lg={12}>
            <Card className="info-card">
              <Card.Body>
                <h3 className="section-title">Дополнительная информация</h3>
                <Row>
                  <Col md={6}>
                    <div className="info-item">
                      <strong>Исторический период:</strong> 
                      <span> {object.HistoricalPeriod}</span>
                    </div>
                    <div className="info-item">
                      <strong>Регион:</strong> 
                      <span> {object.HistoricalRegion}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <strong>Статус:</strong> 
                      <span className={object.IsActive ? "available" : "unavailable"}>
                        {object.IsActive ? " ✓ Доступен" : " ✗ Не доступен"}
                      </span>
                    </div>
                    <div className="info-item">
                      <strong>ID объекта:</strong> 
                      <span> #{object.ID.toString().padStart(3, '0')}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default DetailedHistoricalObjectPage;