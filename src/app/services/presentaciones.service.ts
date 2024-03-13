import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PressData } from '../models/press-data.model';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesService {

  private apiUrl = 'assets/info/responsePressData.json'; 

  constructor(private http: HttpClient) { }

  getPressData(): Observable<PressData> {
    return this.http.get<PressData>(this.apiUrl);
  }
}
