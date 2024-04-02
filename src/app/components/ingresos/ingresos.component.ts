import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';

// Definición del tipo para las opciones de configuración del gráfico.
export type ChartOptions = {
  series: {
    name: string;
    data: (number | null)[];
  }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
})
export class IngresosComponent {
  @ViewChild('chart') chart?: ChartComponent;
  // Opciones de configuración inicial para el gráfico de ingresos por mes.
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'line',
      height: 350,
      background: '#CAEDE0',
    },
    xaxis: {
      categories: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      colors: ['#008E5A'],
    },
    title: {
      text: 'Ingresos por Mes',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
  };

  constructor(private router: Router) {
    // Inicializa la serie del gráfico con datos de ingresos mensuales.
    this.chartOptions.series = [
      {
        name: 'Ingresos Mes:',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 43, 90, 89],
      },
    ];
  }

  // Función para navegar a una vista detallada de ingresos basada en el mes seleccionado.
  verIngresosFecha(month: string) {
    const url = `/ingresos-fecha/${month.toLowerCase()}`;
    this.router.navigate([url]);
  }

  // Array que contiene los nombres de los meses, usado para la generación de la vista y posiblemente para la navegación.
  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
}
