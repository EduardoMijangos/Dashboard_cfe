import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConsolidatedItem } from '../header/header.component';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
})
export class SeleccionComponent implements OnInit {
  // Propiedad de entrada que espera recibir un arreglo de ítems.
  @Input() items!: any[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // Método para cerrar el modal actual.
  cerrarModal() {
    this.modalController.dismiss();
  }

  // Método que se activa al seleccionar un ítem, llamando a `showItemDetails` para mostrar detalles.
  onItemSelect(item: ConsolidatedItem): void {
    this.showItemDetails(item);
  }

  // Método asíncrono para mostrar los detalles de un ítem consolidado en un nuevo modal.
  async showItemDetails(consolidatedItem: ConsolidatedItem) {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        consolidatedItem: consolidatedItem,
      },
    });
    return await modal.present();
  }
}
