export interface CityConfig {
  name: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  population?: number;
  keywords: string[];
}

export const CITIES_CONFIG: CityConfig[] = [
  // Крупные города России
  {
    name: 'Москва',
    region: 'Московская область',
    coordinates: { latitude: 55.7558, longitude: 37.6176 },
    population: 12600000,
    keywords: ['Москва', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Санкт-Петербург',
    region: 'Ленинградская область',
    coordinates: { latitude: 59.9311, longitude: 30.3609 },
    population: 5400000,
    keywords: ['Санкт-Петербург', 'Ленинградская область', 'Северо-Западный федеральный округ', 'СПб']
  },
  {
    name: 'Екатеринбург',
    region: 'Свердловская область',
    coordinates: { latitude: 56.8431, longitude: 60.6454 },
    population: 1500000,
    keywords: ['Екатеринбург', 'Свердловская область', 'Уральский федеральный округ']
  },
  {
    name: 'Новосибирск',
    region: 'Новосибирская область',
    coordinates: { latitude: 55.0084, longitude: 82.9357 },
    population: 1600000,
    keywords: ['Новосибирск', 'Новосибирская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Нижний Новгород',
    region: 'Нижегородская область',
    coordinates: { latitude: 56.2965, longitude: 43.9361 },
    population: 1200000,
    keywords: ['Нижний Новгород', 'Нижегородская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Казань',
    region: 'Республика Татарстан',
    coordinates: { latitude: 55.8304, longitude: 49.0661 },
    population: 1200000,
    keywords: ['Казань', 'Татарстан', 'Приволжский федеральный округ']
  },
  {
    name: 'Челябинск',
    region: 'Челябинская область',
    coordinates: { latitude: 55.1644, longitude: 61.4368 },
    population: 1200000,
    keywords: ['Челябинск', 'Челябинская область', 'Уральский федеральный округ']
  },
  {
    name: 'Омск',
    region: 'Омская область',
    coordinates: { latitude: 54.9885, longitude: 73.3242 },
    population: 1100000,
    keywords: ['Омск', 'Омская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Самара',
    region: 'Самарская область',
    coordinates: { latitude: 53.2001, longitude: 50.1500 },
    population: 1100000,
    keywords: ['Самара', 'Самарская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Ростов-на-Дону',
    region: 'Ростовская область',
    coordinates: { latitude: 47.2357, longitude: 39.7015 },
    population: 1100000,
    keywords: ['Ростов-на-Дону', 'Ростовская область', 'Южный федеральный округ']
  },
  {
    name: 'Уфа',
    region: 'Республика Башкортостан',
    coordinates: { latitude: 54.7388, longitude: 55.9721 },
    population: 1100000,
    keywords: ['Уфа', 'Башкортостан', 'Приволжский федеральный округ']
  },
  {
    name: 'Красноярск',
    region: 'Красноярский край',
    coordinates: { latitude: 56.0184, longitude: 92.8672 },
    population: 1000000,
    keywords: ['Красноярск', 'Красноярский край', 'Сибирский федеральный округ']
  },
  {
    name: 'Воронеж',
    region: 'Воронежская область',
    coordinates: { latitude: 51.6720, longitude: 39.1843 },
    population: 1000000,
    keywords: ['Воронеж', 'Воронежская область', 'Центральный федеральный округ']
  },
  {
    name: 'Пермь',
    region: 'Пермский край',
    coordinates: { latitude: 58.0105, longitude: 56.2502 },
    population: 1000000,
    keywords: ['Пермь', 'Пермский край', 'Приволжский федеральный округ']
  },
  {
    name: 'Волгоград',
    region: 'Волгоградская область',
    coordinates: { latitude: 48.7080, longitude: 44.5133 },
    population: 1000000,
    keywords: ['Волгоград', 'Волгоградская область', 'Южный федеральный округ']
  },
  {
    name: 'Краснодар',
    region: 'Краснодарский край',
    coordinates: { latitude: 45.0448, longitude: 38.9760 },
    population: 900000,
    keywords: ['Краснодар', 'Краснодарский край', 'Южный федеральный округ']
  },
  {
    name: 'Саратов',
    region: 'Саратовская область',
    coordinates: { latitude: 51.5406, longitude: 46.0086 },
    population: 800000,
    keywords: ['Саратов', 'Саратовская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Тюмень',
    region: 'Тюменская область',
    coordinates: { latitude: 57.1522, longitude: 65.5272 },
    population: 800000,
    keywords: ['Тюмень', 'Тюменская область', 'Уральский федеральный округ']
  },
  {
    name: 'Тольятти',
    region: 'Самарская область',
    coordinates: { latitude: 53.5303, longitude: 49.3461 },
    population: 700000,
    keywords: ['Тольятти', 'Самарская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Ижевск',
    region: 'Удмуртская Республика',
    coordinates: { latitude: 56.8528, longitude: 53.2115 },
    population: 600000,
    keywords: ['Ижевск', 'Удмуртия', 'Приволжский федеральный округ']
  },
  {
    name: 'Барнаул',
    region: 'Алтайский край',
    coordinates: { latitude: 53.3606, longitude: 83.7546 },
    population: 600000,
    keywords: ['Барнаул', 'Алтайский край', 'Сибирский федеральный округ']
  },
  {
    name: 'Ульяновск',
    region: 'Ульяновская область',
    coordinates: { latitude: 54.3142, longitude: 48.4032 },
    population: 600000,
    keywords: ['Ульяновск', 'Ульяновская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Иркутск',
    region: 'Иркутская область',
    coordinates: { latitude: 52.2871, longitude: 104.3056 },
    population: 600000,
    keywords: ['Иркутск', 'Иркутская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Хабаровск',
    region: 'Хабаровский край',
    coordinates: { latitude: 48.4827, longitude: 135.0840 },
    population: 600000,
    keywords: ['Хабаровск', 'Хабаровский край', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Ярославль',
    region: 'Ярославская область',
    coordinates: { latitude: 57.6261, longitude: 39.8845 },
    population: 600000,
    keywords: ['Ярославль', 'Ярославская область', 'Центральный федеральный округ']
  },
  {
    name: 'Владивосток',
    region: 'Приморский край',
    coordinates: { latitude: 43.1056, longitude: 131.8735 },
    population: 600000,
    keywords: ['Владивосток', 'Приморский край', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Махачкала',
    region: 'Республика Дагестан',
    coordinates: { latitude: 42.9831, longitude: 47.5047 },
    population: 600000,
    keywords: ['Махачкала', 'Дагестан', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Томск',
    region: 'Томская область',
    coordinates: { latitude: 56.4846, longitude: 84.9476 },
    population: 500000,
    keywords: ['Томск', 'Томская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Оренбург',
    region: 'Оренбургская область',
    coordinates: { latitude: 51.7727, longitude: 55.0988 },
    population: 500000,
    keywords: ['Оренбург', 'Оренбургская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Кемерово',
    region: 'Кемеровская область',
    coordinates: { latitude: 55.3541, longitude: 86.0898 },
    population: 500000,
    keywords: ['Кемерово', 'Кемеровская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Рязань',
    region: 'Рязанская область',
    coordinates: { latitude: 54.6269, longitude: 39.6916 },
    population: 500000,
    keywords: ['Рязань', 'Рязанская область', 'Центральный федеральный округ']
  },
  {
    name: 'Набережные Челны',
    region: 'Республика Татарстан',
    coordinates: { latitude: 55.7436, longitude: 52.3958 },
    population: 500000,
    keywords: ['Набережные Челны', 'Татарстан', 'Приволжский федеральный округ']
  },
  {
    name: 'Астрахань',
    region: 'Астраханская область',
    coordinates: { latitude: 46.3497, longitude: 48.0408 },
    population: 500000,
    keywords: ['Астрахань', 'Астраханская область', 'Южный федеральный округ']
  },
  {
    name: 'Пенза',
    region: 'Пензенская область',
    coordinates: { latitude: 53.2007, longitude: 45.0046 },
    population: 500000,
    keywords: ['Пенза', 'Пензенская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Липецк',
    region: 'Липецкая область',
    coordinates: { latitude: 52.6088, longitude: 39.5992 },
    population: 500000,
    keywords: ['Липецк', 'Липецкая область', 'Центральный федеральный округ']
  },
  {
    name: 'Тула',
    region: 'Тульская область',
    coordinates: { latitude: 54.1961, longitude: 37.6182 },
    population: 500000,
    keywords: ['Тула', 'Тульская область', 'Центральный федеральный округ']
  },
  {
    name: 'Киров',
    region: 'Кировская область',
    coordinates: { latitude: 58.6036, longitude: 49.6680 },
    population: 500000,
    keywords: ['Киров', 'Кировская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Чебоксары',
    region: 'Чувашская Республика',
    coordinates: { latitude: 56.1439, longitude: 47.2489 },
    population: 500000,
    keywords: ['Чебоксары', 'Чувашия', 'Приволжский федеральный округ']
  },
  {
    name: 'Калининград',
    region: 'Калининградская область',
    coordinates: { latitude: 54.7065, longitude: 20.5110 },
    population: 400000,
    keywords: ['Калининград', 'Калининградская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Брянск',
    region: 'Брянская область',
    coordinates: { latitude: 53.2434, longitude: 34.3654 },
    population: 400000,
    keywords: ['Брянск', 'Брянская область', 'Центральный федеральный округ']
  },
  {
    name: 'Курск',
    region: 'Курская область',
    coordinates: { latitude: 51.7373, longitude: 36.1874 },
    population: 400000,
    keywords: ['Курск', 'Курская область', 'Центральный федеральный округ']
  },
  {
    name: 'Иваново',
    region: 'Ивановская область',
    coordinates: { latitude: 56.9972, longitude: 40.9714 },
    population: 400000,
    keywords: ['Иваново', 'Ивановская область', 'Центральный федеральный округ']
  },
  {
    name: 'Магнитогорск',
    region: 'Челябинская область',
    coordinates: { latitude: 53.4186, longitude: 59.0472 },
    population: 400000,
    keywords: ['Магнитогорск', 'Челябинская область', 'Уральский федеральный округ']
  },
  {
    name: 'Тверь',
    region: 'Тверская область',
    coordinates: { latitude: 56.8584, longitude: 35.9089 },
    population: 400000,
    keywords: ['Тверь', 'Тверская область', 'Центральный федеральный округ']
  },
  {
    name: 'Ставрополь',
    region: 'Ставропольский край',
    coordinates: { latitude: 45.0445, longitude: 41.9690 },
    population: 400000,
    keywords: ['Ставрополь', 'Ставропольский край', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Нижний Тагил',
    region: 'Свердловская область',
    coordinates: { latitude: 57.9101, longitude: 59.9815 },
    population: 350000,
    keywords: ['Нижний Тагил', 'Свердловская область', 'Уральский федеральный округ']
  },
  {
    name: 'Белгород',
    region: 'Белгородская область',
    coordinates: { latitude: 50.5958, longitude: 36.5873 },
    population: 350000,
    keywords: ['Белгород', 'Белгородская область', 'Центральный федеральный округ']
  },
  {
    name: 'Архангельск',
    region: 'Архангельская область',
    coordinates: { latitude: 64.5401, longitude: 40.5433 },
    population: 350000,
    keywords: ['Архангельск', 'Архангельская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Владимир',
    region: 'Владимирская область',
    coordinates: { latitude: 56.1290, longitude: 40.4070 },
    population: 350000,
    keywords: ['Владимир', 'Владимирская область', 'Центральный федеральный округ']
  },
  {
    name: 'Сочи',
    region: 'Краснодарский край',
    coordinates: { latitude: 43.5855, longitude: 39.7231 },
    population: 350000,
    keywords: ['Сочи', 'Краснодарский край', 'Южный федеральный округ']
  },
  {
    name: 'Курган',
    region: 'Курганская область',
    coordinates: { latitude: 55.4442, longitude: 65.3141 },
    population: 300000,
    keywords: ['Курган', 'Курганская область', 'Уральский федеральный округ']
  },
  {
    name: 'Смоленск',
    region: 'Смоленская область',
    coordinates: { latitude: 54.7818, longitude: 32.0401 },
    population: 300000,
    keywords: ['Смоленск', 'Смоленская область', 'Центральный федеральный округ']
  },
  {
    name: 'Калуга',
    region: 'Калужская область',
    coordinates: { latitude: 54.5293, longitude: 36.2754 },
    population: 300000,
    keywords: ['Калуга', 'Калужская область', 'Центральный федеральный округ']
  },
  {
    name: 'Чита',
    region: 'Забайкальский край',
    coordinates: { latitude: 52.0339, longitude: 113.4994 },
    population: 300000,
    keywords: ['Чита', 'Забайкальский край', 'Сибирский федеральный округ']
  },
  {
    name: 'Орёл',
    region: 'Орловская область',
    coordinates: { latitude: 52.9671, longitude: 36.0696 },
    population: 300000,
    keywords: ['Орёл', 'Орловская область', 'Центральный федеральный округ']
  },
  {
    name: 'Волжский',
    region: 'Волгоградская область',
    coordinates: { latitude: 48.7858, longitude: 44.7797 },
    population: 300000,
    keywords: ['Волжский', 'Волгоградская область', 'Южный федеральный округ']
  },
  {
    name: 'Череповец',
    region: 'Вологодская область',
    coordinates: { latitude: 59.1265, longitude: 37.9092 },
    population: 300000,
    keywords: ['Череповец', 'Вологодская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Мурманск',
    region: 'Мурманская область',
    coordinates: { latitude: 68.9585, longitude: 33.0827 },
    population: 300000,
    keywords: ['Мурманск', 'Мурманская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Сургут',
    region: 'Ханты-Мансийский автономный округ',
    coordinates: { latitude: 61.2540, longitude: 73.3962 },
    population: 300000,
    keywords: ['Сургут', 'ХМАО', 'Уральский федеральный округ']
  },
  {
    name: 'Вологда',
    region: 'Вологодская область',
    coordinates: { latitude: 59.2205, longitude: 39.8915 },
    population: 300000,
    keywords: ['Вологда', 'Вологодская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Владикавказ',
    region: 'Республика Северная Осетия',
    coordinates: { latitude: 43.0241, longitude: 44.6814 },
    population: 300000,
    keywords: ['Владикавказ', 'Северная Осетия', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Саранск',
    region: 'Республика Мордовия',
    coordinates: { latitude: 54.1874, longitude: 45.1839 },
    population: 300000,
    keywords: ['Саранск', 'Мордовия', 'Приволжский федеральный округ']
  },
  {
    name: 'Тамбов',
    region: 'Тамбовская область',
    coordinates: { latitude: 52.7212, longitude: 41.4523 },
    population: 300000,
    keywords: ['Тамбов', 'Тамбовская область', 'Центральный федеральный округ']
  },
  {
    name: 'Стерлитамак',
    region: 'Республика Башкортостан',
    coordinates: { latitude: 53.6333, longitude: 55.9500 },
    population: 280000,
    keywords: ['Стерлитамак', 'Башкортостан', 'Приволжский федеральный округ']
  },
  {
    name: 'Грозный',
    region: 'Чеченская Республика',
    coordinates: { latitude: 43.3178, longitude: 45.6949 },
    population: 280000,
    keywords: ['Грозный', 'Чечня', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Якутск',
    region: 'Республика Саха (Якутия)',
    coordinates: { latitude: 62.0339, longitude: 129.7331 },
    population: 280000,
    keywords: ['Якутск', 'Якутия', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Кострома',
    region: 'Костромская область',
    coordinates: { latitude: 57.7665, longitude: 40.9269 },
    population: 270000,
    keywords: ['Кострома', 'Костромская область', 'Центральный федеральный округ']
  },
  {
    name: 'Комсомольск-на-Амуре',
    region: 'Хабаровский край',
    coordinates: { latitude: 50.5503, longitude: 137.0099 },
    population: 250000,
    keywords: ['Комсомольск-на-Амуре', 'Хабаровский край', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Петрозаводск',
    region: 'Республика Карелия',
    coordinates: { latitude: 61.7849, longitude: 34.3469 },
    population: 250000,
    keywords: ['Петрозаводск', 'Карелия', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Таганрог',
    region: 'Ростовская область',
    coordinates: { latitude: 47.2364, longitude: 39.7015 },
    population: 250000,
    keywords: ['Таганрог', 'Ростовская область', 'Южный федеральный округ']
  },
  {
    name: 'Нижневартовск',
    region: 'Ханты-Мансийский автономный округ',
    coordinates: { latitude: 60.9394, longitude: 76.5694 },
    population: 250000,
    keywords: ['Нижневартовск', 'ХМАО', 'Уральский федеральный округ']
  },
  {
    name: 'Йошкар-Ола',
    region: 'Республика Марий Эл',
    coordinates: { latitude: 56.6324, longitude: 47.8959 },
    population: 250000,
    keywords: ['Йошкар-Ола', 'Марий Эл', 'Приволжский федеральный округ']
  },
  {
    name: 'Братск',
    region: 'Иркутская область',
    coordinates: { latitude: 56.1514, longitude: 101.6342 },
    population: 230000,
    keywords: ['Братск', 'Иркутская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Новороссийск',
    region: 'Краснодарский край',
    coordinates: { latitude: 44.7235, longitude: 37.7686 },
    population: 230000,
    keywords: ['Новороссийск', 'Краснодарский край', 'Южный федеральный округ']
  },
  {
    name: 'Шахты',
    region: 'Ростовская область',
    coordinates: { latitude: 47.7085, longitude: 40.2159 },
    population: 230000,
    keywords: ['Шахты', 'Ростовская область', 'Южный федеральный округ']
  },
  {
    name: 'Дзержинск',
    region: 'Нижегородская область',
    coordinates: { latitude: 56.2376, longitude: 43.4599 },
    population: 230000,
    keywords: ['Дзержинск', 'Нижегородская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Орск',
    region: 'Оренбургская область',
    coordinates: { latitude: 51.2296, longitude: 58.5704 },
    population: 230000,
    keywords: ['Орск', 'Оренбургская область', 'Приволжский федеральный округ']
  },
  {
    name: 'Ангарск',
    region: 'Иркутская область',
    coordinates: { latitude: 52.5448, longitude: 103.8880 },
    population: 220000,
    keywords: ['Ангарск', 'Иркутская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Благовещенск',
    region: 'Амурская область',
    coordinates: { latitude: 50.2907, longitude: 127.5272 },
    population: 220000,
    keywords: ['Благовещенск', 'Амурская область', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Псков',
    region: 'Псковская область',
    coordinates: { latitude: 57.8194, longitude: 28.3318 },
    population: 200000,
    keywords: ['Псков', 'Псковская область', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Бийск',
    region: 'Алтайский край',
    coordinates: { latitude: 52.5186, longitude: 85.2551 },
    population: 200000,
    keywords: ['Бийск', 'Алтайский край', 'Сибирский федеральный округ']
  },
  {
    name: 'Прокопьевск',
    region: 'Кемеровская область',
    coordinates: { latitude: 53.9062, longitude: 86.7196 },
    population: 200000,
    keywords: ['Прокопьевск', 'Кемеровская область', 'Сибирский федеральный округ']
  },
  {
    name: 'Химки',
    region: 'Московская область',
    coordinates: { latitude: 55.8970, longitude: 37.4297 },
    population: 200000,
    keywords: ['Химки', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Пальмира',
    region: 'Московская область',
    coordinates: { latitude: 55.4307, longitude: 37.5453 },
    population: 200000,
    keywords: ['Пальмира', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Балашиха',
    region: 'Московская область',
    coordinates: { latitude: 55.8094, longitude: 37.9581 },
    population: 200000,
    keywords: ['Балашиха', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Подольск',
    region: 'Московская область',
    coordinates: { latitude: 55.4319, longitude: 37.5458 },
    population: 200000,
    keywords: ['Подольск', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Королёв',
    region: 'Московская область',
    coordinates: { latitude: 55.9142, longitude: 37.8255 },
    population: 200000,
    keywords: ['Королёв', 'Московская область', 'Центральный федеральный округ']
  },
  {
    name: 'Сыктывкар',
    region: 'Республика Коми',
    coordinates: { latitude: 61.6612, longitude: 50.8136 },
    population: 200000,
    keywords: ['Сыктывкар', 'Коми', 'Северо-Западный федеральный округ']
  },
  {
    name: 'Стерлитамак',
    region: 'Республика Башкортостан',
    coordinates: { latitude: 53.6333, longitude: 55.9500 },
    population: 200000,
    keywords: ['Стерлитамак', 'Башкортостан', 'Приволжский федеральный округ']
  },
  {
    name: 'Петропавловск-Камчатский',
    region: 'Камчатский край',
    coordinates: { latitude: 53.0195, longitude: 158.6507 },
    population: 180000,
    keywords: ['Петропавловск-Камчатский', 'Камчатка', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Майкоп',
    region: 'Республика Адыгея',
    coordinates: { latitude: 44.6098, longitude: 40.1006 },
    population: 180000,
    keywords: ['Майкоп', 'Адыгея', 'Южный федеральный округ']
  },
  {
    name: 'Нальчик',
    region: 'Кабардино-Балкарская Республика',
    coordinates: { latitude: 43.4853, longitude: 43.6071 },
    population: 180000,
    keywords: ['Нальчик', 'Кабардино-Балкария', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Черкесск',
    region: 'Карачаево-Черкесская Республика',
    coordinates: { latitude: 44.2264, longitude: 42.0468 },
    population: 180000,
    keywords: ['Черкесск', 'Карачаево-Черкесия', 'Северо-Кавказский федеральный округ']
  },
  {
    name: 'Элиста',
    region: 'Республика Калмыкия',
    coordinates: { latitude: 46.3077, longitude: 44.2558 },
    population: 180000,
    keywords: ['Элиста', 'Калмыкия', 'Южный федеральный округ']
  },
  {
    name: 'Улан-Удэ',
    region: 'Республика Бурятия',
    coordinates: { latitude: 51.8335, longitude: 107.5841 },
    population: 180000,
    keywords: ['Улан-Удэ', 'Бурятия', 'Сибирский федеральный округ']
  },
  {
    name: 'Абакан',
    region: 'Республика Хакасия',
    coordinates: { latitude: 53.7212, longitude: 91.4424 },
    population: 180000,
    keywords: ['Абакан', 'Хакасия', 'Сибирский федеральный округ']
  },
  {
    name: 'Горно-Алтайск',
    region: 'Республика Алтай',
    coordinates: { latitude: 51.9581, longitude: 85.9603 },
    population: 180000,
    keywords: ['Горно-Алтайск', 'Алтай', 'Сибирский федеральный округ']
  },
  {
    name: 'Кызыл',
    region: 'Республика Тыва',
    coordinates: { latitude: 51.7194, longitude: 94.4378 },
    population: 180000,
    keywords: ['Кызыл', 'Тыва', 'Сибирский федеральный округ']
  },
  {
    name: 'Магадан',
    region: 'Магаданская область',
    coordinates: { latitude: 59.5682, longitude: 150.8085 },
    population: 180000,
    keywords: ['Магадан', 'Магаданская область', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Южно-Сахалинск',
    region: 'Сахалинская область',
    coordinates: { latitude: 46.9593, longitude: 142.7381 },
    population: 180000,
    keywords: ['Южно-Сахалинск', 'Сахалин', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Анадырь',
    region: 'Чукотский автономный округ',
    coordinates: { latitude: 64.7361, longitude: 177.5105 },
    population: 180000,
    keywords: ['Анадырь', 'Чукотка', 'Дальневосточный федеральный округ']
  },
  {
    name: 'Салехард',
    region: 'Ямало-Ненецкий автономный округ',
    coordinates: { latitude: 66.5299, longitude: 66.6140 },
    population: 180000,
    keywords: ['Салехард', 'ЯНАО', 'Уральский федеральный округ']
  },
  {
    name: 'Нарьян-Мар',
    region: 'Ненецкий автономный округ',
    coordinates: { latitude: 67.6381, longitude: 53.0067 },
    population: 180000,
    keywords: ['Нарьян-Мар', 'НАО', 'Северо-Западный федеральный округ']
  }
];

// Функция для получения города по названию
export function getCityByName(name: string): CityConfig | undefined {
  return CITIES_CONFIG.find(city => 
    city.name.toLowerCase() === name.toLowerCase() ||
    city.keywords.some(keyword => keyword.toLowerCase() === name.toLowerCase())
  );
}

// Функция для получения всех городов региона
export function getCitiesByRegion(region: string): CityConfig[] {
  return CITIES_CONFIG.filter(city => 
    city.region.toLowerCase().includes(region.toLowerCase()) ||
    city.keywords.some(keyword => keyword.toLowerCase().includes(region.toLowerCase()))
  );
}

// Функция для получения топ-N городов по населению
export function getTopCitiesByPopulation(limit: number = 50): CityConfig[] {
  return CITIES_CONFIG
    .filter(city => city.population)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, limit);
}
