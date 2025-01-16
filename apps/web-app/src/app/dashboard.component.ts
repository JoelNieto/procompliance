import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [Button, RouterLink, RouterLinkActive, RouterOutlet],
  template: `<nav
      class="bg-white border border-b-slate-200 flex fixed z-30 w-full items-center justify-between px-4 py-3"
    >
      <div class="flex items-center">
        <p-button icon="pi pi-arrow-left" rounded text />
        <a class="font-bold text-slate-600"> Procompliance</a>
      </div>
    </nav>
    <div class="flex pt-16 overflow-hidden">
      <aside
        class="fixed py-4 h-[calc(100vh-42px)] overflow-y-auto flex flex-col w-64 border-r border-slate-200"
      >
        <ul class="flex flex-col list-none pt-4 ">
          <li>
            <a routerLink="home" routerLinkActive="bg-slate-100 text-slate-800">
              <i class="pi pi-home mr-2"></i>
              Inicio
            </a>
          </li>
          <li>
            <a
              routerLink="participants"
              routerLinkActive="bg-slate-100 text-slate-800"
            >
              <i class="pi pi-users mr-2"></i>
              Participantes
            </a>
          </li>
          <li>
            <a
              routerLink="parameters"
              routerLinkActive="bg-slate-100 text-slate-800"
            >
              <i class="pi pi-table mr-2"></i>
              Parametros
            </a>
          </li>
          <li>
            <a
              routerLink="discards"
              routerLinkActive="bg-slate-100 text-slate-800"
            >
              <i class="pi pi-trash mr-2"></i>
              Descartes
            </a>
          </li>
          <li>
            <a
              routerLink="settings"
              routerLinkActive="bg-slate-100 !text-slate-800"
            >
              <i class="pi pi-cog mr-2"></i>
              Configuración
            </a>
          </li>
        </ul>
      </aside>
      <main class="overflow-auto relative w-full p-4 h-full ms-64">
        <router-outlet />
      </main>
    </div> `,
  styles: `
  a {
    @apply px-6 flex items-center py-3 w-full hover:bg-sky-100 no-underline text-slate-500
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
