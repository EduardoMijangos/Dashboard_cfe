import { Component, Input, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

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
  selector: 'app-ingresos-semana',
  templateUrl: './ingresos-semana.component.html',
  styleUrls: ['./ingresos-semana.component.scss'],
})
export class IngresosSemanaComponent {

  @Input() progress: number = 14;


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: RangeBarChartOptions;

  constructor(
  ) { 
    this.chartOptions = {
      
      series: [

        {
          data: [
            { x: "01", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()] },
            { x: "02", y: [new Date("2019-03-04").getTime(), new Date("2019-03-08").getTime()] },
            { x: "03", y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()] },
            { x: "04", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] },
            { x: "05", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] },
            { x: "06", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] },
            { x: "07", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar",
        background: "#CAEDE0"
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
}
