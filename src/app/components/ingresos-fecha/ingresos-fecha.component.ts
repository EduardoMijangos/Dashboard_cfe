import { Component, Input, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { Router } from '@angular/router';

export type RangeBarChartData = {
  x: string;
  y: [number, number];
};

export type RangeBarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill
};

@Component({
  selector: 'app-ingresos-fecha',
  templateUrl: './ingresos-fecha.component.html',
  styleUrls: ['./ingresos-fecha.component.scss'],
})
export class IngresosFechaComponent {
  
  @Input() progress: number = 14;


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: RangeBarChartOptions;

  constructor(
    private router: Router,
  ) { 
    this.chartOptions = {
      series: [
        {
          data: [
            { x: "01 - 07 ", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()] },
            { x: "08 - 15", y: [new Date("2019-03-04").getTime(), new Date("2019-03-08").getTime()] },
            { x: "16 - 23", y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()] },
            { x: "24 -31", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar",
        background:  "#CAEDE0"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      } as ApexPlotOptions,
      xaxis: {
        type: "datetime"
      },
      fill:{
        colors: ["#008E5A"]
      }
    };
  }

  verIngresosSemana() {
    this.router.navigate(['/ingresoSemana']);
  }
}
