import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  EntityId,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { pipe, switchMap, tap } from 'rxjs';

type State = {
  error: any;
  isLoading: boolean;
};

export function withCustomEntity<T extends { id: EntityId }>(name: string) {
  return signalStoreFeature(
    withState<State>({ isLoading: false, error: null }),
    withEntities<T>(),
    withProps(() => ({
      _http: inject(HttpClient),
      _messageService: inject(MessageService),
    })),
    withMethods((state) => ({
      fetchItems: rxMethod<void>(
        pipe(
          tap(() => patchState(state, { isLoading: true, error: null })),
          switchMap(() =>
            state._http
              .get<T[]>(`https://procompliance.onrender.com/api/${name}`)
              .pipe(
                tapResponse({
                  next: (items) => patchState(state, setAllEntities(items)),
                  error: (error) => {
                    state._messageService.add({
                      severity: 'danger',
                      detail: 'Algo salio mal, intente de nuevo',
                      summary: 'Error',
                    });
                    console.error(error);
                  },
                  finalize: () => patchState(state, { isLoading: false }),
                })
              )
          )
        )
      ),
      createItem: rxMethod<T>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((item) =>
            state._http
              .post<T>(`https://procompliance.onrender.com/api/${name}`, item)
              .pipe(
                tapResponse({
                  next: (item) => {
                    patchState(state, addEntity(item));
                    state._messageService.add({
                      severity: 'success',
                      detail: 'Elemento creado con exito',
                      summary: 'Exito',
                    });
                  },
                  error: (error) => {
                    state._messageService.add({
                      severity: 'danger',
                      detail: 'Algo salio mal, intente de nuevo',
                      summary: 'Error',
                    });
                    console.error(error);
                  },
                })
              )
          )
        )
      ),
      editItem: rxMethod<Partial<T>>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((item) =>
            state._http
              .patch<T>(
                `https://procompliance.onrender.com/api/${name}/${item.id}`,
                item
              )
              .pipe(
                tapResponse({
                  next: (changes) => {
                    patchState(
                      state,
                      updateEntity({ id: changes.id, changes })
                    );
                    state._messageService.add({
                      severity: 'success',
                      detail: 'Elemento actualizado con exito',
                      summary: 'Exito',
                    });
                  },
                  error: (error) => {
                    state._messageService.add({
                      severity: 'danger',
                      detail: 'Algo salio mal, intente de nuevo',
                      summary: 'Error',
                    });
                    console.error(error);
                  },
                  finalize: () => patchState(state, { isLoading: false }),
                })
              )
          )
        )
      ),
      deleteItem: rxMethod<EntityId>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((id) =>
            state._http
              .delete<void>(
                `https://procompliance.onrender.com/api/${name}/${id}`
              )
              .pipe(
                tapResponse({
                  next: () => {
                    patchState(state, removeEntity(id));
                    state._messageService.add({
                      severity: 'success',
                      detail: 'Elemento eliminado con exito',
                      summary: 'Exito',
                    });
                  },
                  error: (error) => {
                    state._messageService.add({
                      severity: 'danger',
                      detail: 'Algo salio mal, intente de nuevo',
                      summary: 'Error',
                    });
                    console.error(error);
                  },
                  finalize: () => patchState(state, { isLoading: false }),
                })
              )
          )
        )
      ),
    }))
  );
}
