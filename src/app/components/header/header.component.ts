import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnInit() {}

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
}
