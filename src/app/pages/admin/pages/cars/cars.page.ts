import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppService } from '../../../../app.service';

import { AdminCarsManagementModal } from './blocks/management.modal';

@Component({
  selector: 'app-admin-cars',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminCarsPage implements OnInit {
  public readonly modal = inject(BsModalService);

  public readonly appService = inject(AppService);

  public cars!: any;
  public admin!: any;

  ngOnInit() {
    this.getCarsAll();
    this.appService.auth().subscribe((admin) => (this.admin = admin));
  }

  openModal(car?: any) {
    const modalRef = this.modal.show(AdminCarsManagementModal, {
      initialState: {
        car,
      },
    });

    modalRef.onHide?.subscribe(() => {
      if (modalRef.content?.result?.reload) {
        this.getCarsAll();
      }
    });
  }

  getCarsAll() {
    this.appService.getCarsAll().subscribe((cars) => (this.cars = cars));
  }

  deleteCar(car: any) {
    if (confirm(`Удалить ${car.brand} ${car.model}?`)) {
      this.appService.deleteCar(car.id).subscribe(() => this.getCarsAll());
    }
  }

  restoreCar(car: any) {
    this.appService.restoreCar(car.id).subscribe(() => this.getCarsAll());
  }
}
