import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { BRAND_CONFIG } from '../../constants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactUsComponent } from '../../blocks/contact-us/contact-us.component';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs implements OnInit, AfterViewInit {
  brandConfig = BRAND_CONFIG;
  private readonly modal = inject(BsModalService);
  private readonly seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.setSEO('about');
  }

  ngAfterViewInit() {
    // Анимация счетчиков статистики
    this.animateCounters();
    // Анимация появления элементов при скролле
    this.initScrollAnimations();
    // Инициализация анимации дождя отзывов
    this.initRainAnimation();
  }

  openContactUsModal() {
    this.modal.show(ContactUsComponent);
  }

  private animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.getAttribute('data-count') || '0');
          this.animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }

         private animateCounter(element: HTMLElement, target: number) {
           let current = 0;
           const increment = target / 100;
           const timer = setInterval(() => {
             current += increment;
             if (current >= target) {
               current = target;
               clearInterval(timer);
               
               // Добавляем символы после завершения анимации
               if (target >= 1000) {
                 element.textContent = Math.floor(current).toString() + '+';
               } else if (target < 10) {
                 element.textContent = current.toFixed(1);
               } else if (target >= 90) {
                 element.textContent = Math.floor(current).toString() + '%';
               } else {
                 element.textContent = Math.floor(current).toString();
               }
               return;
             }
             
             // Во время анимации показываем числа без символов
             if (target < 10) {
               element.textContent = current.toFixed(1);
             } else {
               element.textContent = Math.floor(current).toString();
             }
           }, 20);
         }

  private initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
  }

         private initRainAnimation() {
           // Добавляем случайные задержки для падающих отзывов
           const fallingCards = document.querySelectorAll('.falling-card');

           fallingCards.forEach((card, index) => {
             const randomDelay = Math.random() * 8; // случайная задержка от 0 до 8 секунд
             const randomDuration = 8 + Math.random() * 12; // случайная длительность от 8 до 20 секунд
             const randomRotation = (Math.random() - 0.5) * 60; // случайный поворот от -30 до 30 градусов
             const randomLeft = Math.random() * 85 + 5; // случайная позиция от 5% до 90%

             (card as HTMLElement).style.animationDelay = `${randomDelay}s`;
             (card as HTMLElement).style.animationDuration = `${randomDuration}s`;
             (card as HTMLElement).style.transform = `rotate(${randomRotation}deg)`;
             (card as HTMLElement).style.left = `${randomLeft}%`;

             // Добавляем случайные колебания во время падения
             const shakeInterval = setInterval(() => {
               const randomShake = (Math.random() - 0.5) * 6; // случайное колебание от -3 до 3px
               (card as HTMLElement).style.transform = `translateX(${randomShake}px) rotate(${randomRotation}deg)`;
             }, 300 + Math.random() * 400); // случайный интервал от 300 до 700ms

             // Очищаем интервал через 25 секунд
             setTimeout(() => {
               clearInterval(shakeInterval);
             }, 25000);
           });

           // Добавляем эффект мерцания для основных карточек
           const mainCards = document.querySelectorAll('.main-card');
           mainCards.forEach(card => {
             const floatInterval = setInterval(() => {
               card.classList.add('testimonial-float');
               setTimeout(() => {
                 card.classList.remove('testimonial-float');
               }, 2000);
             }, 4000 + Math.random() * 6000); // случайный интервал от 4 до 10 секунд
           });
         }
}
