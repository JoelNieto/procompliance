import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputText } from 'primeng/inputtext';
import { v4 } from 'uuid';
import { markGroupDirty } from './services/util.service';
import { CountriesStore } from './stores/countries.store';

@Component({
  selector: 'app-country-form',
  imports: [InputText, Button, ReactiveFormsModule],
  providers: [],
  template: `<form [formGroup]="form" (ngSubmit)="saveChanges()">
    <div class="flex flex-col w-full p-4 space-y-4">
      <div class="input-container">
        <label for="name">Nombre</label>
        <input pInputText formControlName="name" placeholder="Nombre" />
      </div>
      <div class="input-container">
        <label for="iso2">ISO2</label>
        <input pInputText formControlName="iso2" placeholder="ISO2" />
      </div>
      <div class="input-container">
        <label for="iso3">ISO3</label>
        <input pInputText formControlName="iso3" placeholder="ISO3" />
      </div>
      <div class="input-container">
        <label for="local_name">Nombre local</label>
        <input
          pInputText
          formControlName="local_name"
          placeholder="Nombre local"
        />
      </div>
    </div>
    <div class="dialog-actions">
      <p-button label="Guardar" type="submit" />
    </div>
  </form>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryFormComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(v4(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
      updateOn: 'change',
    }),
    iso2: new FormControl('', {
      validators: [Validators.maxLength(2)],
      nonNullable: true,
      updateOn: 'change',
    }),
    iso3: new FormControl('', {
      validators: [Validators.maxLength(3)],
      nonNullable: true,
      updateOn: 'change',
    }),
    local_name: new FormControl('', { nonNullable: true }),
  });

  public dialogRef = inject(DynamicDialogRef);
  private dialog = inject(DynamicDialogConfig);
  private store = inject(CountriesStore);
  private message = inject(MessageService);

  public ngOnInit() {
    const { country } = this.dialog.data;
    if (country) {
      this.form.patchValue(country);
    }
  }

  saveChanges() {
    if (this.form.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.form.invalid) {
      markGroupDirty(this.form);
      this.message.add({
        severity: 'error',
        summary: 'Formulario invalido',
        detail: 'Por favor, revise los campos',
      });
      return;
    }
    const { country } = this.dialog.data;
    if (country) {
      this.store.editItem(this.form.value);
    } else {
      this.store.createItem(this.form.getRawValue());
    }

    this.dialogRef.close();
  }
}
