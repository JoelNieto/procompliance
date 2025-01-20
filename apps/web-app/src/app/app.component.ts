import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
  imports: [RouterOutlet, Toast],
  selector: 'app-root',
  template: `<p-toast /><router-outlet />`,
  styles: ``,
})
export class AppComponent {
  title = 'web-app';
}
