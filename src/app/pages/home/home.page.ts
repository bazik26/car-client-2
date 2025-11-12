import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { AppService } from '../../app.service';
import { BRAND_CONFIG } from '../../constants';
import { SEOService } from '../../services/seo.service';

import { ContactUsComponent } from '../../blocks/contact-us/contact-us.component';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  public readonly modal = inject(BsModalService);
  public readonly appService = inject(AppService);
  private readonly seoService = inject(SEOService);
  public readonly brandConfig = BRAND_CONFIG;

  public recentCars: any[] = []; // Последние 10 добавленных машин
  public specialOfferCars: any[] = []; // 10 случайных машин со скидкой
  public isLoading = true;

  public ngOnInit() {
    this.seoService.setSEO('home');
    // Добавляем Organization Schema для главной страницы
    this.seoService.setOrganizationJSONLD();
    // Добавляем хлебные крошки
    this.seoService.setBreadcrumbsJSONLD([
      { name: 'Главная', url: `${this.brandConfig.website}/` }
    ]);
    // Добавляем FAQ для лучшей видимости в Яндексе
    this.seoService.setFAQJSONLD([
      {
        question: 'Сколько стоит пригон автомобиля из Европы?',
        answer: 'Стоимость пригона зависит от страны происхождения, модели и комплектации автомобиля. В среднем услуга пригона составляет от 50 000 до 150 000 рублей, включая все таможенные процедуры и доставку.'
      },
      {
        question: 'Как долго занимает пригон автомобиля?',
        answer: 'Полный цикл пригона автомобиля из Европы обычно занимает от 2 до 6 недель, в зависимости от страны происхождения и сложности таможенного оформления.'
      },
      {
        question: 'Какие гарантии вы предоставляете?',
        answer: 'Мы предоставляем полное юридическое сопровождение сделки, проверку автомобиля перед покупкой, гарантию на отсутствие скрытых дефектов и полный пакет документов.'
      },
      {
        question: 'В каких городах вы работаете?',
        answer: `Наш офис находится в ${this.brandConfig.city}, но мы работаем по всей России. Доставляем автомобили в любой регион.`
      },
      {
        question: 'Можно ли посмотреть автомобиль перед покупкой?',
        answer: 'Да, мы предоставляем полный фото и видео отчет автомобиля. Также возможен выезд нашего специалиста для детального осмотра перед покупкой.'
      }
    ]);
    this.loadRecentCars();
    this.loadSpecialOfferCars();
  }

  private loadRecentCars() {
    // Загружаем последние 10 добавленных машин
    this.appService.getCars({ limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' })
      .subscribe((cars: any[]) => {
        console.log('Recent cars loaded:', cars.length, cars);
        this.recentCars = cars;
        this.isLoading = false;
      });
  }

  private loadSpecialOfferCars() {
    // Загружаем 10 случайных машин для спецпредложения
    this.appService.getCars({ limit: 10, random: true })
      .subscribe((cars: any[]) => {
        // Ограничиваем до 10 машин и добавляем скидки
        this.specialOfferCars = cars.slice(0, 10).map((car: any) => ({
          ...car,
          originalPrice: car.price,
          discountedPrice: Math.round(car.price * (0.92 + Math.random() * 0.08)) // Скидка 5-10%
        }));
      });
  }

  openContactUsModal() {
    console.log('ContactUs modal button clicked!');
    try {
      this.modal.show(ContactUsComponent);
      console.log('Modal shown successfully');
    } catch (error) {
      console.error('Error showing modal:', error);
    }
  }

  // Вычисляем процент скидки
  getDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

  // Скролл к следующей секции
  scrollToNextSection() {
    const nextSection = document.querySelector('.recent-cars-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
