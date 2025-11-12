// modules/ObjectCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { HistoricalObject } from '../services/apiService';
import './HOCard.css';
import logo from '../assets/logo.svg';

interface ObjectCardProps {
  object: HistoricalObject;
  onAddToCart: (objectId: number) => void;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object, onAddToCart }) => {
  const navigate = useNavigate();

  // Форматируем заголовок
  const getFullTitle = (obj: HistoricalObject): string => {
    return `${obj.Name} (${obj.HistoricalRegion})`;
  };

  // Форматируем цену
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <Card className="object-card">
      <div
        className="card-image-container"
        onClick={() => navigate(`/historical_object/${object.ID}`)} // Navigate on image click
      >
        <Card.Img 
          variant="top" 
          src={object.ImageURL}
          className="object-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = logo;
          }}
        />
      </div>
      <Card.Body className="card-body">
        <div className="price-section">
          <span className="price">{formatPrice(object.PriceUSD)}</span>
          <span className="value"> / {object.Unit}</span>
        </div>
        <Card.Title className="object-title">{getFullTitle(object)}</Card.Title>
        <div className="object-meta">
          <small className="text-muted">Год: {object.HistoricalPeriod}</small>
        </div>
        <div className="card-buttons">
          <Button
            variant="outline-dark"
            className="detail-btn"
            onClick={() => navigate(`/historical_object/${object.ID}`)}
          >
            Подробнее
          </Button>
          <Button
            variant="dark"
            className="buy-btn"
            onClick={() => onAddToCart(object.ID)}
          >
            Купить
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ObjectCard;