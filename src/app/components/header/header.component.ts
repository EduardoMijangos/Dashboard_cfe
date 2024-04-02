import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { PressAcumuladosItem, PressData, PressGeneralItem } from 'src/app/models/press-data.model';
import { PresentacionesService } from 'src/app/services/presentaciones.service';
import { DetallesComponent } from '../detalles/detalles.component';
import { SeleccionComponent } from '../seleccion/seleccion.component';

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
  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;

  menuOpen = false;

  paginaActual: string = '';

  searchText = ''; // Asegúrate de que searchText esté inicializado, incluso si es solo una cadena vacía.
  items: any[] = []; // Inicializa como arreglo vacío
  filteredItems: any[] = []; // Inicializa como arreglo vacío

  pressData: PressData = { // Inicialización aquí, asegurándote de que todos los campos estén presentes
    totalIngresos: '',
    pressGeneral1: [],
    pressGeneral2: [],
    pressGeneral4: [],
    pressAcumulados3: [],
    pressAcumulados5: [],
    pressAcumulados7: [],
  }
  
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];


  constructor(
    private router: Router,
    private alertController: AlertController,
    private presentacionesService: PresentacionesService,
    private modalController: ModalController
  ) {
    this.fechaSeleccionada = new Date().toISOString().split('T')[0]; 
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());

    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1); 
    this.fechaSeleccionada = ayer.toISOString(); // Convertir formato de fecha(YYYY-MM-DDTHH:MM:SS)
    this.fechaSeleccionada = this.fechaSeleccionada.split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
  }

  ngOnInit() {
    this.loadItems()
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

  get isLargeScreen() {
    return window.innerWidth >= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  checkScreenSize() {
    if (this.isLargeScreen && this.menuOpen) {
      this.toggleMenu();
    }
  }

  prepareSearchData(pressData: PressData): Map<string, ConsolidatedItem> {
    let itemsMap = new Map<string, ConsolidatedItem>();
  
    // Agregar ítems de pressGeneral1 y pressGeneral2 al mapa.
    [...pressData.pressGeneral1, ...pressData.pressGeneral2, ...pressData.pressGeneral4].forEach(item => {
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
  
    // Agregar ítems de pressAcumulados3, pressAcumulados5 y pressAcumulados7 al mapa.
    [...pressData.pressAcumulados3, ...pressData.pressAcumulados5, ...pressData.pressAcumulados7].forEach(item => {
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

  
  async onSearchChange(searchValue: string) {
    this.filteredItems = this.items.filter(item => {
      // Cambia esta lógica de filtrado según tus necesidades
      return item.descripcion.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Si hay resultados, abre el modal para mostrarlos
    if (this.filteredItems.length > 0) {
      const modal = await this.modalController.create({
        component: SeleccionComponent,
        componentProps: {
          items: this.filteredItems
        }
      });
      await modal.present();
    }
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
  
  

  loadItems() {
    this.presentacionesService.obtenerInfo(this.fechaSeleccionada).subscribe(
      (data) => {
        console.log("Respuesta completa del servicio: ", data);
        this.pressData = data;
        const itemsMap = this.prepareSearchData(this.pressData);
        this.items = Array.from(itemsMap.values());
        console.log("Items after loading: ", this.items);
        this.filteredItems = [];
      },
      (error) => {
        console.error('Error al obtener los items', error);
      }
    );
  }
  
}
