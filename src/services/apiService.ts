// services/apiService.ts
import { mockHistoricalObjects } from './mockData';

export interface HistoricalObject {
  ID: number;
  Name: string;
  Description: string;
  PriceUSD: number;
  Unit: string;
  HistoricalPeriod: string;
  HistoricalRegion: string;
  DataSource: string;
  ImageURL: string;
  IsActive: boolean;
  CreatedAt: string;
}

export interface HOFilters {
  name?: string;
}

class ApiService {
  async getHistoricalObjects(filters: HOFilters = {}): Promise<HistoricalObject[]> {
    try {
      console.log('📥 Fetching historical objects from API...', filters);
      
      // Создаем URL с параметрами фильтрации
      const url = new URL('/api/historical_objects', window.location.origin);
      
      if (filters.name) {
        url.searchParams.append('name', filters.name);
      }
      
      console.log('🔵 Fetching from URL:', url.toString());
      const response = await fetch(url.toString());
      
      console.log('🔵 Response status:', response.status);
      console.log('🔵 Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🟢 API response received:', data);
      
      // Извлекаем массив объектов из поля historical_objects
      const historicalObjects = data.historical_objects || data.data || data.items || [];
      
      console.log('🟢 Extracted historical objects:', historicalObjects);
      console.log('🟢 Number of objects from API:', historicalObjects.length);
      
      // Гарантируем, что возвращаем массив
      return Array.isArray(historicalObjects) ? historicalObjects : [];
      
    } catch (error) {
      console.error('❌ Error fetching from API, using mock data:', error);
      console.log('🟠 Returning mock data with', mockHistoricalObjects.length, 'objects');
      
      // При использовании моков фильтруем данные локально
      return this.getMockHistoricalObjects(filters);
    }
  }

  async getHistoricalObject(id: number): Promise<HistoricalObject> {
    try {
      console.log(`📥 Fetching historical object ${id} from API...`);
      const response = await fetch(`/api/historical_object/${id}`);
      
      console.log('🔵 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🟢 API object response:', data);
      
      // Извлекаем объект из ответа (может быть напрямую объект или в поле)
      const historicalObject = data.historical_object || data.data || data;
      
      return historicalObject;
    } catch (error) {
      console.error(`❌ Error fetching object ${id} from API, using mock:`, error);
      const mockObject = mockHistoricalObjects.find(obj => obj.ID === id) || mockHistoricalObjects[0];
      console.log('🟠 Returning mock object:', mockObject);
      return mockObject;
    }
  }

  // Метод для фильтрации моковых данных
  private getMockHistoricalObjects(filters: HOFilters = {}): HistoricalObject[] {
    let filteredData = mockHistoricalObjects;

    if (filters.name) {
      const searchTerm = filters.name.toLowerCase();
      filteredData = mockHistoricalObjects.filter(obj =>
        obj.Name?.toLowerCase().includes(searchTerm) ||
        obj.Description?.toLowerCase().includes(searchTerm) ||
        obj.HistoricalRegion?.toLowerCase().includes(searchTerm)
      );
    }

    console.log('🟠 Filtered mock data:', filteredData.length, 'objects');
    return filteredData;
  }
}

export const apiService = new ApiService();