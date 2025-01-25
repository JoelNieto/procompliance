import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { Country } from '@procompliance/models';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { CountryFormComponent } from './country-form.component';
import { CountriesStore } from './stores/countries.store';
@Component({
  selector: 'app-countries',
  providers: [DynamicDialogRef, DialogService],
  imports: [TableModule, Button, Tooltip, IconField, InputIcon, InputText],
  template: `
    <p-table
      #dt
      [value]="countries()"
      [scrollable]="true"
      [loading]="store.isLoading()"
      dataKey="id"
      styleClass="p-datatable-striped"
      paginator
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [globalFilterFields]="['name', 'iso2', 'iso3', 'local_name']"
    >
      <ng-template #emptymessage>
        <tr>
          <td colspan="5">
            <div class="w-full flex justify-center py-4 items-center">
              <p>No hay datos</p>
            </div>
          </td>
        </tr>
      </ng-template>
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
    </p-table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent implements OnInit {
  public store = inject(CountriesStore);
  public countries = computed(() => [...this.store.entities()]);
  private confirmationService = inject(ConfirmationService);
  private ref = inject(DynamicDialogRef);
  private dialog = inject(DialogService);

  ngOnInit(): void {
    this.store.fetchItems({ refresh: true });
  }

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
    this.confirmationService.confirm({
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-info-circle',
      message: '¿Está seguro que deseaa eliminar este país?',
      rejectButtonProps: { label: 'No', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Sí', severity: 'danger' },
      accept: () => {
        this.store.deleteItem(id);
      },
    });
  }
}
