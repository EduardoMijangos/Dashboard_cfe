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
    // Verifica que mapContainer esté definido
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer.nativeElement).setView(
        [17.0732, -96.7266],
        6
      );

      // Añade capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Añade marcadores para Oaxaca, Chiapas y Tabasco
      L.marker([17.0732, -96.7266]).addTo(this.map).bindPopup('Oaxaca');
      L.marker([16.7569, -93.1292]).addTo(this.map).bindPopup('Chiapas');
      L.marker([17.9875, -92.9303]).addTo(this.map).bindPopup('Tabasco');
    }
  }
}
