import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CountryItemComponent } from './components/country-item.component';
import { ParticipantFormComponent } from './participant-form.component';
import { ParticipantsStore } from './stores/participants.store';

@Component({
  selector: 'app-participant-details',
  imports: [Card, Button, CountryItemComponent, DatePipe],
  providers: [DynamicDialogRef, DialogService],
  template: `@let participant = store.selectedEntity(); @if(participant) {
    <p-card>
      <ng-template #title>
        <div class="flex w-full items-center justify-between">
          <h2>{{ participant.first_name }} {{ participant.last_name }}</h2>
          <p-button icon="pi pi-pencil" (click)="editParticipant()" />
        </div>
      </ng-template>

      <ng-template #subtitle>
        {{ participant.document_id }}
      </ng-template>
      <ng-template #content>
        <div class="p-grid p-dir-col">
          <div class="p-col">
            <strong>Correo:</strong> {{ participant.email }}
          </div>
          <div class="flex items-center gap-2">
            <strong>Nacionalidad:</strong> @if(participant.nationality){
            <app-country-item [countryCode]="participant.nationality" />}
          </div>
          <div class="flex items-center gap-2">
            <strong>Residencia:</strong> @if(participant.residence_country){
            <app-country-item [countryCode]="participant.residence_country" />}
          </div>
          <div>
            <strong>Fecha de nacimiento:</strong>
            {{ participant.birth_date | date }}
          </div>
        </div>
      </ng-template>
    </p-card>
    } `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantDetailsComponent implements OnInit {
  public store = inject(ParticipantsStore);
  public participantId = input.required<string>();
  private dialog = inject(DialogService);
  public dialogRef = inject(DynamicDialogRef);

  ngOnInit(): void {
    this.store.fetchItem(this.participantId());
  }

  editParticipant() {
    this.dialogRef = this.dialog.open(ParticipantFormComponent, {
      modal: true,
      closable: true,
      header: 'Editar participante',
      width: '70%',
    });
  }
}
