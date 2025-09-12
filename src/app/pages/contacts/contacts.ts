import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BRAND_CONFIG } from '../../constants';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  brandConfig = BRAND_CONFIG;
  
  mapUrl: SafeResourceUrl;
  
  contactForm = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };
  
  isSubmitting = false;

  constructor(
    private sanitizer: DomSanitizer,
    private appService: AppService
  ) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://yandex.ru/map-widget/v1/?um=constructor%3Af5645be8693c0f08c0fd3415c4355b42182db5e4ee778a68062b49b859adf9eb&source=constructor'
    );
  }
  
  submitContactForm() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    const payload = {
      messenger: 'telegram',
      firstName: this.contactForm.name,
      phone: this.contactForm.phone,
      message: `Email: ${this.contactForm.email || 'Не указан'}\n\nСообщение: ${this.contactForm.message}`
    };
    
    this.appService.contactUs(payload).subscribe({
      next: () => {
        this.showSuccessMessage();
        this.resetForm();
      },
      error: (err) => {
        console.error('Ошибка отправки', err);
        this.showErrorMessage();
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  
  resetForm() {
    this.contactForm = {
      name: '',
      phone: '',
      email: '',
      message: ''
    };
  }
  
  showSuccessMessage() {
    this.showToast('Заявка отправлена', 'Мы свяжемся с вами в ближайшее время.');
  }
  
  showErrorMessage() {
    this.showToast('Ошибка отправки', 'Попробуйте еще раз или свяжитесь с нами по телефону.');
  }
  
  private showToast(title: string, message?: string) {
    const containerId = 'tc-toast-container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.setAttribute('style', [
        'position:fixed',
        'right:16px',
        'bottom:16px',
        'z-index:1056',
        'display:flex',
        'flex-direction:column',
        'gap:10px'
      ].join(';'));
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'tc-toast';
    toast.setAttribute('style', [
      'min-width:280px',
      'max-width:360px',
      'padding:14px 16px',
      'border-radius:12px',
      'background:rgba(23,23,23,0.96)',
      'backdrop-filter:saturate(150%) blur(6px)',
      'color:#fff',
      'box-shadow:0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.08)',
      'transform:translateY(8px)',
      'opacity:0',
      'transition:transform .2s ease, opacity .2s ease',
      'font-family:inherit'
    ].join(';'));

    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.setAttribute('style', [
      'font-weight:700',
      'color:var(--yellow, #FFD700)',
      'margin:0 0 4px 0',
      'font-size:14px'
    ].join(';'));

    const msgEl = document.createElement('div');
    msgEl.textContent = message || '';
    msgEl.setAttribute('style', [
      'font-size:13px',
      'line-height:1.35',
      'opacity:.9'
    ].join(';'));

    toast.appendChild(titleEl);
    if (message) toast.appendChild(msgEl);

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    const lifetime = 3200;
    setTimeout(() => {
      toast.style.transform = 'translateY(6px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 220);
    }, lifetime);
  }
}
