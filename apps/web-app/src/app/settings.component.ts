import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CountriesComponent } from './countries.component';

@Component({
  selector: 'app-settings',
  imports: [TabsModule, CountriesComponent],
  template: `<p-tabs value="0">
    <p-tablist>
      <p-tab value="0">Paises</p-tab>
    </p-tablist>
    <p-tabpanels>
      <p-tabpanel value="0">
        <app-countries />
      </p-tabpanel>
    </p-tabpanels>
  </p-tabs>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
