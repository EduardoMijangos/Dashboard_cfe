import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @ViewChild('map') mapContainer!: ElementRef;

  map: any;

  constructor() {}

  ngOnInit() {
    // Espera a que el ciclo de vida del componente esté completo
    setTimeout(() => {
      this.loadMap();
    });
  }

  loadMap() {
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer.nativeElement).setView(
        [23.6345, -102.5528], // Centrado en México
        5
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Añade marcadores para cada división regional de la CFE
      // NOTA: Las coordenadas son ejemplos y deben ser reemplazadas por las reales
      const divisiones: { descripcion: string; coords: [number, number] }[] = [
        { descripcion: 'Golfo Norte', coords: [25.8403, -97.5253] },
        { descripcion: 'Baja California', coords: [30.8406, -115.2838] },
        { descripcion: 'Peninsular', coords: [24.1426, -110.3128] },
        { descripcion: 'Noroeste', coords: [29.0892, -110.9613] },
        { descripcion: 'Bajío', coords: [21.0186, -101.2591] },
        { descripcion: 'Jalisco', coords: [20.6597, -103.3496] },
        { descripcion: 'Norte', coords: [28.6325, -106.0691] },
        { descripcion: 'Sureste', coords: [17.0732, -96.7266] },
        { descripcion: 'Oriente', coords: [19.4326, -98.1326] },
        { descripcion: 'Valle de México Sur', coords: [19.2869, -99.6532] },
        { descripcion: 'Centro Oriente', coords: [19.4326, -98.1332] },
        { descripcion: 'Valle de México Centro', coords: [19.4341, -99.1386] },
        { descripcion: 'Valle de México Norte', coords: [19.4747, -99.2467] },
        { descripcion: 'Golfo Centro', coords: [19.4326, -96.9223] },
        { descripcion: 'Centro Occidente', coords: [20.6736, -103.344] },
        { descripcion: 'Centro Sur', coords: [18.8333, -99.1833] },
      ];

      divisiones.forEach((div) => {
        L.marker(div.coords)
          .addTo(this.map)
          .bindPopup(div.descripcion);
      });
    }
  }
}