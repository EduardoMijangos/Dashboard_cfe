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

import { PresentacionesService } from '../services/presentaciones.service';
import {
  PressAcumuladosItem,
  PressData,
  PressItem,
  PressItemAcumulado,
} from 'src/app/models/press-data.model';

// Tipo para las opciones de gráficos de barras específicas.
interface ApexPlotOptionsBar {
  bar: {
    dataLabels: {
      position: string;
    };
  };
}

// Tipo para las opciones de configuración de gráficos circulares/radiales.
export type ChartOptionsCircle = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  ready: true;
};

// Tipo para las opciones de configuración de gráficos generales.
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
  fcehaActual: string;

  fechaSeleccionada: string;

  // Almacena los datos obtenidos del servicio
  pressData: PressData | null = null;

  totalGeneral2: { total: number } = { total: 0 };

  @ViewChild('chart') chart!: ChartComponent;

  // Configuraciones de los gráficos a mostrar en la página.
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
    this.fcehaActual = new Date().toISOString();

    //Manejo de informacion de la grafica de barras de mas ingresos
    this.chartOptions = {
      series: [
        {
          name: 'Mas Ingresos',
          data: [2.3, 3.1, 4.0, 10.1, 4.0]
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
        formatter:(val) => {
          return '$' + this.formatTotalAsFullNumber(val.toString());
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
          formatter:(val) => {
            return '$' + this.formatTotalAsFullNumber(val.toString());

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
        formatter:(val) =>{
          return '$' + this.formatTotalAsFullNumber(val.toString());
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
          formatter: (val) => {
            return '$' + this.formatTotalAsFullNumber(val.toString());
          },
        },
      },
    };

    //Grafica de Radial de zona con mas ingresos
    this.chartOptionsmascircular = {
      ready: true,
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
              formatter:(val) => {
                return '$' + this.formatTotalAsFullNumber(val.toString());
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
      ready: true,
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
              formatter:(val) => {
                return '$' + this.formatTotalAsFullNumber(val.toString());
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

    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    this.fechaSeleccionada = ayer.toISOString(); // Convertir formato de fecha(YYYY-MM-DDTHH:MM:SS)
    this.fechaSeleccionada = this.fechaSeleccionada.split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
  }
  ngOnInit() {
    // Al inicializar, se suscribe a los datos del servicio y actualiza la configuración de los gráficos.
    this.presentacionesService.obtenerInfo(this.fechaSeleccionada).subscribe({
      next: (data) => {
        console.log('datos recibidos', data);
        this.pressData = data;

        this.totalGeneral2 = this.sumarTotales(this.pressData.pressGeneral2);
        console.log('Total General 2:', this.totalGeneral2);

        const metaTotal = 1000;
        this.totalGeneral2 = this.sumarTotales(data.pressGeneral2);
        // Convertir el total actual en un porcentaje de la meta total
        this.progress = (this.totalGeneral2.total / metaTotal) * 100;

        if (this.pressData && this.pressData.pressGeneral2.length > 0) {
          // Ordenar y tomar las 5 zonas con más y menos ingresos
          const sorted = [...this.pressData.pressGeneral2].sort(
            (a, b) => parseFloat(b.total) - parseFloat(a.total)
          );
          const mayores = sorted.slice(0, 5);
          const menores = sorted.slice(-5);
          const maximo = sorted[0];
          const minimo = sorted[sorted.length - 1];

          (this.chartOptions.series = [
            {
              name: 'Más ingresos',
              data: mayores.map((item) => parseFloat(item.total)),
            },
          ]),
            (this.chartOptions.xaxis = {
              categories: mayores.map((item) => item.descripcion),
            }),
            this.chartOptions.dataLabels;

          (this.chartOptionsmenos.series = [
            {
              name: 'Menos ingresos',
              data: menores.map((item) => parseFloat(item.total)),
            },
          ]),
            (this.chartOptionsmenos.xaxis = {
              categories: menores.map((item) => item.descripcion),
            }),
            (this.chartOptionsmascircular.series = [parseFloat(maximo.total)]);
          this.chartOptionsmascircular.labels = [maximo.descripcion];

          // Actualiza la gráfica circular de la zona con menos ingresos
          this.chartOptionsmenoscircular.series = [parseFloat(minimo.total)];
          this.chartOptionsmenoscircular.labels = [minimo.descripcion];
          error: (error: any) => {
            console.error(
              'Hubo un error al recuperar los datos de la API',
              error
            );
          };

          console.log('mas ingresos', mayores);
          console.log('menos ingresos', menores);
          console.log('unica mas', maximo);
          console.log('unica menos', minimo);
        }
      },
    });
  }

  // Función para sumar totales de ingresos de un conjunto de datos.
  sumarTotales(datos: PressItem[]): { total: number } {
    return datos.reduce(
      (acumulado, item) => {
        // Usa la función para formatear cada total antes de sumarlo
        const formattedTotal = this.formatTotalAsFullNumber(item.total);
        acumulado.total += parseFloat(formattedTotal);
        return acumulado;
      },
      { total: 0 }
    );
  }
  private chartSectionVisible = false;

  // Agregar la función formatTotalAsFullNumber aquí
  formatTotalAsFullNumber(totalString: string): string {
    const totalNumber = parseFloat(totalString) * 10000; // Corrige el multiplicador según sea necesario
    return totalNumber.toFixed(0);
  }

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
