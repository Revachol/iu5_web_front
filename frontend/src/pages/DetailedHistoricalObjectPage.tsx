// pages/DetailedHistoricalObjectPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { historicalObjects, type HistoricalObject } from '../modules/mockData';
import './DetailedHistoricalObjectPage.css';

const DetailedHistoricalObjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Находим объект по ID
  const object: HistoricalObject | undefined = historicalObjects.find(
    obj => obj.ID === parseInt(id || '0')
  );

  // Если объект не найден
  if (!object) {
    return (
      <div className="detailed-object-page">
        <Container>
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

  const handleAddToCart = () => {
    console.log(`Added object ${object.ID} to cart`);
    // TODO: Реализовать добавление в корзину
  };

  const handleBack = () => {
    navigate('/historical_objects');
  };

  return (
    <div className="detailed-object-page">
      <Container className="object-container">
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
                src={object.Img}
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
              <h1 className="object-title">{object.Title}</h1>
              
              <div className="price-section">
                <span className="price">{object.Price}</span>
                <span className="value"> / {object.Value}</span>
              </div>

              <div className="description-section">
                <h3 className="section-title">Описание</h3>
                <p className="object-description">{object.Description}</p>
              </div>

              <div className="source-section">
                <h3 className="section-title">Исторический источник</h3>
                <p className="object-source">{object.Source}</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Дополнительная информация (можно расширить) */}
        {/* <Row className="additional-info">
          <Col lg={12}>
            <Card className="info-card">
              <Card.Body>
                <h3 className="section-title">Дополнительная информация</h3>
                <Row>
                  <Col md={6}>
                    <div className="info-item">
                      <strong>Эпоха:</strong> 
                      <span> {object.Title.match(/\((.*?)\)/)?.[1] || 'Не указана'}</span>
                    </div>
                    <div className="info-item">
                      <strong>Категория:</strong> 
                      <span> Исторический артефакт</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <strong>Доступность:</strong> 
                      <span className="available"> ✓ В наличии</span>
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