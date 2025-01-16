import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Country } from '@procompliance/models';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CountryFormComponent } from './country-form.component';
import { GlobalStore } from './stores/app.store';

@Component({
  selector: 'app-countries',
  providers: [ConfirmationService, DynamicDialogRef, DialogService],
  imports: [
    TableModule,
    Button,
    TooltipModule,
    IconField,
    InputIcon,
    InputText,
    ConfirmDialog,
  ],
  template: `<p-confirmdialog /><p-table
      #dt
      [value]="countries()"
      [scrollable]="true"
      dataKey="id"
      styleClass="p-datatable-striped"
      paginator
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [globalFilterFields]="['name', 'iso2', 'iso3', 'local_name']"
    >
      <ng-template #caption>
        <div class="flex justify-between items-center">
          <p-iconfield iconPosition="left">
            <p-inputicon>
              <i class="pi pi-search"></i>
            </p-inputicon>
            <input
              pInputText
              type="text"
              (input)="dt.filterGlobal($any($event.target).value, 'contains')"
              placeholder="Buscar"
            />
          </p-iconfield>
          <p-button
            label="Nuevo país"
            icon="pi pi-plus"
            (onClick)="editCountry()"
          />
        </div>
      </ng-template>
      <ng-template #header>
        <tr>
          <th pSortableColumn="name">Nombre <p-sortIcon field="name" /></th>
          <th pSortableColumn="iso2">ISO2 <p-sortIcon field="iso2" /></th>
          <th pSortableColumn="iso3">ISO3 <p-sortIcon field="iso3" /></th>
          <th pSortableColumn="local_name">
            Nombre local <p-sortIcon field="local_name" />
          </th>
          <th></th>
        </tr>
      </ng-template>
      <ng-template #body let-country>
        <tr>
          <td>{{ country.name }}</td>
          <td>{{ country.iso2 }}</td>
          <td>{{ country.iso3 }}</td>
          <td>{{ country.local_name }}</td>
          <td>
            <p-button
              rounded
              text
              outlined
              icon="pi pi-pencil"
              pTooltip="Editar"
              (onClick)="editCountry(country)"
            />
            <p-button
              rounded
              text
              outlined
              severity="danger"
              icon="pi pi-trash"
              pTooltip="Eliminar"
              (onClick)="deleteCountry(country.id)"
            />
          </td>
        </tr>
      </ng-template>
    </p-table> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  public store = inject(GlobalStore);
  public countries = computed(() => [...this.store.countries()]);
  private confirmationService = inject(ConfirmationService);
  private ref = inject(DynamicDialogRef);
  private dialog = inject(DialogService);

  editCountry(country?: Country) {
    this.ref = this.dialog.open(CountryFormComponent, {
      data: { country },
      modal: true,
      closable: true,
      header: 'Editar país',
      width: '50%',
      style: { 'max-height': '90vh', overflow: 'auto' },
    });
  }

  public deleteCountry(id: string) {
    console.log('deleteCountry', id);
    this.confirmationService.confirm({
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-info-circle',
      message: '¿Está seguro que deseaa eliminar este país?',
      rejectButtonProps: { label: 'No', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Sí', severity: 'danger' },
      accept: () => {
        this.store.deleteCountry(id);
      },
    });
  }
}
