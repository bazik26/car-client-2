import { Injectable } from '@angular/core';
import { CITIES_CONFIG, getTopCitiesByPopulation } from '../config/cities.config';
import { BRAND_CONFIG } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  /**
   * Генерирует XML sitemap для всех городских страниц
   */
  generateCitySitemap(): string {
    const baseUrl = BRAND_CONFIG.website;
    const topCities = getTopCitiesByPopulation(100); // Топ 100 городов
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Добавляем основные страницы
    const mainPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/cars/search', priority: '0.9', changefreq: 'daily' },
      { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
      { url: '/contacts', priority: '0.8', changefreq: 'monthly' },
      { url: '/team', priority: '0.7', changefreq: 'monthly' },
      { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
      { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' }
    ];

    mainPages.forEach(page => {
      sitemap += this.generateUrlEntry(baseUrl + page.url, page.priority, page.changefreq);
    });

    // Добавляем городские страницы
    topCities.forEach(city => {
      const cityUrl = `/city/${city.name.toLowerCase()}`;
      const priority = this.getCityPriority(city);
      sitemap += this.generateUrlEntry(baseUrl + cityUrl, priority, 'weekly');
    });

    sitemap += '</urlset>';
    return sitemap;
  }

  /**
   * Генерирует robots.txt с ссылками на sitemap
   */
  generateRobotsTxt(): string {
    const baseUrl = BRAND_CONFIG.website;
    
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-cities.xml

# Disallow admin area
Disallow: /admin/
Disallow: /admin

# Allow city pages
Allow: /city/
`;
  }

  /**
   * Генерирует список всех городских URL для внутренних ссылок
   */
  getCityUrls(): string[] {
    const topCities = getTopCitiesByPopulation(50); // Топ 50 для внутренних ссылок
    return topCities.map(city => `/city/${city.name.toLowerCase()}`);
  }

  /**
   * Генерирует HTML карту сайта для пользователей
   */
  generateHtmlSitemap(): any[] {
    const topCities = getTopCitiesByPopulation(30); // Топ 30 для HTML карты
    
    return [
      {
        title: 'Основные страницы',
        links: [
          { name: 'Главная', url: '/' },
          { name: 'Поиск автомобилей', url: '/cars/search' },
          { name: 'О компании', url: '/about-us' },
          { name: 'Наша команда', url: '/team' },
          { name: 'Контакты', url: '/contacts' }
        ]
      },
      {
        title: 'Пригон авто по городам',
        links: topCities.map(city => ({
          name: `Пригон авто в ${city.name}`,
          url: `/city/${city.name.toLowerCase()}`
        }))
      }
    ];
  }

  private generateUrlEntry(url: string, priority: string, changefreq: string): string {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  }

  private getCityPriority(city: any): string {
    if (city.population && city.population > 1000000) {
      return '0.9'; // Крупные города
    } else if (city.population && city.population > 500000) {
      return '0.8'; // Средние города
    } else if (city.population && city.population > 200000) {
      return '0.7'; // Малые города
    } else {
      return '0.6'; // Остальные
    }
  }
}
