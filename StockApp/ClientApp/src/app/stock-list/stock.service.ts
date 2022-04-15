import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stock } from '../models/api-models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseApiUrl = 'https://localhost:7061';

  constructor(private httpClient:HttpClient) { }

  getStocks(): Observable<stock[]>{
    return this.httpClient.get<stock[]>(this.baseApiUrl+'/api/Stock');
  }
}
