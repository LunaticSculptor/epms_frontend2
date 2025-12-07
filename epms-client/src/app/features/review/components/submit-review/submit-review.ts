import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review';

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-review.html',
  styleUrls: ['./submit-review.scss']
})
export class SubmitReviewComponent implements OnInit {
  reviewForm: FormGroup;
  employees: any[] = [];
  submitting = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      employeeId: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      comments: ['']
    });
  }

  ngOnInit() {
    this.reviewService.getEmployeesForReview().subscribe(emps => {
      this.employees = emps;
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.submitting = true;
    this.successMessage = '';

    this.reviewService.submitReview(this.reviewForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Performance review submitted successfully!';
        this.reviewForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }
}
