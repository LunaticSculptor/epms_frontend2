import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BonusService } from '../../../../core/services/bonus';

@Component({
  selector: 'app-approve-bonus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './approve-bonus.html',
  styleUrls: ['./approve-bonus.scss']
})
export class ApproveBonusComponent implements OnInit {
  bonusForm: FormGroup;
  employees: any[] = [];
  submitting = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private bonusService: BonusService
  ) {
    this.bonusForm = this.fb.group({
      employeeId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.bonusService.getEligibleEmployees().subscribe(emps => {
      this.employees = emps;
    });
  }

  onSubmit() {
    if (this.bonusForm.invalid) return;

    this.submitting = true;
    this.successMessage = '';

    this.bonusService.approveBonus(this.bonusForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Bonus approved successfully!';
        this.bonusForm.reset();
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }
}
