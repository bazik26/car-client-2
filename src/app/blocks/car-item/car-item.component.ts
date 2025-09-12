import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppService } from '../../app.service';
import { BRAND_CONFIG } from '../../constants';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, RouterLink],
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarItemComponent {
  public readonly appService = inject(AppService);
  
  brandConfig = BRAND_CONFIG;

  @Input()
  public car!: any;

  @Input()
  public lazyPriority: boolean = false;

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
}
