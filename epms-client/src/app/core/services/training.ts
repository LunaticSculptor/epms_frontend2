import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TrainingSession {
  id: number;
  employeeName: string;
  trainingType: string;
  dueDate: string;
  status: 'Overdue';
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor() { }

  getOverdueTraining(startDate: string, endDate: string, type: string): Observable<TrainingSession[]> {
    return of([
      { id: 1, employeeName: 'Dave', trainingType: 'Compliance', dueDate: '2023-10-01', status: 'Overdue' as const },
      { id: 2, employeeName: 'Eve', trainingType: 'Security', dueDate: '2023-11-15', status: 'Overdue' as const },
      { id: 3, employeeName: 'Frank', trainingType: 'Compliance', dueDate: '2023-09-20', status: 'Overdue' as const }
    ]).pipe(delay(500));
  }
}
