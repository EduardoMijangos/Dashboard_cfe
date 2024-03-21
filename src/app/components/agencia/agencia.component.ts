  import { Component, Input, OnInit, ViewChild } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
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
    selector: 'app-agencia',
    templateUrl: './agencia.component.html',
    styleUrls: ['./agencia.component.scss'],
  })
  export class AgenciaComponent  implements OnInit {

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

    currentZona: string ='';
    @Input() progress: number | undefined = 0; 
    zonas = [
      { name: 'Villahermosa', progress: 90 },
      { name: 'Tuxtla', progress: 75 },
      {name:'Oaxaca', progress: 10}, 
      {name:'Chontalpa', progress:19}, 
      {name:'Tehuantepec', progress:50}, 
      {name:'Tapachula', progress: 70}, 
      {name: 'Huatulco', progress:80}, 
      {name: 'Los Rios', progress:95}, 
      {name: 'San Cristobal', progress: 60}, 
      {name: 'Huajuapan', progress: 89}]
  


    constructor(
      private route: ActivatedRoute
    ) {
      this.chartOptions.series = [
        {
          name: "Ingresos Mes:",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 43, 90, 89]
        }
      ];
      }

    ngOnInit() {
      this.route.params.subscribe((params) => {
        const zone =params['zonaAg'];

        if(!isNaN(zone) && zone >= 1 && zone <= 10){
          this.currentZona = this.obtenerNombreZona(zone);
        } else {
          this.currentZona = params['zonaAg'];
        }

        console.log('Zona vista:', params['zonaAg']);
        
      });
    }

    obtenerNombreZona(numeroZona: number): string{
      const zonas = [
        'Villahermosa', 'Tuxtla', 'Oaxaca', 'Chontalpa', 'Tehuantepec', 'Tapachula', 'Huatulco', ' Los Rios', 'San Cristobal', 'Huajuapan'
      ];

      return zonas[numeroZona - 1] || '';
    }

  }
