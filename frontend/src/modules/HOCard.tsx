// modules/HOCard
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { HistoricalObject } from '../modules/mockData';
import './HOCard.css';

interface ObjectCardProps {
  object: HistoricalObject;
  onAddToCart: (objectId: number) => void;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card className="object-card">
      <div className="card-image-container">
        <Card.Img 
          variant="top" 
          src={object.Img}
          className="object-image"
          onClick={() => navigate(`/historical_object/${object.ID}`)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'http://localhost:9000/iu5-web/img/placeholder-historical.jpg';
          }}
        />
      </div>
      <Card.Body className="card-body">
        <div className="price-section">
          <span className="price">{object.Price}</span>
          <span className="value"> / {object.Value}</span>
        </div>
        <Card.Title className="object-title">{object.Title}</Card.Title>
        {/* <Card.Text className="object-description">
          {object.Description.length > 120 
            ? `${object.Description.substring(0, 120)}...` 
            : object.Description
          }
        </Card.Text> */}
        {/* <div className="source-info">
          <small className="text-muted">Источник: {object.Source}</small>
        </div> */}
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