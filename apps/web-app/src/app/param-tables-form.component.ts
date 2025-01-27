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
import { ParamTablesStore } from './stores/param-tables.store';

@Component({
  selector: 'app-param-tables-form',
  imports: [ReactiveFormsModule, InputText, Button],
  template: `<form [formGroup]="form" (ngSubmit)="saveChanges()">
    <div class="flex flex-col w-full p-4 space-y-4">
      <div class="input-container">
        <label for="name">Nombre</label>
        <input pInputText formControlName="name" placeholder="Nombre" />
      </div>
      <div class="input-container">
        <label for="code">Codigo</label>
        <input pInputText formControlName="code" placeholder="Codigo" />
      </div>
    </div>
    <div class="dialog-actions">
      <p-button label="Guardar" type="submit" />
    </div>
  </form> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamTablesFormComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(v4(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    code: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    created_at: new FormControl(new Date(), {
      nonNullable: true,
    }),
  });

  public dialogRef = inject(DynamicDialogRef);
  private dialog = inject(DynamicDialogConfig);
  private message = inject(MessageService);
  private tables = inject(ParamTablesStore);

  ngOnInit(): void {
    const { table } = this.dialog.data;
    if (table) {
      this.form.patchValue(table);
    }
  }

  saveChanges() {
    if (!this.form.valid) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos',
      });
      return;
    }

    if (this.dialog.data.table) {
      this.tables.editItem(this.form.value);
    } else {
      this.tables.createItem(this.form.getRawValue());
    }

    this.dialogRef.close();
  }
}
