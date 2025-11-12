import { Component } from '@angular/core';
import { BRAND_CONFIG } from '../../constants';

@Component({
  selector: 'app-terms-of-service',
  imports: [],
  templateUrl: './terms-of-service.html',
  styleUrl: './terms-of-service.scss'
})
export class TermsOfService {
  brandConfig = BRAND_CONFIG;
  currentDate = new Date().toLocaleDateString('ru-RU');
}
