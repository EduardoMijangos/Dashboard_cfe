import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as ApexCharts from 'apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill
} from "ng-apexcharts";
import { CalendarioModalComponent } from 'src/app/calendario-modal/calendario-modal.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill
};

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.scss'],
})
export class DescargarComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild("chartContainer") chartContainer!: ElementRef;
  public chartOptions: Partial<ChartOptions>;

  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;
  
  selectedDate: string = '';

  menuOpen = false;

  paginaActual: string = '';

  chartDataArray: any[] = [
    {
      series: [
        {
          name: "Gráfico 1",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      fill:{
        colors: ['#008E5A']
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    },
    {
      series: [
        {
          name: "Gráfico 2",
          data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '95%'
        }
      },
      dataLabels: {
        enabled: false
      },
      fill:{
        colors: ['#FF5733']
      },
      xaxis: {
        categories: [
          "Item 1",
          "Item 2",
          "Item 3",
          "Item 4",
          "Item 5",
          "Item 6",
          "Item 7",
          "Item 8",
          "Item 9",
          "Item 10"
        ]
      }
    },
    {
      series: [
        {
          name: "Gráfico 3",
          data: [50, 120, 180, 250, 300, 400, 500, 600, 700, 800]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      fill:{
        colors: ['#3F51B5']
      },
      xaxis: {
        categories: [
          "Item A",
          "Item B",
          "Item C",
          "Item D",
          "Item E",
          "Item F",
          "Item G",
          "Item H",
          "Item I",
          "Item J"
        ]
      }
    },
    {
      series: [
        {
          name: "Gráfico 4",
          data: [800, 750, 700, 650, 600, 550, 500, 450, 400, 350]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '95%'
        }
      },
      dataLabels: {
        enabled: false
      },
      fill:{
        colors: ['#009688']
      },
      xaxis: {
        categories: [
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
          "Category 5",
          "Category 6",
          "Category 7",
          "Category 8",
          "Category 9",
          "Category 10"
        ]
      }
    },
    {
      series: [
        {
          name: "Gráfico 5",
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      fill:{
        colors: ['#FFC107']
      },
      xaxis: {
        categories: [
          "X1",
          "X2",
          "X3",
          "X4",
          "X5",
          "X6",
          "X7",
          "X8",
          "X9",
          "X10"
        ]
      }
    },
    // ... Puedes agregar más datos para gráficos adicionales ...
  ];
  

  constructor(private renderer: Renderer2,
    private router: Router, 
    private alertController: AlertController,
    private modalController: ModalController
    ) {

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Obtener fecha de ayer
      this.selectedDate = yesterday.toISOString(); // Convertir a formato ISO (YYYY-MM-DDTHH:MM:SS)
      this.selectedDate = this.selectedDate.split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '95%'
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        colors: ['#008E5A']
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };
  }

  ngOnInit(): void {}

  async openDatePickerModal() {
    const modal = await this.modalController.create({
      component: CalendarioModalComponent,
      componentProps: {
        selectedDate: this.selectedDate // Pasar la fecha seleccionada al modal
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.selectedDate = data.data.selectedDate; // Actualizar la fecha seleccionada con la que viene del modal
      }
    });

    return await modal.present();
  }

  logSelectedDate() {
    console.log('Fecha seleccionada:', this.selectedDate);
  }

  async generarPDF(): Promise<void> {
    console.log("Generando PDF...");
    const pdf = new jsPDF();

    // Iterar sobre cada gráfico en chartDataArray
    for (let index = 0; index < this.chartDataArray.length; index++) {
      const chartData = this.chartDataArray[index];

      // Crear una instancia de ApexCharts para cada gráfico
      const chartContainer = this.renderer.createElement('div');
      this.renderer.appendChild(document.body, chartContainer);

      const chartInstance = new ApexCharts(chartContainer, {
        series: chartData.series,
        chart: chartData.chart,
        dataLabels: chartData.dataLabels,
        plotOptions: chartData.plotOptions,
        xaxis: chartData.xaxis,
        fill: chartData.fill,
      });

      // Renderizar el gráfico
      await chartInstance.render();

      // Capturar la representación de la gráfica como una imagen usando html2canvas
      const canvas = await html2canvas(chartContainer);

      // Agregar la imagen al PDF
      if (index !== 0) {
        pdf.addPage(); // Agregar nueva página para cada gráfico (excepto el primero)
      }
      pdf.addImage(canvas.toDataURL(), 'PNG', 10, 10, 180, 100);

      // Limpiar el contenedor después de agregar el gráfico al PDF
      this.renderer.removeChild(document.body, chartContainer);
    }

    // Guardar o mostrar el PDF después de agregar todas las imágenes
    pdf.save('nombre-archivo.pdf');
  }

    // Función para establecer la página actual y mostrar la alerta si corresponde
    async establecerPaginaActual(pagina: string) {
      if (this.paginaActual === pagina) {
        const alert = await this.alertController.create({
          header: 'Ya estas ahi',
          message: 'Ya te encuentras en esta opción',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        this.paginaActual = pagina;
        this.redirigirAPagina(pagina);
      }
    }
  
    redirigirAPagina(pagina: string) {
      switch (pagina) {
        case 'Inicio':
          this.router.navigate(['/home']);
          break;
        case 'Ingresos':
          this.router.navigate(['/ingresos']);
          break;
        case 'Zonas':
          this.router.navigate(['/zonas']);
          break;
        default:
          break;
      }
    }
  
    btnInicio() {
      this.establecerPaginaActual('Inicio');
      this.isBtnInicioActive = !this.isBtnInicioActive;
    }
  
    btnIngresos() {
      this.establecerPaginaActual('Ingresos');
      this.isBtnIngresosActive = !this.isBtnIngresosActive;
    }
  
    btnZonas() {
      this.establecerPaginaActual('Zonas');
      this.isBtnZonasActive = !this.isBtnZonasActive;
    }
  
    get isLargeScreen() {
      // Define qué consideras una pantalla grande
      return window.innerWidth >= 768;
    }
  
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  
    checkScreenSize() {
      // Asegúrate de cerrar el menú de hamburguesa al cambiar el tamaño si es necesario
      if (this.isLargeScreen && this.menuOpen) {
        this.toggleMenu();
      }
    }
  
}
