import { Component } from '@angular/core';
import { BRAND_CONFIG } from '../../constants';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {
  brandConfig = BRAND_CONFIG;
  currentDate = new Date().toLocaleDateString('ru-RU');
}
