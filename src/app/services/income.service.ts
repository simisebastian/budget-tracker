import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private apiService : ApiService ) { }


  getIncomes(): Observable<any> {
    return this.apiService.get(`/income`);
  }

  getIncomeSources(): Observable<any> {
    return this.apiService.get(`/income/source`);
  }

  addIncome(incomeData: { amount: number; source: string; date: string }): Observable<any> {
    console.log(incomeData);
    
    return this.apiService.post(`/add-income`, incomeData);
  }
}
