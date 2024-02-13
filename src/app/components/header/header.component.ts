import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  btnInicio() {
    this.router.navigate(['/home']);
    this.isBtnInicioActive = !this.isBtnInicioActive;
  }

  btnIngresos() {
    this.router.navigate(['/ingresos']);
    this.isBtnIngresosActive = !this.isBtnIngresosActive;
  }

  btnZonas() {
    this.router.navigate(['/zonas']);
    this.isBtnZonasActive = !this.isBtnZonasActive;
  }
}
