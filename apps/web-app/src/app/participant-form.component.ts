import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
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
import { CountrySelectComponent } from './components/country-select.component';
import { markGroupDirty } from './services/util.service';
import { CountriesStore } from './stores/countries.store';
import { ParticipantsStore } from './stores/participants.store';

@Component({
  selector: 'app-participant-form',
  imports: [InputText, ReactiveFormsModule, Button, CountrySelectComponent],
  template: `<form [formGroup]="form" (ngSubmit)="saveChanges()">
    <div class=" md:flex-col w-full gap-4 grid grid-cols-2">
      <div class="input-container">
        <label for="first_name">Nombre</label>
        <input pInputText formControlName="first_name" placeholder="Nombre" />
      </div>
      <div class="input-container">
        <label for="last_name">Apellido</label>
        <input pInputText formControlName="last_name" placeholder="Apellido" />
      </div>
      <div class="input-container">
        <label for="document_id">Documento</label>
        <input
          pInputText
          formControlName="document_id"
          placeholder="Documento"
        />
      </div>
      <div class="input-container">
        <label for="email">Correo</label>
        <input
          pInputText
          formControlName="email"
          type="email"
          placeholder="Correo"
        />
      </div>
      <div class="input-container">
        <label for="nationality">Nacionalidad</label>
        <app-country-select formControlName="nationality" />
      </div>
      <div class="input-container">
        <label for="residence_country">País de residencia</label>
        <app-country-select formControlName="residence_country" />
      </div>
      <div class="input-container">
        <label for="birth_country">País de nacimiento</label>
        <app-country-select formControlName="birth_country" />
      </div>
      <div class="input-container">
        <label for="status">Estado</label>
        <input pInputText formControlName="status" placeholder="Estado" />
      </div>
    </div>
    <div class="dialog-actions">
      <p-button label="Guardar" type="submit" />
    </div>
  </form> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantFormComponent implements OnInit {
  public countries = inject(CountriesStore);
  private message = inject(MessageService);
  form = new FormGroup({
    id: new FormControl(v4(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    first_name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    last_name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    document_id: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    nationality: new FormControl<string>('', {
      nonNullable: true,
    }),
    residence_country: new FormControl<string>('', {
      nonNullable: true,
    }),
    birth_country: new FormControl<string>('', {
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    status: new FormControl<'active' | 'inactive'>('active', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    gender: new FormControl<'male' | 'female' | 'other'>('male', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    address: new FormControl('', {
      nonNullable: true,
    }),
    city: new FormControl('', {
      nonNullable: true,
    }),
  });
  public dialogRef = inject(DynamicDialogRef);
  private dialog = inject(DynamicDialogConfig);
  private store = inject(ParticipantsStore);
  private injector = inject(Injector);

  public ngOnInit() {
    this.countries.fetchItems({ refresh: false });

    effect(
      () => {
        const participant = this.store.selectedEntity();
        if (participant) {
          this.form.patchValue(participant);
        }
      },
      { injector: this.injector }
    );
  }

  saveChanges() {
    if (!this.form.valid) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, rellene todos los campos',
      });
      markGroupDirty(this.form);
      return;
    }
    const request = this.form.getRawValue();
    if (this.store.selectedEntity()) {
      this.store.editItem(request);
    } else {
      this.store.createItem(request);
    }
    this.dialogRef.close();
  }
}
