import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Participant } from '@procompliance/models';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ParticipantFormComponent } from './participant-form.component';
import { ParticipantsStore } from './stores/participants.store';
@Component({
  selector: 'app-participants',
  imports: [TableModule, Card, Button, RouterLink],
  providers: [DynamicDialogRef, DialogService],
  template: `<p-card>
    <ng-template #title>
      <div class="flex justify-between items-center">
        <h2>Participantes</h2>
        <p-button
          icon="pi pi-plus"
          label="Agregar"
          class="p-button-rounded"
          (onClick)="editParticipant()"
        />
      </div>
    </ng-template>
    <ng-template #subtitle>Listado de participantes </ng-template>
    <p-table
      [value]="participants.entities()"
      paginator
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
    >
      <ng-template #header>
        <tr>
          <th>Nombre</th>
          <th>Documento</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-participant>
        <tr>
          <td>{{ participant.first_name }} {{ participant.last_name }}</td>
          <td>{{ participant.document_id }}</td>
          <td>{{ participant.email }}</td>
          <td>
            @if(participant.status === 'active') {
            <span class="text-green-500 pi pi-check-circle"></span>
            }@else {
            <span class="text-red-500">{{ participant.status }}</span>
            }
          </td>
          <td>
            <p-button
              icon="pi pi-pencil"
              severity="success"
              rounded
              text
              outlined
              routerLink="/participants/{{ participant.id }}"
            />
            <p-button
              icon="pi pi-trash"
              severity="danger"
              rounded
              text
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
export class ParticipantsComponent implements OnInit {
  public participants = inject(ParticipantsStore);
  private dialog = inject(DialogService);
  public dialogRef = inject(DynamicDialogRef);
  ngOnInit(): void {
    this.participants.fetchItems({ refresh: true });
  }

  editParticipant(participant?: Participant) {
    this.dialogRef = this.dialog.open(ParticipantFormComponent, {
      data: { participant },
      modal: true,
      closable: true,
      header: 'Editar participante',
      width: '70%',
    });
  }
}
