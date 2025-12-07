import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: {
    name: string;
    manager: {
      name: string;
    }
  };
  score: number;
  averageScore?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Mock data
  private mockEmployees: Employee[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@example.com`,
    department: {
      name: ['Engineering', 'HR', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)],
      manager: {
        name: `Manager ${Math.floor(Math.random() * 5) + 1}`
      }
    },
    score: Math.floor(Math.random() * 10) + 1,
    averageScore: Math.floor(Math.random() * 10) + 1
  }));

  constructor() { }

  getEmployees(page: number, size: number, filters: any): Observable<{ data: Employee[], total: number }> {
    // Simulate API call with delay
    let filtered = this.mockEmployees;

    if (filters.department) {
      filtered = filtered.filter(e => e.department.name === filters.department);
    }
    if (filters.minScore) {
      filtered = filtered.filter(e => e.score >= filters.minScore);
    }

    const start = (page - 1) * size;
    const end = start + size;
    const pagedData = filtered.slice(start, end);

    return of({
      data: pagedData,
      total: filtered.length
    }).pipe(delay(500));
  }
}
