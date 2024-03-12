import { IngresosFechaComponent } from './ingresos-fecha/ingresos-fecha.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZonasComponent } from './zonas/zonas.component';
import { MapaComponent } from './mapa/mapa.component';
import { FooterComponent } from './footer/footer.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AgenciaComponent } from './agencia/agencia.component';
import { IngresosSemanaComponent } from './ingresos-semana/ingresos-semana.component';
import { DescargarComponent } from './descargar/descargar.component';
import { CalendarioModalComponent } from '../calendario-modal/calendario-modal.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    IngresosComponent,
    ZonasComponent,
    MapaComponent,
    FooterComponent,
    AgenciaComponent,
    IngresosFechaComponent,
    IngresosSemanaComponent,
    DescargarComponent,
    CalendarioModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  exports:[
    HeaderComponent,
    IngresosComponent,
    ZonasComponent,
    MapaComponent,
    FooterComponent,
    AgenciaComponent,
    IngresosFechaComponent,
    IngresosSemanaComponent,
    DescargarComponent,
    CalendarioModalComponent
  ]
})
export class ComponentsmoduleModule { }
