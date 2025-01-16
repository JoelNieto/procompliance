import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { GlobalStore } from './stores/app.store';

@Component({
  imports: [RouterOutlet, ButtonModule, Toast],
  selector: 'app-root',
  providers: [GlobalStore, MessageService, ConfirmationService],
  template: `<p-toast /><router-outlet />`,
  styles: ``,
})
export class AppComponent {
  title = 'web-app';
}
