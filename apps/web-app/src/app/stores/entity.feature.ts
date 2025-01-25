import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  EntityId,
  removeEntity,
  setAllEntities,
  setEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { filter, pipe, switchMap, tap } from 'rxjs';

type State = {
  error: any;
  isLoading: boolean;
  selectedEntityId: EntityId | null;
};

export function withCustomEntity<T extends { id: EntityId }>(name: string) {
  return signalStoreFeature(
    withState<State>({ isLoading: false, error: null, selectedEntityId: null }),
    withEntities<T>(),
    withProps(() => ({
      _http: inject(HttpClient),
      _messageService: inject(MessageService),
    })),
    withComputed(({ entityMap, selectedEntityId }) => ({
      selectedEntity: computed(() => {
        const selectedId = selectedEntityId();
        return selectedId ? entityMap()[selectedId] : null;
      }),
    })),
    withMethods((state) => ({
      selectEntity: (id: EntityId) =>
        patchState(state, { selectedEntityId: id }),
      clearSelectedEntity: () => patchState(state, { selectedEntityId: null }),
      fetchItems: rxMethod<{ refresh: boolean }>(
        pipe(
          filter(({ refresh }) => state.entities().length === 0 || refresh),
          tap(() => patchState(state, { isLoading: true, error: null })),
          switchMap(() =>
            state._http.get<T[]>(`${process.env['BACKEND_PORT']}/${name}`).pipe(
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
              .post<T>(`${process.env['BACKEND_PORT']}/${name}`, item)
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
      fetchItem: rxMethod<EntityId>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((id) =>
            state._http
              .get<T>(`${process.env['BACKEND_PORT']}/${name}/${id}`)
              .pipe(
                tapResponse({
                  next: (item) => {
                    if (!state.entities().find((entity) => entity.id === id)) {
                      patchState(state, addEntity(item));
                    } else {
                      patchState(state, setEntity(item));
                    }
                    patchState(state, { selectedEntityId: id });
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
      editItem: rxMethod<Partial<T>>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((item) =>
            state._http
              .patch<T>(
                `${process.env['BACKEND_PORT']}${name}/${item.id}`,
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
              .delete<void>(`${process.env['BACKEND_PORT']}/${name}/${id}`)
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
