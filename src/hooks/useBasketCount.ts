import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useBasketCount = () => {
  const [basketCount, setBasketCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBasketCount = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Заглушка: вызываем endpoint, который пока ничего не вернет
        // В будущем здесь будет реальное количество
        const count = await apiService.getHistoricalEstimateCount();
        
        setBasketCount(count);
        setIsActive(count > 0);
        
      } catch (err) {
        console.error('❌ Failed to fetch basket count:', err);
        setError('Не удалось загрузить корзину');
        setBasketCount(0);
        setIsActive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBasketCount();
    
    // Опционально: обновляем каждые 5 секунд (можно убрать)
    const interval = setInterval(fetchBasketCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return { basketCount, isActive, loading, error };
};
