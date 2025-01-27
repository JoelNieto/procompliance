import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Injector,
  model,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { catchError, of, tap } from 'rxjs';

interface Country {
  flags: Flags;
  name: Name;
  cca2: string;
  cca3: string;
  idd: Idd;
  translations: { spa: { common: string; official: string } };
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  spa: Spa;
}

interface Spa {
  official: string;
  common: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}

@Component({
  selector: 'app-country-select',
  imports: [Select, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true,
    },
  ],
  template: `<p-select
    class="w-full"
    [options]="countries()"
    [formControl]="countryCtrl"
    optionLabel="translations.spa.common"
    optionValue="cca3"
    appendTo="body"
    filter
    filterPlaceholder="Buscar país"
    showClear="true"
    placeholder="Seleccione un país"
  >
    <ng-template #item let-item>
      <div class="flex items-center gap-2">
        <img [src]="item.flags.svg" class="w-6" [alt]="item.flags.alt" />
        <div class="ml-2">{{ item.translations.spa.common }}</div>
      </div>
    </ng-template>
    <ng-template #selectedItem let-option>
      <div class="flex items-center gap-2">
        <img [src]="option.flags.svg" class="w-6" [alt]="option.flags.alt" />
        <div class="ml-2">{{ option.translations.spa.common }}</div>
      </div>
    </ng-template>
    <ng-template #dropdownicon>
      <i class="pi pi-map"></i>
    </ng-template>
  </p-select>`,
  styles: `
  :host {
    @apply w-full;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectComponent implements ControlValueAccessor, OnInit {
  private http = inject(HttpClient);
  private injector = inject(Injector);
  public countryCtrl!: FormControl;

  public countries = toSignal(
    this.http
      .get<Country[]>(process.env['COUNTRIES_API']!)
      .pipe(catchError(() => of([]))),
    { initialValue: [] }
  );
  public value = model<string>();
  onChange: any = (val: any) => {
    console.log(val);
  };
  onTouched: any = () => {
    console.log('touched');
  };

  writeValue(obj: any): void {
    this.value.set(this.countryCtrl.value);
    this.onChange(this.value());
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.countryCtrl.disable({ emitEvent: false });
    else this.countryCtrl.enable({ emitEvent: false });
  }

  ngOnInit(): void {
    const injectedControl = this.injector.get(NgControl);
    if (!injectedControl) {
      throw new Error('CountrySelectComponent requires an NgControl');
    }
    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;
        this.countryCtrl = control;
        this.countryCtrl.valueChanges
          .pipe(
            takeUntilDestroyed(),
            tap((value) => update.emit(value))
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.countryCtrl = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.countryCtrl = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }
  }
}
