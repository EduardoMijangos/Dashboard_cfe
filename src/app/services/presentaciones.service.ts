import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PressData } from '../models/press-data.model';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesService {
  private apiUrl = '../../assets/info/infomes.json';

  constructor(private http: HttpClient) { }

  obtenerInfo(date: string): Observable<PressData | null> {
    return this.http.get<{[key: string]: PressData}>(this.apiUrl).pipe(
      map(data => {
        // Directamente intentar acceder a la propiedad deseada.
        // Si no existe, retorna null.
        return data[date] || null;
      }),
      catchError(err => {
        // Manejar el error, por ejemplo, si el archivo JSON no se puede cargar.
        console.error('Error al cargar los datos', err);
        return of(null); // Retorna un Observable que emite null
      })
    );
  }
}
