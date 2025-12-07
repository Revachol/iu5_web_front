// pages/HistoricalObjectsPage.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import ObjectCard from '../modules/HOCard';
import SearchForm from '../modules/SearchForm';
import BasketIcon from '../modules/Basket';
import { useHistoricalObjects } from '../hooks/useHistoricalObjects';
import { useSearchInput, useAppliedSearch } from '../slices/searchSlice';
import { useFiltersData } from '../hooks/useSearchData';
import './HistoricalObjectsPage.css';

const HistoricalObjectsPage: React.FC = () => {
  // Используем Redux для управления состоянием поиска
  const searchInput = useSearchInput();
  const appliedSearch = useAppliedSearch();
  const { setSearchInput, applySearch } = useFiltersData();
  
  const { objects, loading, usingMockData } = useHistoricalObjects(appliedSearch);

  // Временное состояние для корзины (пока неактивна)
  const [basketItems] = useState<number[]>([]);

  // Гарантируем, что filteredObjects всегда массив
  const filteredObjects = Array.isArray(objects) 
    ? objects.filter(obj => {
        if (!obj || typeof obj !== 'object') return false;
        
        // Если применен поиск, фильтруем по appliedSearch
        if (appliedSearch) {
          return (
            obj.Name?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
            obj.Description?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
            obj.HistoricalRegion?.toLowerCase().includes(appliedSearch.toLowerCase())
          );
        }
        
        // Если поиск не применен, показываем все объекты
        return true;
      })
    : [];

  const handleAddToCart = (objectId: number) => {
    console.log(`Added object ${objectId} to cart`);
    // TODO: Реализовать добавление в корзину
    // Пока просто логируем действие
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchApply = () => {
    applySearch();
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
              {usingMockData && (
                <Badge bg="warning" text="dark">
                  Демо-данные
                </Badge>
              )}
            </div>
            <p className="page-subtitle">
              Исследуйте уникальные исторические артефакты различных эпох и культур
            </p>
          </Col>
          <Col lg={4}>
            <SearchForm
              searchTerm={searchInput}
              onSearchChange={handleSearchChange}
              onSearchApply={handleSearchApply}
              placeholder="Поиск исторических объектов..."
            />
          </Col>
        </Row>

        {/* Показываем примененный поисковый запрос */}
        {appliedSearch && (
          <Row className="mb-2">
            <Col>
              <div className="applied-search-info">
                <small className="text-muted">
                  Поиск: "<strong>{appliedSearch}</strong>"
                  <button 
                    className="btn btn-sm btn-link text-muted p-0 ms-2"
                    onClick={() => {
                      setSearchInput('');
                      applySearch(); // Применяем пустой поиск чтобы сбросить
                    }}
                  >
                    × очистить
                  </button>
                </small>
              </div>
            </Col>
          </Row>
        )}

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

      {/* Иконка корзины (пока неактивна) */}
      <BasketIcon 
        itemCount={basketItems.length}
        isActive={false}
      />
    </div>
  );
};

export default HistoricalObjectsPage;