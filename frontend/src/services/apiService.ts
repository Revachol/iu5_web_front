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
  
  const API_BASE_URL = 'http://127.0.0.1/api';
  
  // Функция для получения всех исторических объектов
  export const fetchHistoricalObjects = async (): Promise<HistoricalObject[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/historical_objects`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching historical objects from API:', error);
      // Fallback на моки
      return getMockHistoricalObjects();
    }
  };
  
  // Функция для получения конкретного исторического объекта
  export const fetchHistoricalObjectById = async (id: number): Promise<HistoricalObject | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/historical_object/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching historical object ${id} from API:`, error);
      // Fallback на моки
      return getMockHistoricalObjectById(id);
    }
  };
  
  // Моки данных как fallback
  const getMockHistoricalObjects = (): HistoricalObject[] => {
    return [
      {
        ID: 1,
        Name: "Кирпич строительный",
        Description: "Стандартный полнотелый кирпич ручной формовки, производившийся на московских заводах в конце XIX века. Основной материал для капитального строительства доходных домов, промышленных зданий и общественных учреждений.",
        PriceUSD: 0.35,
        Unit: "шт",
        HistoricalPeriod: "1890",
        HistoricalRegion: "Российская Империя",
        DataSource: "«Справочник московского архитектора и инженера», 1895 г.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_1.jpg",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      },
      {
        ID: 2,
        Name: "Свинец кровельный",
        Description: "Листовой свинец, отлитый в стандартные пластины размером приблизительно 2 x 1 фут. Использовался для покрытия крыш и желобов готических соборов, обеспечивая водонепроницаемость.",
        PriceUSD: 8.5,
        Unit: "лист",
        HistoricalPeriod: "2000",
        HistoricalRegion: "Средневековая Франция",
        DataSource: "Счетные книги Собора Нотр-Дам де Пари (фрагменты), XIII век.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_2.jpg",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      },
      {
        ID: 3,
        Name: "Труд каменщика",
        Description: "Работа высококвалифицированного каменщика, занятого на возведении фасадов и несущих конструкций общественных зданий. В оплату включено пользование собственным набором инструментов.",
        PriceUSD: 25.8,
        Unit: "день",
        HistoricalPeriod: "1850",
        HistoricalRegion: "Викторианская Англия",
        DataSource: "Отчет Британского Министерства труда по заработной плате в строительстве, 1850 г.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_3.jpg",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      },
      {
        ID: 4,
        Name: "Мрамор пентелийский",
        Description: "Высококачественный белый мрамор с легким золотистым оттенком, добываемый в каменоломнях горы Пенделикон к северо-востоку от Афин. Был основным материалом для строительства Афинского акрополя.",
        PriceUSD: 180.0,
        Unit: "талант веса",
        HistoricalPeriod: "434-432 до н.э.",
        HistoricalRegion: "Древняя Греция",
        DataSource: "Строительные надписи (Афинский акрополь, учетные записи сметы Парфенона), ок. 434-432 гг. до н.э.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_4.jpg",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      },
      {
        ID: 5,
        Name: "Масло льняное для живописи",
        Description: "Очищенное льняное масло высшего качества, используемое в качестве связующего вещества для изготовления масляных красок. Продавалось в небольших пузырьках в специализированных лавках для художников и аптекарей.",
        PriceUSD: 0.15,
        Unit: "унция",
        HistoricalPeriod: "1656",
        HistoricalRegion: "Нидерланды, Золотой век",
        DataSource: "Опись имущества и счетные книги мастерской Рембрандта ван Рейна, Амстердам, 1656 г.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_5.png",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      },
      {
        ID: 6,
        Name: "Труд разнорабочего",
        Description: "Неквалифицированный физический труд на строительных работах: земляные работы, перенос материалов, подсобные операции. Работа часто была временной и низкооплачиваемой из-за огромного предложения рабочей силы в период экономического кризиса.",
        PriceUSD: 0.5,
        Unit: "час",
        HistoricalPeriod: "1932",
        HistoricalRegion: "США, Великая Депрессия",
        DataSource: "Статистика заработной платы Бюро трудовой статистики США (U.S. BLS), 1932 г.",
        ImageURL: "http://localhost:9000/iu5-web/img/object_6.jpg",
        IsActive: true,
        CreatedAt: "2025-09-30T13:37:56.519557Z"
      }
    ];
  };
  
  const getMockHistoricalObjectById = (id: number): HistoricalObject | null => {
    const objects = getMockHistoricalObjects();
    return objects.find(obj => obj.ID === id) || null;
  };