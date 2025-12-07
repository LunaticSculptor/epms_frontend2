import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService, Employee } from '../../../../core/services/employee';
import { NestedValuePipe } from '../../../../shared/pipes/nested-value-pipe';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NestedValuePipe],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeListComponent implements OnInit {
  employees = signal<Employee[]>([]);
  total = signal<number>(0);
  loading = signal<boolean>(false);

  filterForm: FormGroup;
  currentPage = 1;
  pageSize = 10;

  departments = ['Engineering', 'HR', 'Sales', 'Marketing']; // Mock options

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      department: [''],
      minScore: [''],
      minAvgScore: ['']
    });
  }

  ngOnInit() {
    this.loadEmployees();

    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.employees.set([]);
      this.loadEmployees();
    });
  }

  loadEmployees() {
    if (this.loading()) return;

    this.loading.set(true);
    const filters = this.filterForm.value;

    this.employeeService.getEmployees(this.currentPage, this.pageSize, filters).subscribe({
      next: (res) => {
        this.employees.update(current => [...current, ...res.data]);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      if (!this.loading() && this.employees().length < this.total()) {
        this.currentPage++;
        this.loadEmployees();
      }
    }
  }
}
