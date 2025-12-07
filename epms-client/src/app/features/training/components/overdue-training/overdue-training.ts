import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TrainingService, TrainingSession } from '../../../../core/services/training';

@Component({
  selector: 'app-overdue-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './overdue-training.html',
  styleUrls: ['./overdue-training.scss']
})
export class OverdueTrainingComponent implements OnInit {
  filterForm: FormGroup;
  sessions: TrainingSession[] = [];

  trainingTypes = ['Compliance', 'Security', 'Technical', 'Soft Skills'];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      type: ['']
    });
  }

  ngOnInit() {
    this.loadData();

    this.filterForm.valueChanges.subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    const filters = this.filterForm.value;
    this.trainingService.getOverdueTraining(filters.startDate, filters.endDate, filters.type)
      .subscribe(data => {
        this.sessions = data;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sessions, event.previousIndex, event.currentIndex);
  }
}
