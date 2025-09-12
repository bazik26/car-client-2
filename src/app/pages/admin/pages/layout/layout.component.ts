import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  public router = inject(Router);

  public appService = inject(AppService);

  public admin!: any;

  ngOnInit() {
    this.appService.auth().subscribe(
      (admin) => (this.admin = admin),
      () => this.router.navigate(['/admin']),
    );
  }
}
