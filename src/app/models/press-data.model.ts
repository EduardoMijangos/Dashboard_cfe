export interface PressGeneralItem {
    descripcion: string;
    total: string;
  }
  
  export interface PressAcumuladosItem {
    descripcion: string;
    totaluno: string;
    totaldos: string;
    avance: string;
  }
  
  export interface PressData {
    totalIngresos: any;
    pressGeneral1: PressGeneralItem[];
    pressGeneral2: PressGeneralItem[];
    pressGeneral4: PressGeneralItem[];
    pressAcumulados3: PressAcumuladosItem[];
    pressAcumulados5: PressAcumuladosItem[];
    pressAcumulados7: Array<{
      descripcion: string;
      totaluno: string;
      totaldos: string;
      avance: string;
    }>;
  }

  export interface PressItem {
    total: string; // asumiendo que total es una cadena que representa un número
  }
  export interface PressItemAcumulado {
    totaluno: string;
    totaldos: string;
  }
  
  