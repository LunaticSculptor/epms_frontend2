import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor() { }

  getDashboardStats(timeFrame: string, includeTop: boolean, includeDept: boolean, includeTraining: boolean): Observable<any> {
    // Mock response based on params
    const mockData: any = {
      stats: {
        totalEmployees: 150,
        pendingReviews: 12,
        bonusesDistributed: 45000
      }
    };

    if (includeTop) {
      mockData.topPerformers = [
        { name: 'Alice', score: 9.8 },
        { name: 'Bob', score: 9.5 },
        { name: 'Charlie', score: 9.2 }
      ];
    }

    if (includeDept) {
      mockData.departmentStats = [
        { name: 'Engineering', avgScore: 8.5 },
        { name: 'Sales', avgScore: 7.9 },
        { name: 'Marketing', avgScore: 8.2 }
      ];
    }

    if (includeTraining) {
      mockData.trainingStats = {
        completed: 85,
        overdue: 15
      };
    }

    return of(mockData).pipe(delay(800));
  }
}
