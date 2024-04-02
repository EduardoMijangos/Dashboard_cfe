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

      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: `
          <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg"> <!-- Tamaño ajustado aquí -->
            <style>
              .st0{fill:#008E5A;} /* Color del marcador */
            </style>
            <path class="st0" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
        `, // Asegúrate de que la clase 'st0' se aplique a los elementos que desees colorear.
        iconSize: [48, 48], // Tamaño del icono ajustado aquí
        iconAnchor: [24, 48], // Ajusta para centrar el icono en la ubicación del marcador
        popupAnchor: [0, -48] // Ajusta para que el popup se abra arriba del icono
      });
      
      

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
        L.marker(div.coords, { icon: customIcon })
          .addTo(this.map)
          .bindPopup(div.descripcion);
      });
    }
  }
}