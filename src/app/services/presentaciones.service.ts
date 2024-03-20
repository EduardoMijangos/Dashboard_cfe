import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PressData } from '../models/press-data.model';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesService {
  private apiUrl = 'http://192.168.110.4:3000/press-data';

  constructor(private http: HttpClient) { }

  getPressData(date: string): Observable<PressData> {
    const url = `${this.apiUrl}?date=${date}`;
    return this.http.get<PressData>(url);
  }
}
