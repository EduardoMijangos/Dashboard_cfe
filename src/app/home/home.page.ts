import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexStroke,
} from 'ng-apexcharts';

//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { PresentacionesService } from '../services/presentaciones.service';
import {
  PressAcumuladosItem,
  PressData,
  PressItem,
  PressItemAcumulado,
} from 'src/app/models/press-data.model';

interface ApexPlotOptionsBar {
  bar: {
    dataLabels: {
      position: string;
    };
  };
}

export type ChartOptionsCircle = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions & ApexPlotOptionsBar;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() progress: number = 14;
  currentDate: string;

  selectedDate: string;

  pressData: PressData | null = null;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsmenos: Partial<ChartOptions>;
  public chartOptionsmascircular: Partial<ChartOptionsCircle>;
  public chartOptionsmenoscircular: Partial<ChartOptionsCircle>;

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private presentacionesService: PresentacionesService
  ) {
    this.currentDate = new Date().toISOString();

    //Manejo de informacion de la grafica de barras de mas ingresos
    this.chartOptions = {
      series: [
        {
          name: 'Mas Ingresos',
          data: [2.3, 3.1, 4.0, 10.1, 4.0],
        },
      ],
      chart: {
        height: 350,
        width: 380,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      } as ApexPlotOptionsBar,
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return '$' + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        position: 'top',
        labels: {
          rotate: -45,
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'lineal',
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        colors: ['#9ABE26'],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return '$' + val;
          },
        },
      },
    };

    //Manejo de informacion de la grafica de barras de menos ingresos
    this.chartOptionsmenos = {
      series: [
        {
          name: 'Menos Ingresos',
          data: [1.0, 2.5, 3.5, 6.2, 2.5],
        },
      ],
      chart: {
        height: 350,
        width: 380,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      } as ApexPlotOptionsBar,
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return '$' + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'lineal',
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        colors: ['#9ABE26'],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val.toString();
          },
        },
      },
    };

    //Grafica de Radial de zona con mas ingresos
    this.chartOptionsmascircular = {
      series: [90],
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35,
        },
        height: 350,
        type: 'radialBar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '70%',
          },
          dataLabels: {
            show: true,
            value: {
              formatter: function (val) {
                return '$' + val;
              },
            },
            name: {
              show: true,
              color: '000000',
            },
          },
        },
      },
      labels: ['Zona con mas ingresos'],
      stroke: {
        lineCap: 'round',
      },
      fill: {
        colors: ['#008E5A'],
      },
    };

    //Grafica de Radial de zona con menos ingresos
    this.chartOptionsmenoscircular = {
      series: [10],
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35,
        },
        height: 350,
        type: 'radialBar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '70%',
          },
          dataLabels: {
            show: true,
            value: {
              formatter: function (val) {
                return '$' + val;
              },
            },
            name: {
              show: true,
              color: '000000',
            },
          },
        },
      },
      labels: ['Zona con menos ingresos'],
      stroke: {
        lineCap: 'round',
      },
      fill: {
        colors: ['#008E5A'],
      },
    };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Obtener fecha de ayer
    this.selectedDate = yesterday.toISOString(); // Convertir a formato ISO (YYYY-MM-DDTHH:MM:SS)
    this.selectedDate = this.selectedDate.split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
  }
  ngOnInit() {
    this.presentacionesService.getPressData(this.selectedDate).subscribe({
      next: (data) => {
        console.log('datos recibidos', data);
        this.pressData = data;

        if (this.pressData && this.pressData.pressGeneral2.length > 0) {
          // Ordenar y tomar las 5 zonas con más y menos ingresos
          const sorted = [...this.pressData.pressGeneral2].sort(
            (a, b) => parseFloat(b.total) - parseFloat(a.total)
          );
          const top5 = sorted.slice(0, 5);
          const bottom5 = sorted.slice(-5);
          const maxIncome = sorted[0];
          const minIncome = sorted[sorted.length - 1];

          (this.chartOptions.series = [
            {
              name: 'Más ingresos',
              data: top5.map((item) => parseFloat(item.total)),
            },
          ]),
            (this.chartOptions.xaxis = {
              categories: top5.map((item) => item.descripcion),
            }),
            this.chartOptions.dataLabels;

          (this.chartOptionsmenos.series = [
            {
              name: 'Menos ingresos',
              data: bottom5.map((item) => parseFloat(item.total)),
            },
          ]),
            (this.chartOptionsmenos.xaxis = {
              categories: bottom5.map((item) => item.descripcion),
            }),
            (this.chartOptionsmascircular.series = [
              parseFloat(maxIncome.total),
            ]);
          this.chartOptionsmascircular.labels = [maxIncome.descripcion];

          // Actualiza la gráfica circular de la zona con menos ingresos
          this.chartOptionsmenoscircular.series = [parseFloat(minIncome.total)];
          this.chartOptionsmenoscircular.labels = [minIncome.descripcion];
          error: (error: any) => {
            console.error(
              'Hubo un error al recuperar los datos de la API',
              error
            );
          };

          console.log('mas ingresos', top5);
          console.log('menos ingresos', bottom5);
        }
      },
    });
  }

  private chartSectionVisible = false;

  /*   generarPDF(): void {
    const pdf = new jsPDF();
    const chartElements = document.querySelectorAll('.chart-container');

    if (chartElements.length > 0) {
      chartElements.forEach((chartElement, index) => {
        domtoimage.toPng(chartElement).then((dataUrl: string) => {
          // Agrega la imagen al PDF
          pdf.addImage(dataUrl, 'PNG', 10, (index * 110) + 10, 180, 100);

          // Guarda o muestra el PDF según tus necesidades
          if (index === chartElements.length - 1) {
            // Solo guarda el PDF después de agregar todas las imágenes
            pdf.save('nombre-archivo.pdf');
          }
        }).catch((error) => {
          // Manejar errores al convertir la imagen
          console.error(`Error al convertir la imagen ${index + 1}:`, error);
        });
      });
    }
  }
 */
}
