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
import { PressData } from 'src/app/models/press-data.model';
import { PresentacionesService } from 'src/app/services/presentaciones.service';

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

  public chartOptionsGeneral1: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsGeneral2: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados3: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsGeneral4: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados5: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados7: Partial<ChartOptions> = this.initEmptyChartOptions();

  private initEmptyChartOptions(): Partial<ChartOptions> {
    return {
      series: [],
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
      xaxis: {
        categories: []
      },
      fill: {
        colors: ['#008E5A']
      }
    };
  }
  
  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;
  
  selectedDate: string = '';

  pressData: PressData | null = null;

  menuOpen = false;

  paginaActual: string = '';

  constructor(private renderer: Renderer2,
    private router: Router, 
    private alertController: AlertController,
    private modalController: ModalController,
    private presentacionService: PresentacionesService
    ) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Obtener fecha de ayer
      this.selectedDate = yesterday.toISOString(); // Convertir a formato ISO (YYYY-MM-DDTHH:MM:SS)
      this.selectedDate = this.selectedDate.split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
  }

  ngOnInit() {
    this.presentacionService.getPressData().subscribe(data => {
      this.pressData = data;

       // Preparar datos para pressGeneral1
    this.chartOptionsGeneral1 = {
      series: [
        {
          name: "Total",
          data: this.pressData.pressGeneral1.map(item => parseFloat(item.total))
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
      xaxis: {
        categories: this.pressData.pressGeneral1.map(item => item.descripcion)
      },
      fill: {
        colors: ['#008E5A']
      }
    };

     //General 2
    this.chartOptionsGeneral2 = {
      series: [
        {
          name: "Total",
          data: this.pressData.pressGeneral2.map(item => parseFloat(item.total))
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
      xaxis: {
        categories: this.pressData.pressGeneral2.map(item => item.descripcion)
      },
      fill: {
        colors: ['#008E5A']
      }
    };

    //Presentacion Acumulados 3
    this.chartOptionsAcumulados3 = {
      series: [
        {
          name: "Total Uno",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.totaluno))
        },
        {
          name: "Total Dos",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.totaldos))
        },
        {
          name: "Avance",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.avance))
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true // Opcional: para apilar las barras si es deseado
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.pressData.pressAcumulados3.map(item => item.descripcion)
      },
      fill: {
        colors: ['#008E5A', '#00E396', '#FEB019'] // Diferentes colores para cada serie
      }
    };
    
  //Presentacion General 4
  this.chartOptionsGeneral4 = {
    series: [
      {
        name: "Total",
        data: this.pressData.pressGeneral4.map(item => parseFloat(item.total))
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
    xaxis: {
      categories: this.pressData.pressGeneral4.map(item => item.descripcion)
    },
    fill: {
      colors: ['#008E5A']
    }
  };

  //Presentacion Acumulados 5
  this.chartOptionsAcumulados5 = {
    series: [
      {
        name: "Total Uno",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.totaluno))
      },
      {
        name: "Total Dos",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.totaldos))
      },
      {
        name: "Avance",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.avance))
      }
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true // Opcional: para apilar las barras si es deseado
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: this.pressData.pressAcumulados5.map(item => item.descripcion)
    },
    fill: {
      colors: ['#008E5A', '#00E396', '#FEB019'] // Diferentes colores para cada serie
    }
  };
  
  //Presentacion Acumulados 7
  this.chartOptionsAcumulados7 = {
    series: [
      {
        name: "Total Uno",
        data: this.pressData.pressAcumulados7.map(item => parseFloat(item.totaluno))
      },
      {
        name: "Total Dos",
        data: this.pressData.pressAcumulados7.map(item => parseFloat(item.totaldos))
      },
      {
        name: "Avance",
        data: this.pressData.pressAcumulados7.map(item => parseFloat(item.avance))
      }
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true // Opcional: para apilar las barras si es deseado
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: this.pressData.pressAcumulados7.map(item => item.descripcion)
    },
    fill: {
      colors: ['#008E5A', '#00E396', '#FEB019'] // Diferentes colores para cada serie
    }
  };
  
    });
  
  }

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

  async generarPDF(): Promise<void> {
    console.log("Generando PDF...");
    const pdf = new jsPDF();
    const chartIds = ['chartGeneral1', 'chartGeneral2', 'chartAcumulados3', 'chartGeneral4', 'chartAcumulados5', 'chartAcumulados7'];
    let currentHeight = 0; // Posición vertical para la siguiente gráfica
  
    for (const chartId of chartIds) {
      const chartElement = document.getElementById(chartId);
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imageData = canvas.toDataURL('image/png');
  
        // Calcular la proporción de la imagen para el escalado
        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Ancho del PDF menos márgenes
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        if (currentHeight + pdfHeight > pdf.internal.pageSize.getHeight()) {
          pdf.addPage();
          currentHeight = 0; // Restablecer la altura para la nueva página
        }
  
        // Agregar la imagen al PDF ajustando su escala
        pdf.addImage(imageData, 'PNG', 10, currentHeight + 10, pdfWidth, pdfHeight);
        currentHeight += pdfHeight + 10; // Añadir un margen entre las gráficas
      }
    }
  
    pdf.save('graficas.pdf');
  }
  
  async establecerPaginaActual(pagina: string) {
    if (this.paginaActual === pagina) {
      const alert = await this.alertController.create({
        header: 'Ya estás aquí',
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
    return window.innerWidth >= 768; // Define qué consideras una pantalla grande
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Cambiar el estado del menú entre abierto y cerrado
  }

  checkScreenSize() {
    // Asegúrate de cerrar el menú de hamburguesa al cambiar el tamaño si es necesario
    if (this.isLargeScreen && this.menuOpen) {
      this.toggleMenu();
    }
  }
}
