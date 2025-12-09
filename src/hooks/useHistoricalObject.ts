// hooks/useHistoricalObject.ts
import { useState, useEffect } from 'react';
import type { HistoricalObject } from '../services/apiService';
import { apiService } from '../services/apiService';
import { mockHistoricalObjects } from '../services/mockData';

export const useHistoricalObject = (objectId: number) => {
  const [object, setObject] = useState<HistoricalObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const loadObject = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingMockData(false);
        console.log(`🔄 Loading historical object ${objectId}...`);
        
        const data = await apiService.getHistoricalObject(objectId);
        console.log(`✅ Object ${objectId} loaded successfully:`, data);
        setObject(data);
        
      } catch (err) {
        console.error(`❌ Load error for object ${objectId}, using mock data:`, err);
        
        // Пытаемся найти объект в моках
        const mockObject = mockHistoricalObjects.find(obj => obj.ID === objectId);
        
        if (mockObject) {
          setObject(mockObject);
          setError('Не удалось подключиться к серверу. Показаны демо-данные.');
          setUsingMockData(true);
        } else {
          setError(`Не удалось загрузить данные объекта`);
          setObject(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (objectId) {
      loadObject();
    }
  }, [objectId]);

  return { object, loading, error, usingMockData };
};