import { Component, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill,
  stroke: ApexStroke
};

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss'],
})
export class ZonasComponent{

  @Input() progress: number | undefined = 0; // Inicializa con un valor predeterminado
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



  @ViewChild("chart") chart!: ChartComponent;
  public chartOptionsZonamas: Partial<ChartOptions>;
  public chartOptionsZonamenos: Partial<ChartOptions>;

  constructor(
    private router: Router
  ) {

    this.chartOptionsZonamas = {
      series: [90],
      chart: {
        dropShadow:{
          enabled:true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35
        },
        height: 350,
        type: "radialBar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually:{
            enabled: true,
            delay: 150
          },
          dynamicAnimation:{
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
            endAngle: 225,
          hollow: {
            size: "70%"
          },
          dataLabels:{
            show: true,
            name:{
              show: true,
              color: "000000"
            }
          }
        }
      },
      labels: ["Zona con mas ingresos"],
      stroke: {
        lineCap: 'round'
      },
      fill:{
        colors: ["#008E5A"],
      }
    };
  


    this.chartOptionsZonamenos = {
      labels: ["Zona con menos ingresos"],
      series: [37],
      chart: {
        dropShadow:{
          enabled:true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35
        },
        height: 350,
        type: "radialBar",
        animations:{
          enabled: true,
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
            endAngle: 225,
          hollow: {
            size: "70%"
          },
          dataLabels:{
            show: true,
            name:{
              show: true,
              color: "000000"
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      },
      fill:{
        colors: ["#008E5A"]
      }
    };
  }

  verAgencia(ag: string){
    const url = `/agencia/${ag.toLowerCase()}`;
    this.router.navigate([url]);
  }

  
}
