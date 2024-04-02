import { Component, Input, OnInit } from '@angular/core';
import { ConsolidatedItem } from '../header/header.component';
import { ModalController } from '@ionic/angular';
import { PressGeneralItem, PressAcumuladosItem } from 'src/app/models/press-data.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent  implements OnInit {
  @Input() consolidatedItem!: ConsolidatedItem;
  

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}


  
// Agrega esta función en tu componente de detalles
isPressGeneralItem(item: PressGeneralItem | PressAcumuladosItem): item is PressGeneralItem {
  return (item as PressGeneralItem).total !== undefined;
}

isPressAcumuladosItem(item: PressGeneralItem | PressAcumuladosItem): item is PressAcumuladosItem {
  return (item as PressAcumuladosItem).totaluno !== undefined;
}

}
