import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import {
  PressAcumuladosItem,
  PressData,
  PressGeneralItem,
} from 'src/app/models/press-data.model';
import { PresentacionesService } from 'src/app/services/presentaciones.service';
import { DetallesComponent } from '../detalles/detalles.component';
import { SeleccionComponent } from '../seleccion/seleccion.component';

// Interfaces para estructurar la información manipulada por el componente.
export interface ItemBuscable {
  descripcion: string;
  total: number;
}

export interface SummarizedItem {
  descripcion: string;
  total: number;
}

export interface ConsolidatedItem {
  descripcion: string;
  items: (PressGeneralItem | PressAcumuladosItem)[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Estado de los botones y variables para la gestión del menú y navegación.
  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;

  menuOpen = false;

  paginaActual: string = '';

  searchText = '';
  items: any[] = [];
  filteredItems: any[] = [];

  pressData: PressData = {
    totalIngresos: '',
    pressGeneral1: [],
    pressGeneral2: [],
    pressGeneral4: [],
    pressAcumulados3: [],
    pressAcumulados5: [],
    pressAcumulados7: [],
  };

  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private presentacionesService: PresentacionesService,
    private modalController: ModalController
  ) {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());

    this.fechaSeleccionada = "2024-03-01"
  }

  ngOnInit() {
    this.loadItems();
  }

  // Función para establecer la página actual y mostrar la alerta si corresponde
  async establecerPaginaActual(pagina: string) {
    if (this.paginaActual === pagina) {
      const alert = await this.alertController.create({
        header: 'Ya estas ahi',
        message: 'Ya te encuentras en esta opción',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.paginaActual = pagina;
      this.redirigirAPagina(pagina);
    }
  }

  // Función para redirigir al usuario a la página especificada.
  redirigirAPagina(pagina: string) {
    switch (pagina) {
      case 'Inicio':
        this.router.navigate(['/home']);
        break;
      case 'Ingresos':
        this.router.navigate(['/ingresos']);
        break;
      case 'Zonas':
        this.router.navigate(['/zonas']);
        break;
      default:
        break;
    }
  }

  // Funciones para manejar la activación de botones y el cambio de página.
  btnInicio() {
    this.establecerPaginaActual('Inicio');
    this.isBtnInicioActive = !this.isBtnInicioActive;
  }

  btnIngresos() {
    this.establecerPaginaActual('Ingresos');
    this.isBtnIngresosActive = !this.isBtnIngresosActive;
  }

  btnZonas() {
    this.establecerPaginaActual('Zonas');
    this.isBtnZonasActive = !this.isBtnZonasActive;
  }

  // Utilidad para determinar si la pantalla es grande basada en el ancho de la ventana.
  get isLargeScreen() {
    return window.innerWidth >= 768;
  }

  // Función para alternar la apertura del menú.
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  //Verificar tamano de la pantalla
  checkScreenSize() {
    if (this.isLargeScreen && this.menuOpen) {
      this.toggleMenu();
    }
  }

  // Prepara los datos para la búsqueda agrupando items por descripción.
  prepareSearchData(pressData: PressData): Map<string, ConsolidatedItem> {
    let itemsMap = new Map<string, ConsolidatedItem>();
    [
      ...pressData.pressGeneral1,
      ...pressData.pressGeneral2,
      ...pressData.pressGeneral4,
    ].forEach((item) => {
      let existingItem = itemsMap.get(item.descripcion);
      if (existingItem) {
        existingItem.items.push(item);
      } else {
        itemsMap.set(item.descripcion, {
          descripcion: item.descripcion,
          items: [item],
        });
      }
    });
    [
      ...pressData.pressAcumulados3,
      ...pressData.pressAcumulados5,
      ...pressData.pressAcumulados7,
    ].forEach((item) => {
      let existingItem = itemsMap.get(item.descripcion);
      if (existingItem) {
        existingItem.items.push(item);
      } else {
        itemsMap.set(item.descripcion, {
          descripcion: item.descripcion,
          items: [item],
        });
      }
    });

    return itemsMap;
  }

  // Manejador para cambios en la búsqueda, filtra items basado en el texto de búsqueda y posiblemente muestra un modal con los resultados.
  async onSearchChange(searchValue: string) {
    this.filteredItems = this.items.filter((item) => {
      // Cambia esta lógica de filtrado según tus necesidades
      return item.descripcion.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Si hay resultados, abre el modal para mostrarlos
    if (this.filteredItems.length > 0) {
      const modal = await this.modalController.create({
        component: SeleccionComponent,
        componentProps: {
          items: this.filteredItems,
        },
      });
      await modal.present();
    }
  }

  // Selecciona un item y muestra sus detalles en un modal.
  onItemSelect(item: ConsolidatedItem): void {
    this.showItemDetails(item);
  }

  // Muestra los detalles de un item consolidado en un modal.
  async showItemDetails(consolidatedItem: ConsolidatedItem) {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        consolidatedItem: consolidatedItem,
      },
    });
    return await modal.present();
  }

  // Carga los items utilizando un servicio y prepara los datos para la búsqueda.
  loadItems() {
    this.presentacionesService.obtenerInfo(this.fechaSeleccionada).subscribe(
      (data) => {
        console.log('Respuesta completa del servicio: ', data);
        if(data !== null){
        this.pressData = data;
        } else{}
        const itemsMap = this.prepareSearchData(this.pressData);
        this.items = Array.from(itemsMap.values());
        console.log('Items after loading: ', this.items);
        this.filteredItems = [];
      },
      (error) => {
        console.error('Error al obtener los items', error);
      }
    );
  }
}
