import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor() { }

  submitReview(reviewData: any): Observable<any> {
    // Mock API call
    console.log('Submitting review:', reviewData);
    return of({ success: true, message: 'Review submitted successfully' }).pipe(delay(1000));
  }

  getEmployeesForReview(): Observable<any[]> {
    // Mock List of employees for dropdown
    return of([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' }
    ]).pipe(delay(500));
  }
}
