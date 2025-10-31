import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOConfig, getSEOConfig } from '../config/seo.config';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

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
    
    // Устанавливаем canonical URL
    if (config.canonical) {
      this.meta.updateTag({ rel: 'canonical', href: config.canonical });
    }
    
    // Устанавливаем Open Graph теги
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle || config.title });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription || config.description });
    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }
    
    // Устанавливаем Twitter Card теги
    this.meta.updateTag({ name: 'twitter:title', content: config.twitterTitle || config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.twitterDescription || config.description });
    if (config.twitterImage) {
      this.meta.updateTag({ name: 'twitter:image', content: config.twitterImage });
    }
  }

  /**
   * Устанавливает SEO для страницы автомобиля с данными автомобиля
   * @param car - данные автомобиля
   */
  setCarSEO(car: any): void {
    const data = {
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || '',
      price: car.price ? car.price.toLocaleString() : '',
      mileage: car.mileage ? car.mileage.toLocaleString() : 'не указан',
      color: car.color ? `Цвет: ${car.color}.` : '',
      brandName: 'Auto Broker',
      id: car.id || car._id || ''
    };

    this.setSEO('car', data);
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
}
