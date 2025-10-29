// pages/HistoricalObjectsPage.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import ObjectCard from '../modules/HOCard';
import SearchForm from '../modules/SearchForm';
import { useHistoricalObjects } from '../hooks/useHistoricalObjects';
import './HistoricalObjectsPage.css';

const HistoricalObjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { objects, loading, error, usingMockData } = useHistoricalObjects();

  // Гарантируем, что filteredObjects всегда массив
  const filteredObjects = Array.isArray(objects) 
    ? objects.filter(obj => {
        if (!obj || typeof obj !== 'object') return false;
        return (
          obj.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.HistoricalRegion?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const handleAddToCart = (objectId: number) => {
    console.log(`Added object ${objectId} to cart`);
  };

  if (loading) {
    return (
      <div className="historical-objects-page">
        <Container className="objects-container">
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
            <p>Загрузка исторических объектов...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="historical-objects-page">
      <Container className="objects-container">
        {/* Заголовок и поиск */}
        <Row className="page-header">
          <Col lg={8}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <h1 className="page-title mb-0">Каталог исторических объектов</h1>
            </div>
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

        {/* Предупреждение об использовании моков */}
        {usingMockData && (
          <Row className="mb-3">
            <Col>
              <Alert variant="warning" className="mb-0">
                <Alert.Heading className="h6">Используются демонстрационные данные</Alert.Heading>
                <p className="mb-0">Сервер временно недоступен. Показаны примеры исторических объектов.</p>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Информация о количестве объектов */}
        <Row className="mb-3">
          <Col>
            <p className="objects-count">
              Найдено объектов: {filteredObjects.length}
            </p>
          </Col>
        </Row>

        {/* Сетка объектов */}
        <Row className="objects-grid">
          {filteredObjects.map((object) => (
            <Col key={object.ID} lg={4} md={6} className="mb-4">
              <ObjectCard
                object={object}
                onAddToCart={handleAddToCart}
              />
            </Col>
          ))}
        </Row>

        {/* Сообщение если ничего не найдено */}
        {filteredObjects.length === 0 && !loading && (
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