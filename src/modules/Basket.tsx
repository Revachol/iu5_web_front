// components/BasketIcon.tsx
import React from 'react';
import { useBasketCount } from '../hooks/useBasketCount';
import './Basket.css';

interface BasketIconProps {
  onBasketClick?: () => void;
}

const BasketIcon: React.FC<BasketIconProps> = ({ onBasketClick }) => {
  const { basketCount, isActive } = useBasketCount();

  const handleClick = () => {
    if (isActive && onBasketClick) {
      onBasketClick();
    }
  };

  return (
    <div className={`basket-container ${!isActive ? 'basket-inactive' : ''}`}>
      <div 
        className="basket-icon"
        onClick={handleClick}
        role={isActive ? 'button' : 'presentation'}
        tabIndex={isActive ? 0 : -1}
      >
        <img 
          src="http://localhost:9000/iu5-web/img/pngwing.com (1).png" 
          alt="Корзина"
          className="basket-image"
        />
        {basketCount > 0 && (
          <div className="basket-counter">
            {basketCount > 99 ? '99+' : basketCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketIcon;