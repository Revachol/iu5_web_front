// pages/HistoricalObjectsPage.tsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ObjectCard from '../modules/HOCard';
import SearchForm from '../modules/SearchForm';
import { historicalObjects, type HistoricalObject } from '../modules/mockData';
import './HistoricalObjectsPage.css';

const HistoricalObjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredObjects = historicalObjects.filter(obj =>
    obj.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obj.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (objectId: number) => {
    console.log(`Added object ${objectId} to cart`);
    // TODO: Реализовать добавление в корзину
  };

  return (
    <div className="historical-objects-page">
      <Container className="objects-container">
        {/* Заголовок и поиск */}
        <Row className="page-header">
          <Col lg={8}>
            <h1 className="page-title">Каталог исторических объектов</h1>
            <p className="page-subtitle">
              Исследуйте уникальные исторические артефакты различных эпох и культур
            </p>
          </Col>
          <Col lg={4}>
            <SearchForm
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Поиск исторических объектов..."
            />
          </Col>
        </Row>

        {/* Сетка объектов */}
        <Row className="objects-grid">
          {filteredObjects.map((object: HistoricalObject) => (
            <Col key={object.ID} lg={4} md={6} className="mb-4">
              <ObjectCard
                object={object}
                onAddToCart={handleAddToCart}
              />
            </Col>
          ))}
        </Row>

        {/* Сообщение если ничего не найдено */}
        {filteredObjects.length === 0 && (
          <Row>
            <Col className="text-center">
              <div className="no-results">
                <h3>Объекты не найдены</h3>
                <p>Попробуйте изменить поисковый запрос</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HistoricalObjectsPage;