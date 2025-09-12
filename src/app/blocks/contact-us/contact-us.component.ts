import { Component, inject } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  imports: [
    FormsModule
  ]
})
export class ContactUsComponent {
  public readonly activeModal = inject(BsModalRef);

  selectedMessenger: string = 'telegram';
  contactData = {
    firstName: '',
    phone: '',
    message: ''
  };


  constructor(protected readonly appService: AppService) {}




  submitContactForm() {
    console.log('Выбран мессенджер:', this.selectedMessenger);
    console.log('Данные:', this.contactData);

    this.appService.contactUs({
      messenger: this.selectedMessenger,
      firstName: this.contactData.firstName,
      phone: this.contactData.phone,
      message: this.contactData.message
    }).subscribe({
      next: () => {
        this.showSuccessMessage();
      },
      error: (err) => {
        console.error('Ошибка отправки', err);
      }
    });
  }



  showSuccessMessage() {
    try { this.activeModal?.hide(); } catch {}
    this.showToast('Заявка отправлена', 'Мы свяжемся с вами в ближайшее время.');
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
