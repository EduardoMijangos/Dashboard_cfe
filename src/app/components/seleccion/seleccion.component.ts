import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConsolidatedItem } from '../header/header.component';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
})
export class SeleccionComponent  implements OnInit {
  @Input() items!: any[];

  constructor( private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  onItemSelect(item: ConsolidatedItem): void {
    // Aquí puedes hacer cosas como abrir un modal o navegar a una nueva página con los detalles del ítem.
    // Por ejemplo, asumamos que vas a mostrar una alerta con la descripción del ítem:
    this.showItemDetails(item);
  }

  async showItemDetails(consolidatedItem: ConsolidatedItem) {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        'consolidatedItem': consolidatedItem
      }
    });
    return await modal.present();
  }

}
