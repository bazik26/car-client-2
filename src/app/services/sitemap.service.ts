import { Injectable } from '@angular/core';
import { BRAND_CONFIG } from '../constants';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  
  /**
   * Генерирует sitemap.xml для всех страниц сайта
   * Критично для индексации SPA в Яндексе!
   */
  generateSitemapXML(cars: any[]): string {
    const urls: SitemapUrl[] = [];
    
    // Главная страница
    urls.push({
      loc: `${BRAND_CONFIG.website}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0
    });
    
    // Каталог
    urls.push({
      loc: `${BRAND_CONFIG.website}/cars/search`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.9
    });
    
    // О компании
    urls.push({
      loc: `${BRAND_CONFIG.website}/about-us`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    });
    
    // Команда
    urls.push({
      loc: `${BRAND_CONFIG.website}/team`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.6
    });
    
    // Контакты
    urls.push({
      loc: `${BRAND_CONFIG.website}/contacts`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    });
    
    // Политики
    urls.push({
      loc: `${BRAND_CONFIG.website}/privacy-policy`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: 0.3
    });
    
    urls.push({
      loc: `${BRAND_CONFIG.website}/terms-of-service`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: 0.3
    });
    
    // Все автомобили
    cars.forEach(car => {
      const carId = car.id || car._id || '';
      if (carId) {
        urls.push({
          loc: `${BRAND_CONFIG.website}/cars/${carId}`,
          lastmod: car.updatedAt ? new Date(car.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.8
        });
      }
    });
    
    // Генерируем XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      if (url.lastmod) {
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      if (url.changefreq) {
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      if (url.priority !== undefined) {
        xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    return xml;
  }
  
  /**
   * Экранирует специальные символы для XML
   */
  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}
