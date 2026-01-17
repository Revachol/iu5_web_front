// services/apiService.ts

// Интерфейс для данных из API (с новыми названиями полей)
interface HistoricalObjectAPI {
  ID: number;
  NameOfHistoricalObject: string;
  DescriptionOfHistoricalObject: string;
  PriceUSDOfHistoricalObject: number;
  UnitOfHistoricalObject: string;
  HistoricalPeriodOfHistoricalObject: string;
  HistoricalRegionOfHistoricalObject: string;
  DataSourceOfHistoricalObject: string;
  ImageURLOfHistoricalObject: string;
  IsActiveOfHistoricalObject: boolean;
  CreatedAtOfHistoricalObject: string;
}

// Интерфейс для использования в приложении (старые названия для совместимости)
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

// Функция маппинга из API формата в внутренний формат
function mapAPIObjectToInternal(apiObj: HistoricalObjectAPI): HistoricalObject {
  return {
    ID: apiObj.ID,
    Name: apiObj.NameOfHistoricalObject,
    Description: apiObj.DescriptionOfHistoricalObject,
    PriceUSD: apiObj.PriceUSDOfHistoricalObject,
    Unit: apiObj.UnitOfHistoricalObject,
    HistoricalPeriod: apiObj.HistoricalPeriodOfHistoricalObject,
    HistoricalRegion: apiObj.HistoricalRegionOfHistoricalObject,
    DataSource: apiObj.DataSourceOfHistoricalObject,
    ImageURL: apiObj.ImageURLOfHistoricalObject,
    IsActive: apiObj.IsActiveOfHistoricalObject,
    CreatedAt: apiObj.CreatedAtOfHistoricalObject,
  };
}

export class ApiService {
  private baseURL: string;

  constructor() {
    // Проверяем версию конфигурации и сбрасываем старый IP если нужно
    const configVersion = localStorage.getItem('api_config_version');
    const currentVersion = '2.0'; // Увеличиваем версию для сброса старых настроек
    
    if (configVersion !== currentVersion) {
      localStorage.setItem('api_config_version', currentVersion);
      localStorage.setItem('api_ip', 'localhost:80');
    }
    
    // Получаем IP из localStorage или используем дефолтный
    const savedIP = localStorage.getItem('api_ip') || 'localhost:80';
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
        url += `?title=${encodeURIComponent(searchTerm)}`;
      }

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
      const apiObjects: HistoricalObjectAPI[] = data.historical_objects || data.data || data.items || [];
      // Преобразуем данные из API формата в внутренний формат
      return apiObjects.map(mapAPIObjectToInternal);
      
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
      const apiObject: HistoricalObjectAPI = data.historical_object || data.data || data;
      // Преобразуем данные из API формата в внутренний формат
      return mapAPIObjectToInternal(apiObject);
      
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