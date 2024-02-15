import { Component, Input, ViewChild, OnInit } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { ActivatedRoute, Router } from '@angular/router';

export type RangeBarChartData = {
  x: string;
  y: [number, number];
};

export type RangeBarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
};

@Component({
  selector: 'app-ingresos-fecha',
  templateUrl: './ingresos-fecha.component.html',
  styleUrls: ['./ingresos-fecha.component.scss'],
})
export class IngresosFechaComponent implements OnInit {

  @Input() progress: number = 14;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: RangeBarChartOptions;
  currentMonth: string = '';  // Asegúrate de inicializar la variable

  constructor(
    private router: Router,
    private route: ActivatedRoute
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
      fill: {
        colors: ["#008E5A"]
      }
    };
  }

  ngOnInit() {
    // Obtén el mes de los parámetros de la URL
    this.route.params.subscribe((params) => {
      const mesNumero = +params['mes'];
  
      if (!isNaN(mesNumero) && mesNumero >= 1 && mesNumero <= 12) {
        this.currentMonth = this.obtenerNombreMes(mesNumero);
      } else {
        this.currentMonth = params['mes'];
      }
  
      console.log('Valor de mesNumero:', params['mes']);
    });
  }

  verIngresosSemana(semana: number) {
    // Redirige a la ruta de ingresosemana con el parámetro de semana
    this.router.navigate(['/ingresosemana', semana]);
  }

  obtenerNombreMes(numeroMes: number): string {
    // Implementa tu lógica para obtener el nombre del mes según su número
    // Puedes usar un array o un switch, por ejemplo
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return meses[numeroMes - 1] || '';
  }
}
