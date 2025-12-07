import { useState, useEffect } from 'react';
import type { HistoricalObject } from '../services/apiService';
import { apiService } from '../services/apiService';

console.log('🔍 [useHistoricalObjects.ts] Module loaded');
console.log('🔍 [useHistoricalObjects.ts] apiService:', apiService);

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