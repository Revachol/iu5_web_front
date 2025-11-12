import { useState, useEffect } from 'react';
import { HistoricalObject, apiService } from '../services/apiService';

export const useHistoricalObjects = (searchTerm?: string) => {
  const [objects, setObjects] = useState<HistoricalObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiService.getHistoricalObjects(searchTerm);
        setObjects(data);
        
      } catch (err) {
        setError('Не удалось загрузить данные');
        setObjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, [searchTerm]);

  return { objects, loading, error };
};