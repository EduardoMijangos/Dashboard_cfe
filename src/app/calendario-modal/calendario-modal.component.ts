// calendario-modal.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendario-modal',
  templateUrl: './calendario-modal.component.html',
  styleUrls: ['./calendario-modal.component.scss'],
})
export class CalendarioModalComponent {
  @Input() selectedDate: string = '';

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  //Almacena la fecha que selecciona en el calendario y lo muestra en un log
  guardarFechaSeleccionada() {
    console.log('Fecha seleccionada:', this.selectedDate); // Mostrar la fecha seleccionada en la consola
    this.modalController.dismiss({
      selectedDate: this.selectedDate
    });
  }
}
