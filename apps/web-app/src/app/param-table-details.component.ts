import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Card } from 'primeng/card';
import { ParamTablesStore } from './stores/param-tables.store';

@Component({
  selector: 'app-param-table-details',
  imports: [Card, JsonPipe],
  template: `@let table = store.selectedEntity(); @if(table) {
    <p-card>
      <ng-template #title> {{ table.name }} </ng-template>
      <ng-template #subtitle> {{ table.code }} </ng-template>
    </p-card>
    } `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParamTableDetailsComponent implements OnInit {
  public paramTableId = input.required<string>();
  public store = inject(ParamTablesStore);
  ngOnInit(): void {
    this.store.fetchItem(this.paramTableId());
  }
}
