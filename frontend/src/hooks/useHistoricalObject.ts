// hooks/useHistoricalObject.ts
import { useState, useEffect } from 'react';
import { type HistoricalObject, apiService } from '../services/apiService';

export const useHistoricalObject = (objectId: number) => {
  const [object, setObject] = useState<HistoricalObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObject = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`🔄 Loading historical object ${objectId}...`);
        
        const data = await apiService.getHistoricalObject(objectId);
        console.log(`✅ Object ${objectId} loaded successfully:`, data);
        setObject(data);
        
      } catch (err) {
        const errorMessage = `Не удалось загрузить данные объекта: ${err}`;
        console.error(`❌ Load error for object ${objectId}:`, err);
        setError(errorMessage);
        setObject(null);
      } finally {
        setLoading(false);
      }
    };

    if (objectId) {
      loadObject();
    }
  }, [objectId]);

  return { object, loading, error };
};