import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveBonusComponent } from './components/approve-bonus/approve-bonus';

const routes: Routes = [
  { path: 'approve', component: ApproveBonusComponent },
  { path: '', redirectTo: 'approve', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusRoutingModule { }
