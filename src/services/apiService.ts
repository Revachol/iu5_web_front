// services/apiService.ts
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

class ApiService {
  private baseURL: string;

  constructor() {
    // Получаем IP из localStorage или используем дефолтный
    const savedIP = localStorage.getItem('api_ip') || '192.168.1.100:8000';
    this.baseURL = `http://${savedIP}/api`;
  }

  setIPAddress(ip: string) {
    localStorage.setItem('api_ip', ip);
    this.baseURL = `http://${ip}/api`;
  }

  async getHistoricalObjects(searchTerm?: string): Promise<HistoricalObject[]> {
    try {
      let url = `${this.baseURL}/historical_objects`;
      if (searchTerm) {
        url += `?name=${encodeURIComponent(searchTerm)}`;
      }

      console.log('📡 Fetching from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.historical_objects || data.data || data.items || [];
      
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  }

  async getHistoricalObject(id: number): Promise<HistoricalObject> {
    try {
      const response = await fetch(`${this.baseURL}/historical_object/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.historical_object || data.data || data;
      
    } catch (error) {
      console.error(`❌ Error fetching object ${id}:`, error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/historical_objects`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const apiService = new ApiService();