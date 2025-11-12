// hooks/useHistoricalObjects.ts
import { useState, useEffect } from 'react';
import { type HistoricalObject, apiService } from '../services/apiService';
import { mockHistoricalObjects } from '../services/mockData';

export const useHistoricalObjects = (searchTerm?: string) => {
  const [objects, setObjects] = useState<HistoricalObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState<boolean>(false);

  useEffect(() => {
    const loadObjects = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingMockData(false);
        console.log('🔄 Loading historical objects...', searchTerm ? `with search: "${searchTerm}"` : '');
        
        // Передаем параметры поиска в API
        const filters = searchTerm ? { name: searchTerm } : {};
        const data = await apiService.getHistoricalObjects(filters);
        console.log('✅ Objects loaded successfully:', data);
        console.log('✅ Objects count:', data.length);
        
        // Проверяем, используем ли мы моки (по количеству объектов)
        const isUsingMocks = data.length <= mockHistoricalObjects.length && 
                             data.every(obj => obj.ID <= mockHistoricalObjects.length);
        
        if (isUsingMocks) {
          console.log('🟠 Using mock data');
          setUsingMockData(true);
        }
        
        // Гарантируем, что это массив
        const objectsArray = Array.isArray(data) ? data : [];
        setObjects(objectsArray);
        
      } catch (err) {
        const errorMessage = `Не удалось загрузить данные: ${err}`;
        console.error('❌ Load error:', err);
        setError(errorMessage);
        setUsingMockData(true);
        
        // При использовании моков фильтруем данные локально
        let filteredMockData = mockHistoricalObjects;
        if (searchTerm) {
          filteredMockData = mockHistoricalObjects.filter(obj =>
            obj.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            obj.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            obj.HistoricalRegion?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setObjects(filteredMockData);
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, [searchTerm]); // Добавляем searchTerm в зависимости

  return { objects, loading, error, usingMockData };
};

export const useHistoricalObject = (objectId: number) => {
  const [object, setObject] = useState<HistoricalObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState<boolean>(false);

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
        const errorMessage = `Не удалось загрузить данные объекта: ${err}`;
        console.error(`❌ Load error for object ${objectId}:`, err);
        setError(errorMessage);
        setUsingMockData(true);
        const mockObject = mockHistoricalObjects.find(obj => obj.ID === objectId) || mockHistoricalObjects[0];
        setObject(mockObject);
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