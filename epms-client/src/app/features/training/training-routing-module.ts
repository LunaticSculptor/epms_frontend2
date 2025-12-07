import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverdueTrainingComponent } from './components/overdue-training/overdue-training';

const routes: Routes = [
  { path: 'overdue', component: OverdueTrainingComponent },
  { path: '', redirectTo: 'overdue', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
