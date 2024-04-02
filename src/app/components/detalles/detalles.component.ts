import { Component, Input, OnInit } from '@angular/core';
import { ConsolidatedItem } from '../header/header.component';
import {
  PressGeneralItem,
  PressAcumuladosItem,
} from 'src/app/models/press-data.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
  // Propiedad de entrada para recibir el ítem consolidado que se mostrará en los detalles.
  @Input() consolidatedItem!: ConsolidatedItem;

  constructor() {}

  ngOnInit() {}

  // Método de tipo guardia para determinar si un ítem es de tipo PressGeneralItem.
  isPressGeneralItem(
    item: PressGeneralItem | PressAcumuladosItem
  ): item is PressGeneralItem {
    // Devuelve true si el ítem tiene la propiedad 'total', característica de PressGeneralItem.
    return (item as PressGeneralItem).total !== undefined;
  }

  // Método de tipo guardia para determinar si un ítem es de tipo PressAcumuladosItem.
  isPressAcumuladosItem(
    item: PressGeneralItem | PressAcumuladosItem
  ): item is PressAcumuladosItem {
    // Devuelve true si el ítem tiene la propiedad 'totaluno', característica de PressAcumuladosItem.
    return (item as PressAcumuladosItem).totaluno !== undefined;
  }
}
