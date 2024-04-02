import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';

// Definiciones de tipos para la data del gráfico de barras de rango y las opciones de configuración del gráfico.
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
  // Propiedad de entrada para el progreso, con valor predeterminado.
  @Input() progress: number = 14;

  @ViewChild('chart') chart!: ChartComponent;

  // Opciones de configuración del gráfico de barras de rango.
  public chartOptions: RangeBarChartOptions;

  // Almacena el mes actual seleccionado.
  currentMonth: string = '';

  // Almacena los días totales del mes actual.
  diasPorMes: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    const currentDate = new Date();
    this.currentMonth = this.obtenerNombreMes(currentDate.getMonth() + 1);
    this.diasPorMes = this.obtenerDiasMes(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    // Configuración inicial del gráfico y cálculo del mes y días actuales.
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: '01 - 07 ',
              y: [
                new Date('2019-03-02').getTime(),
                new Date('2019-03-04').getTime(),
              ],
            },
            {
              x: '08 - 15',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime(),
              ],
            },
            {
              x: '16 - 23',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime(),
              ],
            },
            {
              x: '24 - 31',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-18').getTime(),
              ],
            },
          ],
        },
      ],
      chart: {
        height: 350,
        type: 'rangeBar',
        background: '#CAEDE0',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      } as ApexPlotOptions,
      xaxis: {
        type: 'datetime',
      },
      fill: {
        colors: ['#008E5A'],
      },
    };
  }

  ngOnInit() {
    // Suscripción a cambios en los parámetros de ruta para actualizar el mes seleccionado.
    this.route.params.subscribe((params) => {
      const mesNumero = +params['mes'];

      if (!isNaN(mesNumero) && mesNumero >= 1 && mesNumero <= 12) {
        this.currentMonth = this.obtenerNombreMes(mesNumero);
      } else {
        this.currentMonth = params['mes'];
      }

      console.log('Valor de mes:', params['mes']);
    });
  }

  // Función para navegar a una vista detallada de ingresos basada en la semana seleccionada.
  verIngresosSemana(semana: number) {
    this.router.navigate(['/ingresosemana', semana]);
  }

  // Función para obtener el nombre del mes basado en su número.
  obtenerNombreMes(numeroMes: number): string {
    const meses = [
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

    return meses[numeroMes - 1] || '';
  }

  // Función para obtener el número de días en un mes específico.
  obtenerDiasMes(year: number, month: number): number {
    if (month < 1 || month > 12) {
      console.error('El mes debe estar entre 1 y 12.');
      return 0;
    }

    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  }

  // Función para calcular y obtener un arreglo de semanas, donde cada semana es un arreglo de días.
  obtenerSemanas(): number[][] {
    const weeks: number[][] = [];
    const daysPerPeriod = 8;

    if (!this.diasPorMes) {
      return weeks;
    }

    let currentDay = 1;

    while (currentDay <= this.diasPorMes) {
      const remainingDays = this.diasPorMes - currentDay + 1;
      const daysInThisPeriod = Math.min(remainingDays, daysPerPeriod);

      const dayPeriods: number[] = Array.from(
        { length: daysInThisPeriod },
        (_, index) => currentDay + index
      );
      weeks.push(dayPeriods);

      currentDay += daysInThisPeriod;
    }

    return weeks;
  }
}
