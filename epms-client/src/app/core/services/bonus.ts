import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  constructor() { }

  approveBonus(bonusData: any): Observable<any> {
    console.log('Approving bonus:', bonusData);
    return of({ success: true, message: 'Bonus approved successfully' }).pipe(delay(1000));
  }

  getEligibleEmployees(): Observable<any[]> {
    // Mock List of eligible employees (e.g. > 3 reviews)
    return of([
      { id: 2, name: 'Jane Smith', reviewsCount: 4 },
      { id: 5, name: 'Robert Brown', reviewsCount: 5 }
    ]).pipe(delay(500));
  }
}
