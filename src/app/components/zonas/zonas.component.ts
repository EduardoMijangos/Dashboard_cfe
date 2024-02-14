import { Component, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill,
};

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss'],
})
export class ZonasComponent{

  @Input() progress: number = 19;



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
          hollow: {
            size: "85%"
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
          hollow: {
            size: "85%"
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
      fill:{
        colors: ["#008E5A"]
      }
    };
  }

  verAgencia(){
    this.router.navigate(['/agencia'])
  }
}
