import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitReviewComponent } from './components/submit-review/submit-review';

const routes: Routes = [
  { path: 'submit', component: SubmitReviewComponent },
  { path: '', redirectTo: 'submit', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
