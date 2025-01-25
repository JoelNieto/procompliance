import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';

@Component({
  imports: [RouterOutlet, Toast, ConfirmDialog],
  selector: 'app-root',
  template: `<p-toast /> <p-confirmdialog /> <router-outlet />`,
  styles: ``,
})
export class AppComponent {
  title = 'web-app';
}
