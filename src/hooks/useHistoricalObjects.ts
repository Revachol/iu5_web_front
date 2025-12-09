import { useState, useEffect } from 'react';
import type { HistoricalObject } from '../services/apiService';
import { apiService } from '../services/apiService';
import { mockHistoricalObjects } from '../services/mockData';

export const useHistoricalObjects = (searchTerm?: string) => {
  const [objects, setObjects] = useState<HistoricalObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const loadObjects = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingMockData(false);
        
        console.log('🔄 Loading historical objects...');
        const data = await apiService.getHistoricalObjects(searchTerm);
        console.log('✅ Data loaded:', data);
        setObjects(data);
        
      } catch (err) {
        console.error('❌ Failed to load from API, using mock data:', err);
        setError('Не удалось подключиться к серверу. Используются демо-данные.');
        setObjects(mockHistoricalObjects);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, [searchTerm]);

  return { objects, loading, error, usingMockData };
};