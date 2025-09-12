import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {filter, Subscription} from 'rxjs';

import {BsModalService} from 'ngx-bootstrap/modal';

import {ContactUsComponent} from '../contact-us/contact-us.component';
import {BRAND_CONFIG} from '../../constants';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public readonly modal = inject(BsModalService);
  public readonly router = inject(Router);
  public isMobileMenuOpen = false;
  brandConfig = BRAND_CONFIG;
  private routerSubscription?: Subscription;

  menuItems = [
    {
      label: 'Главная',
      route: '/home',
      svg: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
    },
    {
      label: 'Автомобили',
      route: '/cars/search',
      svg: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z'
    },
    {
      label: 'О нас',
      route: '/about-us',
      svg: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    },
    {
      label: 'Команда',
      route: '/team',
      svg: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'
    },
    {
      label: 'Админ',
      route: '/admin',
      svg: 'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // Подписываемся на события роутинга для автоматического скролла вверх
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Плавный скролл вверх
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  }

  ngOnDestroy(): void {
    // Отписываемся от событий роутинга
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  openContactUsModal() {
    this.modal.show(ContactUsComponent);
  }

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onMenuClick(): void {
    // Закрываем мобильное меню при клике на пункт меню
    this.closeMobileMenu();
  }
}
