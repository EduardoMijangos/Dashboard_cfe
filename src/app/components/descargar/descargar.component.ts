import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { CalendarioModalComponent } from 'src/app/calendario-modal/calendario-modal.component';
import { PressAcumuladosItem, PressData, PressItem, PressItemAcumulado } from 'src/app/models/press-data.model';
import { PresentacionesService } from 'src/app/services/presentaciones.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip
  fill: ApexFill;
  legend: ApexLegend;
  grid: ApexGrid

};

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.scss'],
})
export class DescargarComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;

  resizeListener!: () => void;

  public chartOptionsGeneral1: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsGeneral2: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados3: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsGeneral4: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados5: Partial<ChartOptions> = this.initEmptyChartOptions();
  public chartOptionsAcumulados7: Partial<ChartOptions> = this.initEmptyChartOptions();

  generandoPDF: boolean = false;
  porcentajeDescarga: number = 0;

  selectedDate: string;

  totalGeneral1: { total: number; } = { total: 0};
  totalGeneral2: { total: number; } = { total: 0};
  totalesAcumulados3: { total1: number; total2: number } = { total1: 0, total2: 0 };
  totalGeneral4: { total: number; } = { total: 0};
  totalesAcumulados5: { total1: number; total2: number } = { total1: 0, total2: 0 };
  totalesAcumulados7: { total1: number; total2: number } = { total1: 0, total2: 0 };

  private initEmptyChartOptions(): Partial<ChartOptions> {
    return {
      series: [],
      chart: {
        type: "bar",
        height: 600,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 30,
          borderRadius: 10,
        }
      },
      stroke:{
        width: 1,
        colors: ["#008E5A"]
      },
      title:{
        text: ''
      },
      dataLabels: {
          enabled: true
      },
      xaxis: {
        categories: [],
        labels:{
          formatter: function(val) {
            return val + "K";
        }
      }
    },
      yaxis:{
        title:{
          text: undefined
        }
      },
      tooltip:{
        y: {
          formatter: function(val){
            return val + "K";
          }
        }
      },
      fill: {
        colors: ['#008E5A']
      },
      legend:{
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }
  
  isBtnInicioActive: boolean = false;
  isBtnIngresosActive: boolean = false;
  isBtnZonasActive: boolean = false;
  
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
    this.presentacionService.getPressData(this.selectedDate).subscribe({
      next: (data) =>{
        console.log(data);
      this.pressData = data;

      this.totalGeneral1 = this.sumarTotales(this.pressData.pressGeneral1);
      console.log('Total General 1:', this.totalGeneral1);

      this.totalGeneral2 = this.sumarTotales(this.pressData.pressGeneral2);      
      console.log('Total General 2:', this.totalGeneral2);

      this.totalesAcumulados3 = this.sumarTotalesSeparados(this.pressData.pressAcumulados3);
            console.log('Totales Acumulados 3:', this.totalesAcumulados3);

      this.totalGeneral4 = this.sumarTotales(this.pressData.pressGeneral4);
            console.log('Total General 4:',this.totalGeneral4);

      this.totalesAcumulados5 = this.sumarTotalesSeparados(this.pressData.pressAcumulados5);
            console.log('Totales Acumulados 5:', this.totalesAcumulados5);

      this.totalesAcumulados7 = this.sumarTotalesSeparados(this.pressData.pressAcumulados7);
        console.log('Totales Acumulados 7:', this.totalesAcumulados7);


       // Preparar datos para pressGeneral1
       this.chartOptionsGeneral1 = {
        series: [
          {
            name: "Total",
            data:  this.pressData.pressGeneral1.map(item => parseFloat(item.total))
          }
        ],
        chart: {
          type: "bar",
          height: 600,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '75%',
          }
        },
        stroke:{
          width: 1,
          colors:[ "#fff"]
        },
        title:{
          text: ''     
        },
        dataLabels: {
          enabled: true,
        },          
        xaxis: {
          categories: this.pressData.pressGeneral1.map(item => item.descripcion),
          labels:{
            formatter: function(val) {
              return val + "K";
          }
        }
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              return val.toLocaleString();
            }
          }
        },  
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        grid: {
          borderColor: '#90A4AE',
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
              lines: {
                  show: false
              }
          }
        },
        fill: {
          colors: ['#4CAF50']
        },     
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: -10
        },
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
        height: 600,
        toolbar:{
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      stroke:{
        width: 1,
        colors:[ "#fff"]
      },
      title:{
        text: ''     
      },
      dataLabels: {
        enabled: true,
        style:{
          colors:['#fff']
        }
      },
      xaxis: {
        categories: this.pressData.pressGeneral2.map(item => item.descripcion),
        labels:{
          formatter: function(val) {
            return val + "K";
        }
      }
      },
      yaxis:{
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "K";
          }
        }
      },
      grid: {
        borderColor: '#90A4AE',
        strokeDashArray: 0,
      },
      fill: {
        colors: ['#4CAF50']
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 50
      }
    };

    //Presentacion Acumulados 3
    this.chartOptionsAcumulados3 = {
      series: [
        {
          name: "Recuperado APP",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.totaluno))
        },
        {
          name: "Facturado",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.totaldos))
        },
        {
          name: "Avance",
          data: this.pressData.pressAcumulados3.map(item => parseFloat(item.avance))
        }
      ],
      chart: {
        type: "bar",
        height: 600,
        stacked: true,
        toolbar:{
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      stroke:{
        width: 1,
        colors:[ "#fff"]
      },
      title:{
        text: ''
      },
      dataLabels: {
        enabled: true,
        style:{
          colors:['#fff']
        }
      },      
      xaxis: {
        categories: this.pressData.pressAcumulados3.map(item => item.descripcion),
        labels:{
          formatter: function(val) {
            return val + "K";
        }
      }
      },
      yaxis:{
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          }
        }
      },
      grid: {
        borderColor: '#90A4AE',
        strokeDashArray: 0,
      },
      fill: {
        colors: ['#4CAF50', '#9ABE26', '#008E5A'] 
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 50,
        fontSize: '30px',
        markers: {
          height: 35,
          fillColors: ['#4CAF50', '#9ABE26', '#008E5A'], 
        }
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
      height: 600,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    stroke:{
      width: 0.5,
      colors:[ "#fff"]
    },
    title:{
      text: ''   
    },
    dataLabels: {
      enabled: true,
      style:{
        colors: [ '#fff']
      }

    },
    xaxis: {
      categories: this.pressData.pressGeneral4.map(item => item.descripcion),
      labels:{
        formatter: function(val) {
          return val + "K";
      }
    }
    },
    yaxis:{
      labels: {
        formatter: function(val) {
          return val.toLocaleString();
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "K";
        }
      }
    },

    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 0,
    },
    fill: {
      colors: ['#4CAF50']
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 50
    }
  };

  //Presentacion Acumulados 5
  this.chartOptionsAcumulados5 = {
    series: [
      {
        name: "Recuperado APP",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.totaluno))
      },
      {
        name: "Facturado",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.totaldos))
      },
      {
        name: "Avance",
        data: this.pressData.pressAcumulados5.map(item => parseFloat(item.avance))
      }
    ],
    chart: {
      type: "bar",
      height: 600,
      stacked: true,
      toolbar:{
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    stroke:{
      width: 1,
      colors:[ "#fff"]
    },
    title:{
        text: ''
    },
    dataLabels: {
      enabled: true,
      style:{
        colors: [ "#fff"]
      }
    },
    xaxis: {
      categories: this.pressData.pressAcumulados5.map(item => item.descripcion),
      labels:{
        formatter: function(val) {
          return val + "K";
      }
    }
    },
    yaxis:{
      labels: {
        formatter: function(val) {
          return val.toLocaleString();
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "K";
        }
      }
    },
    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 0,
    },
    fill: {
      colors: ['#4CAF50', '#9ABE26', '#008E5A'] 
    },
    legend: {
      show: true, 
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 50,
      fontSize:"30px",
      markers: {
        height:35,
        fillColors: ['#4CAF50', '#9ABE26', '#008E5A'], 
          }
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
      height: 600,
      stacked: true,
      toolbar:{
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    stroke:{
      width: 1,
      colors:[ "#fff"]
    },
    title:{
      text: '',
      
    },
    dataLabels: {
      enabled: true,
      style:{
        colors: [ "#fff"]
      }
    },
    xaxis: {
      categories: this.pressData.pressAcumulados7.map(item => item.descripcion),
      labels:{
        formatter: function(val) {
          return val + "K";
      }
    }
    },
    yaxis:{
      labels: {
        formatter: function(val) {
          return val.toLocaleString();
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "K";
        }
      }
    },
    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 0,
    },
    fill: {
      colors: ['#4CAF50', '#9ABE26', '#008E5A'] 
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 50,
      fontSize: "30px",
      markers: {
        height:35,
        fillColors: ['#4CAF50', '#9ABE26', '#008E5A'],
      }
    },
  };
  
    },error: (error) => {
      console.error('Hubo un error al recuperar los datos de la API', error);
    }
  }
    );
  
    this.adjustChartOptionsForScreenSize();
    this.resizeListener = () => this.adjustChartOptionsForScreenSize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }
  
  adjustChartOptionsForScreenSize() {
    const isMobile = window.innerWidth < 768;
    
    // Suponiendo que tienes una referencia a las opciones de la gráfica en 'this.chartOptions...'
    if (this.chartOptionsGeneral1 && this.chartOptionsGeneral1.xaxis?.labels) {
      this.chartOptionsGeneral1.xaxis.labels.show = !isMobile;
    }
  
    if (this.chartOptionsGeneral2 && this.chartOptionsGeneral2.xaxis?.labels) {
      this.chartOptionsGeneral2.xaxis.labels.show = !isMobile;
    }
    
    if (this.chartOptionsAcumulados3 && this.chartOptionsAcumulados3.xaxis?.labels) {
      this.chartOptionsAcumulados3.xaxis.labels.show = !isMobile;
    }
    
    if (this.chartOptionsGeneral4 && this.chartOptionsGeneral4.xaxis?.labels) {
      this.chartOptionsGeneral4.xaxis.labels.show = !isMobile;
    }
    
    if (this.chartOptionsAcumulados5 && this.chartOptionsAcumulados5.xaxis?.labels) {
      this.chartOptionsAcumulados5.xaxis.labels.show = !isMobile;
    }
    
    if (this.chartOptionsAcumulados7 && this.chartOptionsAcumulados7.xaxis?.labels) {
      this.chartOptionsAcumulados7.xaxis.labels.show = !isMobile;
    }
  
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
        this.selectedDate = data.data.selectedDate; 
        this.updateChartData(this.selectedDate);
      }
    });

    return await modal.present();
  }

  updateChartData(date: string) {
    this.presentacionService.getPressData(date).subscribe({
      next: (data) => {
        console.log(data);
        this.pressData = data;
        
        this.chartOptionsGeneral1.series = [{
          name: "Total General 1",
          data: this.pressData.pressGeneral1.map(item => parseFloat(item.total))
        }];

        this.chartOptionsGeneral1.xaxis ??= {};
        this.chartOptionsGeneral1.xaxis.categories = this.pressData.pressGeneral1.map(item => item.descripcion);
        this.totalGeneral1 = this.sumarTotales(this.pressData.pressGeneral1);
  
        this.chartOptionsGeneral2.xaxis ??= {};
        this.chartOptionsGeneral2.xaxis.categories = this.pressData.pressGeneral2.map(item => item.descripcion);
        this.totalGeneral2 = this.sumarTotales(this.pressData.pressGeneral2);
  
        this.chartOptionsAcumulados3.xaxis ??= {};
        this.chartOptionsAcumulados3.xaxis.categories = this.pressData.pressAcumulados3.map(item => item.descripcion);
        this.totalesAcumulados3 = this.sumarTotalesSeparados(this.pressData.pressAcumulados3);
  
        this.chartOptionsGeneral4.xaxis ??= {};
        this.chartOptionsGeneral4.xaxis.categories = this.pressData.pressGeneral4.map(item => item.descripcion);
        this.totalGeneral4 = this.sumarTotales(this.pressData.pressGeneral4);
  
        this.chartOptionsAcumulados5.xaxis ??= {};
        this.chartOptionsAcumulados5.xaxis.categories = this.pressData.pressAcumulados5.map(item => item.descripcion);
        this.totalesAcumulados5 = this.sumarTotalesSeparados(this.pressData.pressAcumulados5);
  
        this.chartOptionsAcumulados7.xaxis ??= {};
        this.chartOptionsAcumulados7.xaxis.categories = this.pressData.pressAcumulados7.map(item => item.descripcion);
        this.totalesAcumulados7 = this.sumarTotalesSeparados(this.pressData.pressAcumulados7);
      },
      error: (error) => {
        console.error('Hubo un error al recuperar los datos de la API', error);
      }
    });
  }
    

  async generarPDF(): Promise<void> {
    // Crear una alerta para confirmar la descarga del PDF
    const alert = await this.alertController.create({
      header: 'Confirmación',
      mode: 'ios',
      message: '¿Deseas descargar el PDF?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Acción a realizar cuando se cancela la descarga
            console.log('Descarga cancelada');
          }
        },
        {
          text: 'Descargar',
          handler: () => {
            // Cierra el alerta antes de generar el PDF
            alert.dismiss().then(() => {
              this.iniciarDescargaPDF();
            });
            return false; // Previene que el alerta se cierre automáticamente
          }
        }
      ]
    });
  
    // Mostrar la alerta
    await alert.present();
  }

  async iniciarDescargaPDF(): Promise<void> {
    this.generandoPDF = true;
    this.porcentajeDescarga = 0; // Iniciar la barra de progreso desde 0
    const pdf = new jsPDF();
    const chartIds = ['chartGeneral1', 'chartGeneral2', 'chartAcumulados3', 'chartGeneral4', 'chartAcumulados5', 'chartAcumulados7'];
    let currentHeight = 0;
  
    for (const [index, chartId] of chartIds.entries()) {
      const chartElement = document.getElementById(chartId);
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imageData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        if (currentHeight + pdfHeight > pdf.internal.pageSize.getHeight()) {
          pdf.addPage();
          currentHeight = 0;
        }
  
        pdf.addImage(imageData, 'PNG', 10, currentHeight + 10, pdfWidth, pdfHeight);
        currentHeight += pdfHeight + 10;
  
        // Actualizar la barra de progreso
        this.porcentajeDescarga = ((index + 1) / chartIds.length) * 100;
      }
    }
  
    // Formatear la fecha actual para el nombre del archivo
    const fechaActual = new Date();
    const fechaFormato = fechaActual.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    const nombreArchivo = `presentacion-pdf-${fechaFormato}.pdf`;
  
    pdf.save(nombreArchivo);
    this.generandoPDF = false; // Ocultar la barra de progreso una vez terminado
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

  logSelectedDate() {
    console.log('Fecha seleccionada:', this.selectedDate);
  }

  sumarTotales(datos: PressItem[]): { total: number } {
    return datos.reduce((acumulado, item) => {
      acumulado.total += parseFloat(item.total);
      return acumulado; 
    }, { total: 0 }); 
  }
  

  sumarTotalesSeparados(datos: PressAcumuladosItem[]): { total1: number; total2: number } {
      return datos.reduce((acumulados, item) => {
      acumulados.total1 += parseFloat(item.totaluno);
      acumulados.total2 += parseFloat(item.totaldos);
      return acumulados;
    }, { total1: 0, total2: 0 });
  }
  
  

}