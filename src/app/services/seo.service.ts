import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOConfig, getSEOConfig } from '../config/seo.config';
import { BRAND_CONFIG } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  /**
   * Устанавливает SEO теги для страницы
   * @param page - ключ страницы из SEO_CONFIG
   * @param data - данные для замены плейсхолдеров (опционально)
   */
  setSEO(page: string, data?: Record<string, any>): void {
    const config = getSEOConfig(page, data);
    
    // Устанавливаем title
    this.title.setTitle(config.title);
    
    // Устанавливаем meta description
    this.meta.updateTag({ name: 'description', content: config.description });
    
    // Устанавливаем keywords
    this.meta.updateTag({ name: 'keywords', content: config.keywords });
    
    // Устанавливаем author
    this.meta.updateTag({ name: 'author', content: BRAND_CONFIG.name });
    
    // Устанавливаем robots
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Устанавливаем canonical URL
    if (config.canonical) {
      this.meta.updateTag({ rel: 'canonical', href: config.canonical });
    }
    
    // Устанавливаем Open Graph теги для правильного шаринга в соцсетях
    this.meta.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle || config.title });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription || config.description });
    this.meta.updateTag({ property: 'og:url', content: config.canonical || BRAND_CONFIG.website });
    this.meta.updateTag({ property: 'og:site_name', content: BRAND_CONFIG.name });
    if (config.ogImage) {
      const fullImageUrl = config.ogImage.startsWith('http') ? config.ogImage : `${BRAND_CONFIG.website}${config.ogImage}`;
      this.meta.updateTag({ property: 'og:image', content: fullImageUrl });
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
      this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    }
    if (config.ogPrice) {
      this.meta.updateTag({ property: 'product:price:amount', content: config.ogPrice });
      this.meta.updateTag({ property: 'product:price:currency', content: 'RUB' });
    }
    
    // Устанавливаем Twitter Card теги
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.twitterTitle || config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.twitterDescription || config.description });
    if (config.twitterImage) {
      const fullTwitterImageUrl = config.twitterImage.startsWith('http') ? config.twitterImage : `${BRAND_CONFIG.website}${config.twitterImage}`;
      this.meta.updateTag({ name: 'twitter:image', content: fullTwitterImageUrl });
    }
    
    // Yandex мета-теги для поисковой выдачи и рекламного кабинета
    if (config.yandexVerification) {
      this.meta.updateTag({ name: 'yandex-verification', content: config.yandexVerification });
    }
  }

  /**
   * Устанавливает SEO для страницы автомобиля с данными автомобиля
   * @param car - данные автомобиля
   */
  setCarSEO(car: any, appService?: any): void {
    const carId = car.id || car._id || '';
    const carImage = car.files && car.files.length > 0 && appService 
      ? appService.getFileUrl(car.files[0])
      : `${BRAND_CONFIG.website}/public/favicon.ico`;
    
    const fullImageUrl = carImage.startsWith('http') ? carImage : `${BRAND_CONFIG.website}${carImage}`;
    
    const data = {
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || '',
      price: car.price ? car.price.toLocaleString() : '',
      mileage: car.mileage ? car.mileage.toLocaleString() : 'не указан',
      color: car.color ? `Цвет: ${car.color}.` : '',
      brandName: BRAND_CONFIG.name,
      id: carId,
      ogImage: fullImageUrl,
      ogPrice: car.price ? car.price.toString() : undefined
    };

    this.setSEO('car', data);
    
    // Добавляем JSON-LD разметку для Schema.org Product
    this.setProductJSONLD(car, carId, fullImageUrl);
  }
  
  /**
   * Устанавливает JSON-LD разметку для продукта (автомобиля)
   * @param car - данные автомобиля
   * @param carId - ID автомобиля
   * @param imageUrl - URL изображения
   */
  private setProductJSONLD(car: any, carId: string, imageUrl: string): void {
    // Удаляем старый JSON-LD если есть
    const existingScript = this.document.getElementById('product-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    const carUrl = `${BRAND_CONFIG.website}/cars/${carId}`;
    const carName = `${car.brand || ''} ${car.model || ''} ${car.year || ''}`.trim();
    const carDescription = car.description 
      ? car.description.replace(/<[^>]*>/g, '').substring(0, 200)
      : `${carName}. Автомобиль из Европы. Пригон, доставка и растаможка с ${BRAND_CONFIG.name}.`;
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': carName,
      'description': carDescription,
      'image': imageUrl,
      'brand': {
        '@type': 'Brand',
        'name': car.brand || ''
      },
      'offers': {
        '@type': 'Offer',
        'url': carUrl,
        'priceCurrency': 'RUB',
        'price': car.price ? car.price.toString() : '0',
        'priceValidUntil': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        'itemCondition': 'https://schema.org/UsedCondition',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': BRAND_CONFIG.name,
          'url': BRAND_CONFIG.website
        }
      },
      'additionalProperty': [
        {
          '@type': 'PropertyValue',
          'name': 'Год выпуска',
          'value': car.year?.toString() || ''
        },
        {
          '@type': 'PropertyValue',
          'name': 'Пробег',
          'value': car.mileage ? `${car.mileage} км` : ''
        },
        {
          '@type': 'PropertyValue',
          'name': 'Двигатель',
          'value': car.engine ? `${car.engine} л` : ''
        },
        {
          '@type': 'PropertyValue',
          'name': 'Коробка передач',
          'value': car.gearbox || ''
        },
        {
          '@type': 'PropertyValue',
          'name': 'Привод',
          'value': car.drive || ''
        },
        {
          '@type': 'PropertyValue',
          'name': 'Топливо',
          'value': car.fuel || ''
        }
      ].filter(prop => prop.value)
    };
    
    const script = this.document.createElement('script');
    script.id = 'product-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
  
  /**
   * Устанавливает JSON-LD разметку для CollectionPage (каталог)
   * @param cars - массив автомобилей
   * @param totalItems - общее количество элементов
   */
  setCollectionPageJSONLD(cars: any[], totalItems: number, appService?: any): void {
    // Удаляем старый JSON-LD если есть
    const existingScript = this.document.getElementById('collection-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    const items = cars.slice(0, 10).map(car => {
      const carId = car.id || car._id || '';
      const carImage = car.files && car.files.length > 0 && appService 
        ? appService.getFileUrl(car.files[0])
        : `${BRAND_CONFIG.website}/public/favicon.ico`;
      const fullImageUrl = carImage.startsWith('http') ? carImage : `${BRAND_CONFIG.website}${carImage}`;
      
      return {
        '@type': 'Product',
        'name': `${car.brand || ''} ${car.model || ''} ${car.year || ''}`.trim(),
        'image': fullImageUrl,
        'url': `${BRAND_CONFIG.website}/cars/${carId}`,
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'RUB',
          'price': car.price ? car.price.toString() : '0'
        }
      };
    });
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Каталог автомобилей из Европы | ${BRAND_CONFIG.name}`,
      'description': `Каталог автомобилей для пригона из Европы в ${BRAND_CONFIG.address} и по всей России. ${totalItems} автомобилей в наличии с доставкой в любой город.`,
      'url': `${BRAND_CONFIG.website}/cars/search`,
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': totalItems,
        'itemListElement': items.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': item
        }))
      }
    };
    
    const script = this.document.createElement('script');
    script.id = 'collection-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }

  /**
   * Обновляет только title страницы
   * @param title - новый title
   */
  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  /**
   * Обновляет только description
   * @param description - новое описание
   */
  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  /**
   * Обновляет только keywords
   * @param keywords - новые ключевые слова
   */
  setKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  /**
   * Устанавливает произвольный meta тег
   * @param property - свойство тега (name или property)
   * @param content - содержимое тега
   */
  setMetaTag(property: string, content: string): void {
    this.meta.updateTag({ [property]: content });
  }

  /**
   * Устанавливает canonical URL
   * @param url - canonical URL
   */
  setCanonical(url: string): void {
    this.meta.updateTag({ rel: 'canonical', href: url });
  }
  
  /**
   * Устанавливает хлебные крошки (BreadcrumbList) - критично для Яндекса
   * @param breadcrumbs - массив хлебных крошек
   */
  setBreadcrumbsJSONLD(breadcrumbs: Array<{name: string, url: string}>): void {
    // Удаляем старый Breadcrumbs если есть
    const existingScript = this.document.getElementById('breadcrumbs-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
    
    const script = this.document.createElement('script');
    script.id = 'breadcrumbs-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
  
  /**
   * Устанавливает Organization Schema - для главной страницы
   */
  setOrganizationJSONLD(): void {
    // Удаляем старый Organization если есть
    const existingScript = this.document.getElementById('organization-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'AutoDealer'],
      'name': BRAND_CONFIG.name,
      'url': BRAND_CONFIG.website,
      'logo': `${BRAND_CONFIG.website}${BRAND_CONFIG.ogImage}`,
      'description': `Компания по пригону автомобилей из Европы в ${BRAND_CONFIG.address} и по всей России. Подбор, доставка и растаможка автомобилей под ключ с доставкой в любой регион.`,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': BRAND_CONFIG.city,
        'addressRegion': BRAND_CONFIG.region,
        'addressCountry': 'RU'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': BRAND_CONFIG.coordinates.latitude.toString(),
        'longitude': BRAND_CONFIG.coordinates.longitude.toString()
      },
      'telephone': BRAND_CONFIG.phone,
      'email': BRAND_CONFIG.email,
      'priceRange': '₽₽₽',
      'areaServed': {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': BRAND_CONFIG.coordinates.latitude.toString(),
          'longitude': BRAND_CONFIG.coordinates.longitude.toString()
        },
        'geoRadius': '100000'
      },
      'sameAs': [
        'https://t.me/autobroker_yar'
      ],
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '09:00',
          'closes': '18:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Saturday',
          'opens': '10:00',
          'closes': '16:00'
        }
      ]
    };
    
    const script = this.document.createElement('script');
    script.id = 'organization-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
  
  /**
   * Устанавливает FAQ Schema - Яндекс любит показывать FAQ в сниппетах
   * @param faqs - массив вопросов и ответов
   */
  setFAQJSONLD(faqs: Array<{question: string, answer: string}>): void {
    // Удаляем старый FAQ если есть
    const existingScript = this.document.getElementById('faq-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
    
    const script = this.document.createElement('script');
    script.id = 'faq-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
}
