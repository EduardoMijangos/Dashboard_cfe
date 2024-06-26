import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ZonasComponent } from './components/zonas/zonas.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { AgenciaComponent } from './components/agencia/agencia.component';
import { IngresosFechaComponent } from './components/ingresos-fecha/ingresos-fecha.component';
import { IngresosSemanaComponent } from './components/ingresos-semana/ingresos-semana.component';
import { DescargarComponent } from './components/descargar/descargar.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/componentsmodule.module').then(
        (m) => m.ComponentsmoduleModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'zonas',
    component: ZonasComponent,
  },
  {
    path: 'ingresos',
    component: IngresosComponent,
  },
  {
    path: 'agencia/:zonaAg',
    component: AgenciaComponent,
  },
  {
    path: 'ingresos-fecha/:mes',
    component: IngresosFechaComponent,
  },
  {
    path: 'ingresosemana/:semana',
    component: IngresosSemanaComponent,
  },
  {
    path: 'descargar',
    component: DescargarComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
