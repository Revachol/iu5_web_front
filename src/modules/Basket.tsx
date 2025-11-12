// components/BasketIcon.tsx
import React from 'react';
import './Basket.css';

interface BasketIconProps {
  itemCount?: number;
  isActive?: boolean;
}

const BasketIcon: React.FC<BasketIconProps> = ({ 
  itemCount = 0, 
  isActive = false 
}) => {
  return (
    <div className={`basket-container ${!isActive ? 'basket-inactive' : ''}`}>
      <div className="basket-icon">
        <img 
          src="http://localhost:9000/iu5-web/img/pngwing.com (1).png" 
          alt="Корзина"
          className="basket-image"
        />
        {itemCount > 0 && (
          <div className="basket-counter">
            {itemCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketIcon;