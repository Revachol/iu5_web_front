import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Badge } from 'react-bootstrap';
import { useHistoricalObjects } from '../hooks/useHistoricalObjects';
import { Link } from 'react-router-dom';

const HistoricalObjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const { objects, loading, error } = useHistoricalObjects(appliedSearch);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setAppliedSearch('');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Загрузка объектов...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Поиск */}
      <Row className="mb-4">
        <Col md={8}>
          <h1>Каталог исторических объектов</h1>
          <p className="text-muted">
            Исследуйте уникальные исторические артефакты различных эпох и культур
          </p>
        </Col>
        <Col md={4}>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск объектов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="btn btn-primary"
              onClick={handleSearch}
            >
              🔍
            </button>
            {appliedSearch && (
              <button 
                className="btn btn-outline-secondary"
                onClick={clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        </Col>
      </Row>

      {/* Результаты поиска */}
      {appliedSearch && (
        <Row className="mb-3">
          <Col>
            <p>
              Результаты поиска: "{appliedSearch}"
              <button 
                className="btn btn-link p-0 ms-2"
                onClick={clearSearch}
              >
                (очистить)
              </button>
            </p>
          </Col>
        </Row>
      )}

      {/* Сетка объектов */}
      <Row>
        {objects.map((object) => (
          <Col key={object.ID} lg={4} md={6} className="mb-4">
            <Card className="h-100">
              {object.ImageURL && (
                <Card.Img 
                  variant="top" 
                  src={object.ImageURL} 
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{object.Name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {object.Description?.substring(0, 150)}...
                </Card.Text>
                <div className="mt-auto">
                  <Badge bg="secondary" className="me-2">
                    {object.HistoricalPeriod}
                  </Badge>
                  <Badge bg="info">
                    {object.HistoricalRegion}
                  </Badge>
                  <div className="mt-2">
                    <strong>{object.PriceUSD} USD</strong> за {object.Unit}
                  </div>
                  <Link 
                    to={`/historical_object/${object.ID}`}
                    className="btn btn-primary btn-sm mt-2 w-100"
                  >
                    Подробнее
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Сообщение если ничего не найдено */}
      {objects.length === 0 && !loading && (
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <h3>Объекты не найдены</h3>
              <p className="text-muted">Попробуйте изменить поисковый запрос</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HistoricalObjectsPage;