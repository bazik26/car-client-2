import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { AppService } from '../../app.service';
import { BRAND_CONFIG } from '../../constants';

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
  public readonly brandConfig = BRAND_CONFIG;

  public recentCars: any[] = []; // Последние 10 добавленных машин
  public specialOfferCars: any[] = []; // 10 случайных машин со скидкой
  public isLoading = true;

  public ngOnInit() {
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
    this.modal.show(ContactUsComponent);
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
