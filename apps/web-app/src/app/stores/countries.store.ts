import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Country } from '@procompliance/models';
import { MessageService } from 'primeng/api';
import { pipe, switchMap, tap } from 'rxjs';

type State = {
  countries: Country[];
  isLoading: boolean;
};

export function withCountriesStore() {
  return signalStoreFeature(
    withState<State>({ countries: [], isLoading: false }),
    withProps(() => ({
      _http: inject(HttpClient),
      _messageService: inject(MessageService),
    })),
    withMethods((state) => ({
      fetchCountries: rxMethod<void>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap(() =>
            state._http.get<Country[]>('/api/countries').pipe(
              tapResponse({
                next: (countries) => patchState(state, { countries }),
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
      createCountry: rxMethod<Partial<Country>>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((country) =>
            state._http.post<Country>('/api/countries', country).pipe(
              tapResponse({
                next: (newCountry) => {
                  patchState(state, {
                    countries: [...state.countries(), newCountry],
                  });
                  state._messageService.add({
                    severity: 'success',
                    detail: 'Pais creado',
                    summary: 'Exito',
                  });
                },
                error: (error) => {
                  console.error(error);
                  state._messageService.add({
                    severity: 'danger',
                    detail: 'Algo salio mal, intente de nuevo',
                    summary: 'Error',
                  });
                },
                finalize: () => patchState(state, { isLoading: false }),
              })
            )
          )
        )
      ),
      editCountry: rxMethod<Partial<Country>>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((country) =>
            state._http
              .patch<Country>(`/api/countries/${country.id}`, country)
              .pipe(
                tapResponse({
                  next: (updatedCountry) => {
                    patchState(state, {
                      countries: state
                        .countries()
                        .map((c) =>
                          c.id === updatedCountry.id ? updatedCountry : c
                        ),
                    });
                    state._messageService.add({
                      severity: 'success',
                      detail: 'Pais actualizado',
                      summary: 'Exito',
                    });
                  },
                  error: (error) => console.error(error),
                  finalize: () => patchState(state, { isLoading: false }),
                })
              )
          )
        )
      ),
      deleteCountry: rxMethod<string>(
        pipe(
          tap(() => patchState(state, { isLoading: true })),
          switchMap((id) =>
            state._http.delete<void>(`/api/countries/${id}`).pipe(
              tapResponse({
                next: () => {
                  patchState(state, {
                    countries: state.countries().filter((c) => c.id !== id),
                  });
                  state._messageService.add({
                    severity: 'success',
                    detail: 'Pais eliminado',
                    summary: 'Exito',
                  });
                },
                error: (error) => {
                  console.error(error);
                  state._messageService.add({
                    severity: 'danger',
                    detail: 'Algo salio mal, intente de nuevo',
                    summary: 'Error',
                  });
                },
                finalize: () => patchState(state, { isLoading: false }),
              })
            )
          )
        )
      ),
    })),
    withHooks({
      onInit(state) {
        state.fetchCountries();
      },
    })
  );
}
