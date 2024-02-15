import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from "ng-apexcharts";

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
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: "line",
      height: 350, 
      background: "#CAEDE0",
      
    },
    xaxis: {
      categories: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"

      ]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight",
      colors: ['#008E5A']
    },
    title: {
      text: "Ingresos por Mes",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      }
    },
    

  };

  constructor(
    private router: Router
  ) {
    this.chartOptions.series = [
      {
        name: "Ingresos Mes:",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 43, 90, 89]
      }
    ];
  }


  verIngresosFecha(month: string) {
    // Construye la URL del componente 'ingresos-fecha' con el mes como parámetro
    const url = `/ingresos-fecha/${month.toLowerCase()}`;
    this.router.navigate([url]);  }

  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
}
