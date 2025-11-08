import { BRAND_CONFIG } from '../constants';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogType?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogPrice?: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  yandexVerification?: string;
}

export const SEO_CONFIG: Record<string, SEOConfig> = {
  // Главная страница
  home: {
    title: `${BRAND_CONFIG.name} - Пригон автомобилей из Европы в ${BRAND_CONFIG.address} и по всей России`,
    description: `${BRAND_CONFIG.name} - компания по пригону авто из Европы в ${BRAND_CONFIG.address} и по всей России. Подбор, покупка, доставка и растаможка автомобилей под ключ. Гарантия прозрачности сделки и выгодные условия.`,
    keywords: `пригон авто ${BRAND_CONFIG.address}, авто из Европы по всей России, купить авто ${BRAND_CONFIG.address}, растаможка, доставка авто, автомобили под ключ, ${BRAND_CONFIG.name}, пригон авто Россия`,
    canonical: `${BRAND_CONFIG.website}/`,
    ogType: 'website',
    ogTitle: `${BRAND_CONFIG.name} - Авто из Европы в ${BRAND_CONFIG.address} и по всей России`,
    ogDescription: `Пригон авто из Европы в ${BRAND_CONFIG.address} и по всей России с ${BRAND_CONFIG.name}. Подбор, доставка и растаможка. Надежно и выгодно.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `${BRAND_CONFIG.name} - Пригон авто в ${BRAND_CONFIG.address} и по России`,
    twitterDescription: `Купи автомобиль из Европы в ${BRAND_CONFIG.address} и по всей России с ${BRAND_CONFIG.name}. Подбор, доставка, растаможка и оформление под ключ.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Страница поиска
  search: {
    title: `Поиск автомобилей из Европы в ${BRAND_CONFIG.address} и по всей России | ${BRAND_CONFIG.name}`,
    description: `Поиск автомобилей для пригона из Европы в ${BRAND_CONFIG.address} и по всей России. Удобные фильтры по марке, модели, году, цене и характеристикам. ${BRAND_CONFIG.name} - пригон под ключ по России.`,
    keywords: `поиск авто Европа ${BRAND_CONFIG.address}, каталог автомобилей по России, пригон машин, купить авто из Европы ${BRAND_CONFIG.address}, ${BRAND_CONFIG.name}, доставка по России`,
    canonical: `${BRAND_CONFIG.website}/cars/search`,
    ogType: 'website',
    ogTitle: `Поиск авто из Европы в ${BRAND_CONFIG.address} и по России | ${BRAND_CONFIG.name}`,
    ogDescription: `Найдите авто из Европы для пригона в ${BRAND_CONFIG.address} и по всей России. ${BRAND_CONFIG.name} - удобный поиск и полное сопровождение сделки.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `Поиск авто в ${BRAND_CONFIG.address} и по России | ${BRAND_CONFIG.name}`,
    twitterDescription: `Подбор и пригон авто из Европы в ${BRAND_CONFIG.address} и по всей России с ${BRAND_CONFIG.name}. Полный каталог и фильтры.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Страница автомобиля
  car: {
    title: `{brand} {model} {year} - {price} ₽ | ${BRAND_CONFIG.name}`,
    description: `{brand} {model} {year} года. Пробег: {mileage} км. Цена: {price} ₽. Автомобиль с Европы. Полное сопровождение: покупка, доставка и растаможка с ${BRAND_CONFIG.name}.`,
    keywords: '{brand}, {model}, {year}, авто Европа, пригон авто, купить автомобиль, Auto Broker, Ярославль',
    canonical: `${BRAND_CONFIG.website}/cars/{id}`,
    ogType: 'product',
    ogTitle: `{brand} {model} {year} | ${BRAND_CONFIG.name}`,
    ogDescription: `{brand} {model} {year}. Цена {price} ₽. Пригон авто из Европы с ${BRAND_CONFIG.name}.`,
    ogImage: '{ogImage}',
    ogPrice: '{ogPrice}',
    twitterTitle: `{brand} {model} {year} | ${BRAND_CONFIG.name}`,
    twitterDescription: `{brand} {model} {year}. Доставка и растаможка авто из Европы с ${BRAND_CONFIG.name}.`,
    twitterImage: '{ogImage}'
  },

  // О компании
  about: {
    title: `О компании ${BRAND_CONFIG.name}`,
    description: `${BRAND_CONFIG.name} - эксперт в пригоне автомобилей из Европы. Работаем по всей России. Предлагаем подбор, проверку, доставку и оформление авто под ключ. Надежность и опыт на каждом этапе.`,
    keywords: 'о компании, пригон авто, авто Европа, доставка автомобилей, Auto Broker, Ярославль',
    canonical: 'https://vamauto.com/about-us',
    ogTitle: `О компании ${BRAND_CONFIG.name}`,
    ogDescription: `Узнайте больше о ${BRAND_CONFIG.name} - эксперт по пригону авто из Европы в Россию.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `О компании | ${BRAND_CONFIG.name}`,
    twitterDescription: `${BRAND_CONFIG.name} - пригон авто из Европы. Полное сопровождение сделки.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Команда
  team: {
    title: `Наша команда | ${BRAND_CONFIG.name}`,
    description: `Познакомьтесь с командой ${BRAND_CONFIG.name}. Специалисты по подбору и пригону автомобилей из Европы в Россию. Опытные менеджеры, брокеры и логисты помогут вам получить идеальное авто под ключ.`,
    keywords: 'команда, эксперты, пригон авто, специалисты, Auto Broker, Ярославль',
    canonical: 'https://vamauto.com/team',
    ogTitle: `Команда ${BRAND_CONFIG.name}`,
    ogDescription: `Специалисты ${BRAND_CONFIG.name} по подбору и пригону авто из Европы. Опыт и надежность.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `Наша команда | ${BRAND_CONFIG.name}`,
    twitterDescription: `Команда ${BRAND_CONFIG.name} - эксперты по пригону авто из Европы.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Контакты
  contacts: {
    title: `Контакты | ${BRAND_CONFIG.name}`,
    description: `Свяжитесь с ${BRAND_CONFIG.name}. Консультации по пригону авто из Европы, расчет стоимости и ответы на все вопросы.`,
    keywords: 'контакты, Auto Broker, пригон авто, авто Европа, Ярославль',
    canonical: 'https://vamauto.com/contacts',
    ogTitle: `Контакты | ${BRAND_CONFIG.name}`,
    ogDescription: `Контакты ${BRAND_CONFIG.name} - консультации по пригону авто из Европы в Россию.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `Контакты | ${BRAND_CONFIG.name}`,
    twitterDescription: `Свяжитесь с ${BRAND_CONFIG.name} для консультации по пригону авто из Европы.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Пользовательское соглашение
  terms: {
    title: `Пользовательское соглашение | ${BRAND_CONFIG.name}`,
    description: `Пользовательское соглашение ${BRAND_CONFIG.name}. Условия использования сайта и услуг по пригону автомобилей из Европы в Россию.`,
    keywords: 'пользовательское соглашение, условия использования, Auto Broker, пригон авто, Ярославль',
    canonical: 'https://vamauto.com/terms-of-service',
    ogTitle: `Пользовательское соглашение | ${BRAND_CONFIG.name}`,
    ogDescription: `Условия использования сайта ${BRAND_CONFIG.name} для пригона авто из Европы.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `Пользовательское соглашение | ${BRAND_CONFIG.name}`,
    twitterDescription: `Условия использования ${BRAND_CONFIG.name} для пригона авто из Европы.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  },

  // Политика конфиденциальности
  privacy: {
    title: `Политика конфиденциальности | ${BRAND_CONFIG.name}`,
    description: `Политика конфиденциальности ${BRAND_CONFIG.name}. Как мы обрабатываем персональные данные клиентов при пригоне автомобилей из Европы в Россию.`,
    keywords: 'политика конфиденциальности, персональные данные, Auto Broker, пригон авто, Ярославль',
    canonical: 'https://vamauto.com/privacy-policy',
    ogTitle: `Политика конфиденциальности | ${BRAND_CONFIG.name}`,
    ogDescription: `Политика обработки персональных данных ${BRAND_CONFIG.name} при пригоне авто из Европы.`,
    ogImage: `${BRAND_CONFIG.ogImage}`,
    twitterTitle: `Политика конфиденциальности | ${BRAND_CONFIG.name}`,
    twitterDescription: `Политика конфиденциальности ${BRAND_CONFIG.name} для пригона авто из Европы.`,
    twitterImage: `${BRAND_CONFIG.ogImage}`
  }
};

// Функция для замены плейсхолдеров в SEO конфиге
export function replaceSEOTemplate(template: string, data: Record<string, any>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] || match;
  });
}

// Функция для получения SEO конфига с заменой плейсхолдеров
export function getSEOConfig(page: string, data?: Record<string, any>): SEOConfig {
  const config = SEO_CONFIG[page];
  if (!config) {
    throw new Error(`SEO config not found for page: ${page}`);
  }

  if (!data) {
    return config;
  }

  return {
    title: replaceSEOTemplate(config.title, data),
    description: replaceSEOTemplate(config.description, data),
    keywords: replaceSEOTemplate(config.keywords, data),
    canonical: config.canonical ? replaceSEOTemplate(config.canonical, data) : undefined,
    ogType: config.ogType,
    ogTitle: replaceSEOTemplate(config.ogTitle, data),
    ogDescription: replaceSEOTemplate(config.ogDescription, data),
    ogImage: replaceSEOTemplate(config.ogImage, data),
    ogPrice: config.ogPrice ? replaceSEOTemplate(config.ogPrice, data) : undefined,
    twitterTitle: replaceSEOTemplate(config.twitterTitle, data),
    twitterDescription: replaceSEOTemplate(config.twitterDescription, data),
    twitterImage: replaceSEOTemplate(config.twitterImage, data),
    yandexVerification: config.yandexVerification
  };
}
