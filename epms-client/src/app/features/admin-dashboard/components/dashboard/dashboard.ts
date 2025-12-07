import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  filterForm: FormGroup;
  data: any = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.filterForm = this.fb.group({
      timeFrame: ['monthly'],
      showTopPerformers: [false],
      showDeptBreakdown: [false],
      showTrainingStats: [false]
    });
  }

  ngOnInit() {
    this.loadDashboard();

    this.filterForm.valueChanges.subscribe(() => {
      this.loadDashboard();
    });
  }

  loadDashboard() {
    this.loading = true;
    const { timeFrame, showTopPerformers, showDeptBreakdown, showTrainingStats } = this.filterForm.value;

    this.adminService.getDashboardStats(timeFrame, showTopPerformers, showDeptBreakdown, showTrainingStats)
      .subscribe(data => {
        this.data = data;
        this.loading = false;
      });
  }
}
