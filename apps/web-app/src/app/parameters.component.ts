import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-parameters',
  imports: [CommonModule],
  template: `<h2>Paramentros</h2>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametersComponent {}
