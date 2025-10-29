// hooks/useHistoricalObjects.ts
import { useState, useEffect } from 'react';
import { HistoricalObject, fetchHistoricalObjects, fetchHistoricalObjectById } from '../services/apiService';

export const useHistoricalObjects = () => {
  const [objects, setObjects] = useState<HistoricalObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHistoricalObjects();
        setObjects(data);
      } catch (err) {
        setError('Не удалось загрузить данные');
        console.error('Error loading historical objects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadObjects();
  }, []);

  return { objects, loading, error };
};

export const useHistoricalObject = (id: number) => {
  const [object, setObject] = useState<HistoricalObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObject = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHistoricalObjectById(id);
        setObject(data);
      } catch (err) {
        setError('Не удалось загрузить данные объекта');
        console.error(`Error loading historical object ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadObject();
    }
  }, [id]);

  return { object, loading, error };
};