import {CurrencyPipe, JsonPipe} from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { switchMap } from 'rxjs';

import { AppService } from '../../app.service';
import { BRAND_CONFIG } from '../../constants';

import { ContactUsComponent } from '../../blocks/contact-us/contact-us.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarPage implements OnInit {
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly modal = inject(BsModalService);

  public readonly appService = inject(AppService);
  
  brandConfig = BRAND_CONFIG;

  private readonly singleFeatureFields = [
    'conditionerType',
    'windowLifter',
    'interiorMaterials',
    'interiorColor',
    'powerSteering',
    'steeringWheelAdjustment',
    'spareWheel',
    'headlights',
    'seatAdjustment',
    'memorySeatModule',
    'seatHeated',
    'seatVentilation',
  ];

  // Маппинг полей для более понятного отображения
  private readonly fieldLabels = {
    'conditionerType': 'Кондиционер',
    'windowLifter': 'Электростеклоподъемники',
    'interiorMaterials': 'Материалы салона',
    'interiorColor': 'Цвет салона',
    'powerSteering': 'Усилитель руля',
    'steeringWheelAdjustment': 'Регулировка руля',
    'seatAdjustment': 'Регулировка сидений',
    'memorySeatModule': 'Память положения сидений',
    'seatHeated': 'Подогрев сидений',
    'seatVentilation': 'Вентиляция сидений',
    'headlights': 'Фары',
    'spareWheel': 'Запасное колесо'
  };

  // Специальная обработка для значений, которые могут дублироваться
  private formatFeatureValue(field: string, value: string): string {
    const fieldLabel = (this.fieldLabels as any)[field] || field;
    
    // Если значение совпадает с названием поля, показываем только значение
    if (value === fieldLabel) {
      return value;
    }
    
    // Для полей сидений добавляем контекст
    if (field === 'memorySeatModule' && value === 'Передние сиденья') {
      return `${fieldLabel}: Память положения передних сидений`;
    }
    if (field === 'seatHeated' && value === 'Передние сиденья') {
      return `${fieldLabel}: Подогрев передних сидений`;
    }
    if (field === 'seatVentilation' && value === 'Передние сиденья') {
      return `${fieldLabel}: Вентиляция передних сидений`;
    }
    
    // Для остальных случаев показываем "Название: Значение"
    return `${fieldLabel}: ${value}`;
  }

  // Категории опций точно как в админке
  private readonly featureCategories = {
    'Салон и комфорт': {
      fields: ['conditionerType', 'windowLifter', 'interiorMaterials', 'interiorColor', 'powerSteering', 'steeringWheelAdjustment', 'seatAdjustment', 'memorySeatModule', 'seatHeated', 'seatVentilation'],
      group: 'group1'
    },
    'Система помощи при парковке': {
      fields: [],
      group: 'group2'
    },
    'Мультимедиа': {
      fields: [],
      group: 'group3'
    },
    'Оптика': {
      fields: ['headlights'],
      group: 'group4'
    },
    'Безопасность': {
      fields: [],
      group: 'group5'
    },
    'Состояние': {
      fields: [],
      group: 'group6'
    },
    'Кузов': {
      fields: ['spareWheel'],
      group: 'group7'
    },
    'Подушки безопасности': {
      fields: [],
      group: 'group8'
    },
    'Дополнительное оборудование': {
      fields: [],
      group: 'group9'
    }
  };

  public car!: any;
  public selectedImageIndex = 0;

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap(({ carId }) => this.appService.getCar(carId)))
      .subscribe((car) => {
        this.car = car;
        console.log('Car loaded:', car);
        console.log('Car files:', car.files);
        console.log('Files length:', car.files?.length);
      });
  }

  openContactUsModal() {
    this.modal.show(ContactUsComponent);
  }

  onImageLoad(event: any) {
    // Добавляем класс loaded для плавного появления
    event.target.classList.add('loaded');
  }

  onImageError(event: any) {
    console.error('Image load error:', event);
    // Можно добавить fallback изображение
    event.target.src = 'assets/images/no-image-placeholder.jpg';
    event.target.classList.add('loaded');
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  getMainImageUrl(): string {
    if (this.car?.files && this.car.files.length > 0) {
      return this.appService.getFileUrl(this.car.files[this.selectedImageIndex]);
    }
    return '';
  }

  get features(): string[] {
    const car: any = this.car;
    if (!car) return [];

    const singles = this.singleFeatureFields
      .map((k) => car[k])
      .flatMap((v) => (Array.isArray(v) ? v : v ? [v] : []))
      .filter(Boolean) as string[];

    const grouped: string[] = [];
    for (let i = 1; i <= 9; i++) {
      const arr = car[`group${i}`];
      if (Array.isArray(arr)) grouped.push(...arr);
    }

    return Array.from(new Set([...singles, ...grouped]));
  }

  get groupedFeatures(): Array<{name: string, features: string[]}> {
    const car: any = this.car;
    if (!car) return [];

    const result: Array<{name: string, features: string[]}> = [];

    // Обрабатываем категории точно как в админке
    Object.entries(this.featureCategories).forEach(([categoryName, config]) => {
      const categoryFeatures: string[] = [];
      
      // Добавляем поля из singleFeatureFields с понятными названиями
      config.fields.forEach(field => {
        const value = car[field];
        if (value) {
          if (Array.isArray(value)) {
            value.forEach(v => categoryFeatures.push(this.formatFeatureValue(field, v)));
          } else {
            categoryFeatures.push(this.formatFeatureValue(field, value));
          }
        }
      });

      // Добавляем групповые опции
      const groupValue = car[config.group];
      if (Array.isArray(groupValue) && groupValue.length > 0) {
        categoryFeatures.push(...groupValue);
      }

      // Показываем категорию только если есть опции
      if (categoryFeatures.length > 0) {
        // Убираем дубликаты
        const uniqueFeatures = Array.from(new Set(categoryFeatures));
        result.push({
          name: categoryName,
          features: uniqueFeatures
        });
      }
    });

    return result;
  }

  // Метод для подсчета общего количества опций
  getTotalFeaturesCount(): number {
    return this.groupedFeatures.reduce((total, category) => total + category.features.length, 0);
  }
}
