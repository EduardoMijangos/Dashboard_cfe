import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PressData } from '../models/press-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesService {
  //private apiUrl = 'http://192.168.110.4:3000/press-data';
  private apiUrl = '../../assets/info/infomes.json';
  //private apiUrl = '../../assets/info/responsePressData.json';

  constructor(private http: HttpClient) { }

  obtenerInfo(date: string): Observable<PressData> {
    const url = `${this.apiUrl}?date=${date}`;
    return this.http.get<PressData>(url);
  }

  /*obtenerInfo(date: string) {
    return this.http.get<PressData>(this.apiUrl).pipe(
      map(data => {
        // Suponiendo que tus datos tienen una estructura donde las fechas son las claves principales
        // y quieres filtrar para obtener la data de una fecha específica
        return data[date] || null; // Devuelve los datos de la fecha específica o null si no existe
      })
    );
  }*/
}
