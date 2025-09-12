import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    if (location.href.search('admin') === -1) {
      document.body.classList.add('client');
    }
  }
}
