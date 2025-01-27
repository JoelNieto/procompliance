import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ResourceRef,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-country-item',
  imports: [ProgressSpinner],
  template: `<div
    class="flex rounded-full px-3 py-1.5  text-slate-600 text-xs font-semibold items-center gap-0.5"
  >
    @if(countryInfo.hasValue()) {
    <img
      [src]="countryInfo.value()?.flags.svg"
      class="w-6"
      [alt]="countryInfo.value()?.flags.alt"
    />
    <div class="ml-2">{{ countryInfo.value()?.translations.spa.common }}</div>
    } @if(countryInfo.isLoading()) {
    <p-progressSpinner strokeWidth="4" styleClass="p-mr-2"></p-progressSpinner>
    }
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryItemComponent {
  countryCode = input.required<string>();
  private http = inject(HttpClient);
  public countryInfo: ResourceRef<any> = rxResource({
    request: () => ({ id: this.countryCode() }),
    loader: ({ request }) =>
      this.http.get(
        `https://restcountries.com/v3.1/alpha/${request.id}/?fields=flags,translations`
      ),
  });
}

interface Country {
  flags: Flags;
  cca2: string;
  cca3: string;
  translations: { spa: { common: string; official: string } };
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
