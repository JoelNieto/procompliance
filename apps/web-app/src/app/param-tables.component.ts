import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParamTable } from '@procompliance/models';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ParamTablesFormComponent } from './param-tables-form.component';
import { ParamTablesStore } from './stores/param-tables.store';

@Component({
  selector: 'app-param-tables',
  imports: [TableModule, Card, Button, DatePipe, RouterLink],
  providers: [DynamicDialogRef, DialogService],
  template: `<p-card>
    <ng-template #title>Tablas de Parametros</ng-template>
    <ng-template #subtitle>Listado de tablas de parametrizacion</ng-template>
    <p-table [value]="tables.entities()" paginator [rows]="10">
      <ng-template #caption>
        <div class="flex justify-between items-center">
          <h3>Elementos</h3>
          <p-button icon="pi pi-plus" label="Agregar" (onClick)="editTable()" />
        </div>
      </ng-template>
      <ng-template #header>
        <tr>
          <th>Nombre</th>
          <th>Codigo</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-table>
        <tr>
          <td>
            <a
              routerLink="/param-tables/{{ table.id }}"
              class="text-blue-600 font-semibold hover:underline"
              >{{ table.name }}</a
            >
          </td>
          <td>{{ table.code }}</td>
          <td>{{ table.created_at | date : 'short' }}</td>
          <td>
            <p-button
              icon="pi pi-pencil"
              rounded
              text
              severity="success"
              outlined
              (onClick)="editTable(table)"
            />
            <p-button
              icon="pi pi-trash"
              rounded
              text
              severity="danger"
              outlined
            />
          </td>
        </tr>
      </ng-template>
    </p-table>
  </p-card>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamTablesComponent implements OnInit {
  public tables = inject(ParamTablesStore);
  private confirmationService = inject(ConfirmationService);
  private ref = inject(DynamicDialogRef);
  private dialog = inject(DialogService);

  ngOnInit(): void {
    this.tables.fetchItems({ refresh: true });
  }

  editTable(table?: ParamTable) {
    this.ref = this.dialog.open(ParamTablesFormComponent, {
      data: { table },
      header: 'Editar Tabla de Parametros',
      modal: true,
      closable: true,
      width: '50%',
      style: { 'max-height': '90vh', overflow: 'auto' },
    });
  }
}
