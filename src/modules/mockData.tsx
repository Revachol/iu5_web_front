export interface HistoricalObject {
  ID: number;
  Title: string;
  Description: string;
  Price: string;
  Value: string;
  HistoricalPeriod: string;
  HistoricalRegion: string;
  Source: string;
  Img: string;
}

export const historicalObjects: HistoricalObject[] = [
  {
    ID: 1,
    Title: "Кирпич строительный",
    Description: "Стандартный полнотелый кирпич ручной формовки",
    Price: "0.35 USD",
    Value: "шт",
    HistoricalPeriod: "1890",
    HistoricalRegion: "Российская Империя",
    Source: "Справочник архитектора 1895г.",
    Img: "images/mock/object_1.jpg",
  },
  {
    ID: 2,
    Title: "Свинец кровельный",
    Description: "Листовой свинец для кровли соборов",
    Price: "8.5 USD",
    Value: "лист",
    HistoricalPeriod: "2000",
    HistoricalRegion: "Средневековая Франция",
    Source: "Счетные книги Нотр-Дам",
    Img: "images/mock/object_2.jpg",
  },
  {
    ID: 3,
    Title: "Труд каменщика",
    Description: "Работа квалифицированного каменщика",
    Price: "25 USD",
    Value: "день",
    HistoricalPeriod: "1850",
    HistoricalRegion: "Викторианская Англия",
    Source: "Отчеты профсоюзов",
    Img: "images/mock/object_3.jpg",
  },
  {
    ID: 4,
    Title: "Мрамор пентелийский",
    Description: "Блок мрамора для строительства",
    Price: "150 USD",
    Value: "тонна",
    HistoricalPeriod: "-432",
    HistoricalRegion: "Древняя Греция",
    Source: "Смета Парфенона",
    Img: "images/mock/object_4.jpg",
  },
  {
    ID: 5,
    Title: "Масло льняное",
    Description: "Для изготовления масляных красок",
    Price: "15 USD",
    Value: "литр",
    HistoricalPeriod: "1640",
    HistoricalRegion: "Нидерланды",
    Source: "Счета мастерской Рембрандта",
    Img: "images/mock/object_5.png",
  },
  {
    ID: 6,
    Title: "Труд разнорабочего",
    Description: "Неквалифицированная работа на стройке",
    Price: "8 USD",
    Value: "час",
    HistoricalPeriod: "1932",
    HistoricalRegion: "США",
    Source: "Статистика Бюро труда",
    Img: "images/mock/object_6.jpg",
  },
];